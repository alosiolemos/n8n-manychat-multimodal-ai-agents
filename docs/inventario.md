# Inventário

## principal

61 nós; 32 desabilitados na publicação.

| Nó | Tipo | Versão | Estado público |
| --- | --- | --- | --- |
| ManyChat | webhook | 1 | Desabilitado |
| Sticky Note | stickyNote | 1 | Preservado |
| Sticky Note1 | stickyNote | 1 | Preservado |
| Tipo de mensagem | switch | 3.2 | Preservado |
| Baixar audio | httpRequest | 4.2 | Desabilitado |
| Texto | set | 2 | Preservado |
| Audio | set | 2 | Preservado |
| SetDados | set | 3.4 | Preservado |
| Sticky Note3 | stickyNote | 1 | Preservado |
| Baixar imagem | httpRequest | 4.2 | Desabilitado |
| Imagem | set | 2 | Preservado |
| Sticky Note6 | stickyNote | 1 | Preservado |
| áudio | openAi | 1.8 | Desabilitado |
| Imagem enviada | openAi | 1.8 | Desabilitado |
| Sticky Note8 | stickyNote | 1 | Preservado |
| Sticky Note5 | stickyNote | 1 | Preservado |
| Sticky Note4 | stickyNote | 1 | Preservado |
| Enviar mensagem ManyChat | httpRequest | 4.1 | Desabilitado |
| Sticky Note2 | stickyNote | 1 | Preservado |
| Agente Suporte | agentTool | 3 | Desabilitado |
| Agente Comercial | agentTool | 3 | Desabilitado |
| Criar Lead CRM | toolWorkflow | 2.2 | Desabilitado |
| Marcar Conversa Comercial Iniciada | httpRequestTool | 4.4 | Desabilitado |
| Sticky Note7 | stickyNote | 1 | Preservado |
| Normalizar contatos | code | 2 | Preservado |
| Conversa parada há 10 min? | if | 2.2 | Preservado |
| Enviar mensagem de retomada | httpRequest | 4.4 | Desabilitado |
| Agente Recuperacao Comercial | agent | 3.1 | Desabilitado |
| Gemini 2. | lmChatGoogleGemini | 1 | Desabilitado |
| Registrar ações | httpRequest | 4.4 | Desabilitado |
| Sticky Note9 | stickyNote | 1 | Preservado |
| Schedule Trigger | scheduleTrigger | 1.3 | Desabilitado |
| Reabrir Conversa Comercial | httpRequestTool | 4.4 | Desabilitado |
| Encerrar Conversa Comercial | httpRequestTool | 4.4 | Desabilitado |
| Buscar iniciada | httpRequest | 4.1 | Desabilitado |
| Buscar  retomada | httpRequest | 4.1 | Desabilitado |
| Merge | merge | 3.2 | Preservado |
| Loop Over Items | splitInBatches | 3 | Preservado |
| Normalizar saida do agente | set | 3.4 | Preservado |
| Postgres Chat Memory | memoryPostgresChat | 1.3 | Desabilitado |
| Argumentos para Retomada | googleDocsTool | 2 | Desabilitado |
| Postgres Chat Memory1 | memoryPostgresChat | 1.3 | Desabilitado |
| Aguardar 15seg | wait | 1.1 | Preservado |
| Buscar  abertura | httpRequest | 4.1 | Desabilitado |
| fim | noOp | 1 | Preservado |
| Normalizar entrada | code | 2 | Preservado |
| Salvar no Buffer | postgres | 2.6 | Desabilitado |
| Aguardar buffer (45s) | wait | 1.1 | Preservado |
| Buscar mensagem mais recente | postgres | 2.6 | Desabilitado |
| Ainda sou a última mensagem? | if | 2.2 | Preservado |
| Buscar mensagens do Buffer | postgres | 2.6 | Desabilitado |
| Consolidar mensagens | code | 2 | Preservado |
| Limpar Buffer | postgres | 2.6 | Desabilitado |
| SAIDA PARA SUPERVISOR | code | 2 | Preservado |
| Sticky Note10 | stickyNote | 1 | Preservado |
| fim1 | noOp | 1 | Preservado |
| Sobre a Empresa | googleDocsTool | 2 | Desabilitado |
| Produtos da Empresa | googleDocsTool | 2 | Desabilitado |
| Salvar ultima mensagem do bot | httpRequest | 4.1 | Desabilitado |
| Gemini 2.5 | lmChatGoogleGemini | 1 | Desabilitado |
| Supervisor | agent | 3.1 | Desabilitado |

### Código

- [Normalizar contatos](../code/principal/01-normalizar-contatos.js)
- [Normalizar entrada](../code/principal/02-normalizar-entrada.js)
- [Consolidar mensagens](../code/principal/03-consolidar-mensagens.js)
- [SAIDA PARA SUPERVISOR](../code/principal/04-saida-para-supervisor.js)

## suporte

4 nós; 1 desabilitados na publicação.

| Nó | Tipo | Versão | Estado público |
| --- | --- | --- | --- |
| Receber Reclamação | executeWorkflowTrigger | 1.1 | Preservado |
| Enviar e-mail Outlook | microsoftOutlook | 2 | Desabilitado |
| Retorno | set | 3.4 | Preservado |
| Preparar Reclamação | code | 2 | Preservado |

### Código

- [Preparar Reclamação](../code/suporte/01-preparar-reclamacao.js)

## comercial

27 nós; 19 desabilitados na publicação.

| Nó | Tipo | Versão | Estado público |
| --- | --- | --- | --- |
| Receber Lead Comercial | executeWorkflowTrigger | 1.1 | Preservado |
| Obter usuários | httpRequest | 4.3 | Desabilitado |
| Listar Leads API e Cruzar Usuários | code | 2 | Desabilitado |
| Definir Owner | agent | 1.8 | Desabilitado |
| Google Gemini Chat Model | lmChatGoogleGemini | 1 | Desabilitado |
| Lista todos os leads | httpRequest | 4.3 | Desabilitado |
| Consolidado | set | 3.4 | Preservado |
| VALIDAR TIPO DE E-MAIL2 | if | 1 | Preservado |
| Criar organização | pipedrive | 1 | Desabilitado |
| Criar pessoa | pipedrive | 1 | Desabilitado |
| Criar Lead2 | httpRequest | 4.3 | Desabilitado |
| Update Lead2 | httpRequest | 4.3 | Desabilitado |
| Update Lead3 | httpRequest | 4.3 | Desabilitado |
| Criar pessoa1 | pipedrive | 1 | Desabilitado |
| Criar Lead4 | httpRequest | 4.3 | Desabilitado |
| Add Note Lead1 | pipedrive | 1 | Desabilitado |
| Add Note Lead | pipedrive | 1 | Desabilitado |
| TIPO DE E-MAIL | code | 2 | Preservado |
| Buscar a Empresa | httpRequest | 4.1 | Desabilitado |
| Buscar o contato | httpRequest | 4.1 | Desabilitado |
| Buscar a Empresa1 | httpRequest | 4.1 | Desabilitado |
| Edit Fields | set | 3.4 | Preservado |
| update_ManyChat | httpRequest | 4.1 | Desabilitado |
| Enviar mensagem ManyChat | httpRequest | 4.1 | Desabilitado |
| Update | code | 2 | Preservado |
| Sticky Note | stickyNote | 1 | Preservado |
| Sticky Note1 | stickyNote | 1 | Preservado |

### Código

- [Listar Leads API e Cruzar Usuários](../code/comercial/01-listar-leads-api-e-cruzar-usuarios.js)
- [TIPO DE E-MAIL](../code/comercial/02-tipo-de-e-mail.js)
- [Update](../code/comercial/03-update.js)
