# Retomada de conversas

O Schedule Trigger consulta contatos em três estados no ManyChat. Merge reúne as respostas, Normalizar contatos mantém ativos e remove IDs repetidos. O código lê campos customizados para identificar datas, tentativas, status e criação de lead.

O desenho procura respeitar optin_whatsapp, ausência de encerramento, ausência de lead considerado criado e menos de três tentativas. A data de referência prioriza a última tentativa e usa o início da conversa como alternativa.

## Tempos do export

O normalizador usa MINUTOS_PARA_RETOMADA = 40. O IF tem um nome que menciona 10 minutos e uma condição intermediária de >=4, mas também exige pode_recuperar_agora, calculado com o limite de 40. Portanto o nome do nó não descreve sozinho a regra efetiva. O Wait chamado Aguardar 15seg contém amount 10 no export; esse valor foi preservado e a unidade explicitada.

## Ajuste público pontual

Corrigi no template e no código público uma comparação de status que terminava em uma string solta no operador OR. Essa string era sempre truthy. O IF posterior também contém verificação de status, mas o normalizador isolado precisava da comparação explícita. Os arquivos originais não foram alterados.

O agente de recuperação utiliza histórico e argumentos para preparar a mensagem. Em seguida o fluxo envia o texto e registra a tentativa no ManyChat. Não houve envio real nesta preparação.

Os campos de datas e o marcador de lead exigem validação do formato: o código original considera texto não vazio no campo lead_criado_pipedrive como indicação de lead criado. Essa convenção pode não representar um valor booleano real em todas as contas.
