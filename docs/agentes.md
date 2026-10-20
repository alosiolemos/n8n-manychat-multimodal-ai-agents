# Agentes e ferramentas

| Agente principal | Responsabilidade |
| --- | --- |
| Supervisor | Interpretar o contato e recorrer aos especialistas |
| Agente Suporte | Orientar suporte e canais oficiais, sem abrir chamados no atendimento atual |
| Agente Comercial | Qualificar, utilizar criação de lead e atualizar estados da conversa |
| Agente Recuperacao Comercial | Preparar retomada contextualizada para contatos elegíveis |

Os especialistas comercial e suporte são agentTool conectados ao supervisor. O agente de recuperação pertence ao ramo agendado. Isso é diferente de quatro agentes independentes executando ao mesmo tempo.

Os nós de modelo principais usam models/gemini-2.5-pro no export. O rótulo de um nó não determina o modelo; disponibilidade e custos precisam ser conferidos na configuração do ambiente.

## Conhecimento e ações

Três ferramentas consultam documentos: empresa, produtos e argumentos de retomada. Não há pipeline de embeddings, banco vetorial ou RAG vetorial identificado nesses arquivos. Os documentos internos não foram copiados; a pasta knowledge contém somente orientações fictícias para adaptação.

O comercial dispõe de Criar Lead CRM e ferramentas de marcar início, reabrir e encerrar conversa no ManyChat. Chamar uma ferramenta não garante sucesso da ação: a resposta deve ser conferida antes de confirmar ao contato.

Os prompts públicos foram reescritos para remover informações internas, canais de contato reais e regras comerciais privadas. Preservam a divisão de responsabilidades, mas não são cópia integral do comportamento de produção. Campos dinâmicos do nó continuam dependendo das entradas e expressões da instalação.
