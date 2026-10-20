# Buffer de mensagens

Buffer é um armazenamento temporário para reunir mensagens próximas antes de iniciar o atendimento. Não é a memória de longo prazo do agente.

## Entrada → processamento → saída

1. Normalizar entrada identifica subscriber_id e texto da mensagem e gera message_id e received_at.
2. Salvar no Buffer grava a mensagem em PostgreSQL com parâmetros posicionais.
3. A execução aguarda uma janela.
4. Buscar mensagem mais recente verifica se aquela execução ainda corresponde à mensagem mais recente do contato.
5. A execução mais recente busca as mensagens até seu received_at, em ordem de data e ID, e as consolida.
6. Limpar Buffer remove esse recorte; SAIDA PARA SUPERVISOR recompõe os dados consolidados após o DELETE.

O desenho usa o contato e um corte temporal para que mensagens antigas sejam processadas juntas e novas entradas possam aguardar outra janela. Os SQLs estão em [sql](../sql).

## Janela do buffer

O export tem amount 30 num Wait 1.1, embora o nome do nó mencione 25 segundos. Para a versão pública configurei explicitamente **45 segundos**, seguindo o intervalo que utilizei/descrevi para a operação. O nó público se chama Aguardar buffer (45s). Não alterei o arquivo original.

## Limites

SELECT, consolidação e DELETE são passos separados; não há transação única ou lock demonstrado. A conferência da mensagem mais recente reduz execuções concorrentes, mas não constitui garantia de processamento exatamente uma vez.

O buffer é apagado antes da resposta final. Uma falha posterior pode exigir recuperação por outro mecanismo. Mensagens multimodais ou URLs agrupadas também precisam de teste específico: concatenar texto não equivale a consolidar todos os anexos corretamente.

Os nomes de tabela e colunas vêm das consultas; [schema-buffer-demo.sql](../sql/schema-buffer-demo.sql) é uma proposta de schema para demonstração, não uma extração do DDL original. Não foi executado nesta preparação.
