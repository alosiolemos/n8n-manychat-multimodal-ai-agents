const body=$json.body||$json;
const subscriber_id=String(body.subscriber_id||body.id_conversa||body?.dados?.id_conversa||body.id||'').trim();
const mensagem=String(body.message||body.mensagem||body.Mensagem_geral||body.last_input_text||body?.dados?.Mensagem_geral||'').trim();
if(!subscriber_id) throw new Error('subscriber_id não informado');
if(!mensagem) throw new Error('mensagem não informada');
const message_id=Date.now()+'-'+Math.random().toString(36).slice(2,10);
return [{json:{subscriber_id,mensagem,message_id,received_at:new Date().toISOString()}}];
