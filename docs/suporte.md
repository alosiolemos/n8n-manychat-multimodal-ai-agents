# Suporte atual e subfluxo histórico

Na operação atual que descrevi, o especialista de suporte orienta o contato e informa canais oficiais; não abre chamados nem envia reclamações. O fluxo principal recebido não possui uma ferramenta de execução que conecte esse agente ao subfluxo de reclamação.

O JSON de suporte foi mantido como **referência histórica separada**. Possui quatro nós: entrada de subworkflow, preparação da reclamação, envio por Microsoft Outlook e retorno de dados. Preparar Reclamação normaliza plataforma, valida e-mail e prepara HTML com escape dos campos exibidos.

Envio de e-mail não deve ser descrito como criação de ticket em Octadesk: esse conector não aparece no subfluxo recebido. O nó Outlook está desabilitado na publicação, e os destinatários foram substituídos por contato@example.com.

Os nomes das plataformas e o atendente no código histórico foram generalizados. Antes de qualquer adaptação, configurar seus próprios canais e preservar a decisão operacional de manter o envio fora do atendimento atual.
