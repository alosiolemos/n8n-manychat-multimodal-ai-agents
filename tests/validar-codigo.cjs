// Testes locais. Execute: node tests/validar-codigo.cjs. Não acessa APIs nem bancos.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const base=path.resolve(__dirname,'..');
const inventory=JSON.parse(fs.readFileSync(path.join(__dirname,'inventario-codigo.json'),'utf8'));
const results=[];
function test(name,fn){fn();results.push({teste:name,resultado:'passou'});}
function run(variant,name,{json={},items=[],node=()=>({first:()=>({json:{}})})}={}){const e=inventory.find(v=>v.variant===variant).codes.find(c=>c.name===name);return new Function('$json','$input','$','DateTime',fs.readFileSync(path.join(base,e.path),'utf8'))(json,{all:()=>items},node,undefined);}
test('Sintaxe dos oito corpos JavaScript',()=>{for(const v of inventory)for(const e of v.codes)new Function('$json','$input','$','DateTime',fs.readFileSync(path.join(base,e.path),'utf8'));});
test('Normalização de entrada preserva ID e limpa mensagem',()=>{
 const out=run('principal','Normalizar entrada',{json:{body:{subscriber_id:123,message:' Olá, preciso de ajuda '}}})[0].json;
 assert.equal(out.subscriber_id,'123');assert.equal(out.mensagem,'Olá, preciso de ajuda');assert.ok(out.message_id);assert.ok(!Number.isNaN(Date.parse(out.received_at)));
});
test('Entrada sem contato ou sem mensagem é rejeitada',()=>{
 assert.throws(()=>run('principal','Normalizar entrada',{json:{message:'Olá'}}),/subscriber_id/);
 assert.throws(()=>run('principal','Normalizar entrada',{json:{subscriber_id:'demo'}}),/mensagem/);
});
test('Consolidação reúne mensagens válidas e recompõe saída',()=>{
 const node=name=>({first:()=>({json:name==='Normalizar entrada'?{subscriber_id:'demo',received_at:'2026-01-01T00:00:00Z'}:{subscriber_id:'demo',Mensagem_geral:'Olá preciso de ajuda',mensagens_agrupadas:2}})});
 const out=run('principal','Consolidar mensagens',{items:[{json:{message:'Olá'}},{json:{message:' preciso de ajuda '}},{json:{message:''}}],node})[0].json;
 assert.equal(out.Mensagem_geral,'Olá preciso de ajuda');assert.equal(out.mensagens_agrupadas,2);
 assert.equal(run('principal','SAIDA PARA SUPERVISOR',{node})[0].json.subscriber_id,'demo');
});
function contact(id='demo',status='conversa_comercial_iniciada',extra=[]){return {id,status:'active',optin_whatsapp:true,custom_fields:[{name:'status_conversa',value:status},{name:'data_inicio_conversa_comercial',value:new Date(Date.now()-45*60000).toISOString()},...extra]};}
test('Retomada filtra inativos e remove contatos repetidos',()=>{
 const a=contact();const out=run('principal','Normalizar contatos',{items:[{json:{data:[a,a,{...a,id:'inativo',status:'inactive'}]}}]});assert.equal(out.length,1);assert.equal(out[0].json.pode_recuperar_agora,true);
});
test('Retomada rejeita status desconhecido após correção pública',()=>{
 const out=run('principal','Normalizar contatos',{items:[{json:{data:[contact('demo','status_desconhecido')]}}]});assert.equal(out[0].json.elegivel_recuperacao,false);assert.equal(out[0].json.pode_recuperar_agora,false);
});
test('Retomada respeita opt-in, limite de tentativas e conversa finalizada',()=>{
 const list=[{...contact('sem-optin'),optin_whatsapp:false},contact('limite','conversa_comercial_iniciada',[{name:'tentativa_retomada',value:3}]),contact('encerrada','conversa_comercial_iniciada',[{name:'data_final_conversa_comercial',value:'2026-01-01'}])];
 const out=run('principal','Normalizar contatos',{items:[{json:{data:list}}]});assert.ok(out.every(x=>!x.json.pode_recuperar_agora));
});
test('Retomada não antecipa janela de quarenta minutos',()=>{
 const c=contact();c.custom_fields[1].value=new Date(Date.now()-10*60000).toISOString();assert.equal(run('principal','Normalizar contatos',{items:[{json:{data:[c]}}]})[0].json.pode_recuperar_agora,false);
});
function classify(email){return run('comercial','TIPO DE E-MAIL',{node:()=>({first:()=>({json:{body:{email}}})})});}
test('Classificação de domínio pessoal, temporário e corporativo',()=>{
 assert.equal(classify(' demo@gmail.com ').classificacao,'Domínio Pessoal');
 assert.equal(classify('demo@mailinator.com').classificacao,'Domínio Temporário');
 assert.equal(classify('demo@empresa.example').classificacao,'Domínio Corporativo');
 assert.equal(classify('').classificacao,'E-mail inválido');
});
test('Cruzamento de leads com responsáveis e exclusão de criação manual',()=>{
 const node=name=>({item:{json:{data:name==='Lista todos os leads'?[{id:'lead-a',owner_id:1,title:'Lead Demo'},{id:'lead-b',origin:'ManuallyCreated',owner_id:1}]:[{id:1,name:'Responsável Demo',email:'responsavel@example.com'}]}}});
 const out=run('comercial','Listar Leads API e Cruzar Usuários',{node})[0].json.body;
 assert.equal(out.length,1);assert.equal(out[0].owner_name,'Responsável Demo');
});
test('Retorno CRM preserva ID e sinaliza criação',()=>{
 const node=name=>({isExecuted:name==='Criar Lead2',first:()=>({json:{success:true,data:{id:'lead-demo',add_time:''}}})});
 const out=run('comercial','Update',{node})[0].json;assert.equal(out.success,true);assert.equal(out.lead_id,'lead-demo');
});
test('Suporte histórico valida e-mail e escapa HTML da reclamação',()=>{
 assert.throws(()=>run('suporte','Preparar Reclamação',{json:{plataforma:'PLATAFORMA_B',email:'invalido',resumo:'Teste'}}),/inválido/);
 const out=run('suporte','Preparar Reclamação',{json:{plataforma:'PLATAFORMA_B',nome:'Pessoa <script>',email:'demo@example.com',resumo:'<img src=x onerror=alert(1)>',mensagem_original:'Teste'}});
 const data=Array.isArray(out)?out[0].json:out;const html=data.corpo_html;assert.ok(html.includes('&lt;'));assert.ok(!html.includes('<script>'));
});
for(const entry of inventory)test('Estrutura pública: '+entry.variant,()=>{
 const text=fs.readFileSync(path.join(base,'workflows',entry.variant+'.template.json'),'utf8'),w=JSON.parse(text);
 assert.equal(w.nodes.length,entry.total);assert.equal(w.active,false);assert.deepEqual(w.pinData,{});assert.equal(w.nodes.filter(n=>n.credentials).length,0);assert.equal(w.nodes.filter(n=>n.disabled).length,entry.disabled);
 const names=new Set(w.nodes.map(n=>n.name));for(const [name,groups]of Object.entries(w.connections)){assert.ok(names.has(name));for(const outputs of Object.values(groups))for(const links of outputs)for(const l of links)assert.ok(names.has(l.node),l.node);}
 for(const n of w.nodes.filter(n=>/httpRequest|postgres|pipedrive|microsoftOutlook|googleDocsTool|langchain|scheduleTrigger|webhook/i.test(n.type)))assert.equal(n.disabled,true,n.name);
 assert.equal(/pat-[A-Za-z0-9_-]{10,}|AIza[A-Za-z0-9_-]{20,}|eyJ[A-Za-z0-9_-]{15,}\./.test(text),false);
 if(entry.variant==='principal'){assert.equal(w.nodes.find(n=>n.name==='Aguardar buffer (45s)').parameters.amount,45);assert.equal(w.nodes.filter(n=>n.type.endsWith('.agent')||n.type.endsWith('.agentTool')).length,4);}
});
test('SQLs de buffer usam parâmetros e corte temporal',()=>{
 const files=fs.readdirSync(path.join(base,'sql')).filter(f=>f!=='schema-buffer-demo.sql');assert.equal(files.length,4);
 for(const file of files){const sql=fs.readFileSync(path.join(base,'sql',file),'utf8');assert.ok(sql.includes('$1'));}
 const del=fs.readFileSync(path.join(base,'sql/limpar-buffer.sql'),'utf8');assert.ok(del.includes('received_at <= $2'));
});
const report={escopo:'Testes locais de JavaScript, JSON e SQL como texto; sem n8n, banco, APIs ou LLMs',total:results.length,testes:results};
fs.writeFileSync(path.join(__dirname,'resultados-testes.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));
