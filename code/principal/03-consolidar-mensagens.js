const items=$input.all();
const subscriber_id=$('Normalizar entrada').first().json.subscriber_id;
const received_at=$('Normalizar entrada').first().json.received_at;
const mensagens=items.map(i=>String(i.json.message||'').trim()).filter(Boolean);
const mensagem_consolidada=mensagens.join(' ').replace(/\s+/g,' ').trim();
return [{json:{subscriber_id,received_at,mensagens_agrupadas:mensagens.length,Mensagem_geral:mensagem_consolidada}}];
