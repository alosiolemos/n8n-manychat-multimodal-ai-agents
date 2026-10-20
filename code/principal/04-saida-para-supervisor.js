const consolidado=$('Consolidar mensagens').first().json;
return [{json:{subscriber_id:consolidado.subscriber_id,Mensagem_geral:consolidado.Mensagem_geral,mensagens_agrupadas:consolidado.mensagens_agrupadas}}];
