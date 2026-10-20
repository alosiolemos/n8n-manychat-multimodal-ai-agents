# Comercial, Pipedrive e Apollo

O subfluxo recebe dados do agente comercial, consulta usuários e leads no Pipedrive e cruza responsáveis. O código de listagem filtra entradas marcadas como criadas manualmente antes de associar o nome/e-mail do owner.

TIPO DE E-MAIL classifica o domínio entre pessoal, temporário, corporativo ou inválido segundo listas locais. Isso não verifica a existência da caixa de e-mail, a empresa ou a identidade do contato; um domínio não listado não é prova de vínculo corporativo.

As rotas do subfluxo usam consultas Apollo para empresa/contato e chamadas Pipedrive para criar ou atualizar leads e registrar informações relacionadas. Os cinco nós Pipedrive e os HTTP Request estão desabilitados no template público.

Update utiliza as saídas dos nós de criação e monta um retorno com lead_id, success e marcador lead_criado_pipedrive, que é enviado ao ManyChat. A expressão considera um ID retornado como sinal de sucesso mesmo se o flag success não estiver presente; verificar o contrato da API antes de interpretar esse retorno como confirmação definitiva.

A etapa Definir Owner é um agente adicional **desabilitado no original**. Ela não deve ser contada como um quinto agente principal ativo. Seu prompt público é uma referência de demonstração.

Não foi identificada uma garantia global de idempotência para todas as criações. Validar duplicidades, dados mínimos, paginação das consultas e efeitos de reprocessamento antes de operar em produção.
