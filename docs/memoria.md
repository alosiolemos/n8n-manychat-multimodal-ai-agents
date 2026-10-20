# Memória conversacional em PostgreSQL / Supabase

Utilizei PostgreSQL hospedado no Supabase para persistir contexto de conversa. Supabase é a hospedagem do banco nesta implementação; os nós n8n utilizam o conector PostgreSQL.

| Componente | Papel | Persistência |
| --- | --- | --- |
| Buffer | Reunir mensagens próximas antes do processamento | Temporária, com limpeza por recorte |
| Postgres Chat Memory | Disponibilizar histórico ao agente | Conversacional, por chave de sessão |
| Campos ManyChat | Registrar status e tentativas de atendimento | Estado operacional do contato |

O supervisor e o agente de recuperação estão conectados a nós de memória. Ambos referenciam a mesma tabela e usam uma chave derivada do subscriber_id, com contextWindowLength 15 nos parâmetros. Não interpreto essa janela como retenção ilimitada nem como 15 dias; a semântica precisa ser validada no nó instalado.

Compartilhar tabela e sessão permite continuidade de contexto, mas exige avaliar mistura de mensagens entre atendimento e retomada, concorrência e retenção. O export não inclui políticas de limpeza do histórico, RLS ou configuração completa do banco Supabase.

A credencial deve ser privada e adequada ao uso do n8n. Não publique host privado, senha ou string de conexão preenchida. A publicação remove referências a credenciais e não consulta a instância de origem.
