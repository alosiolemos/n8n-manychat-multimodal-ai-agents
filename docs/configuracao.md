# Configuração e screenshot

## Imagem do README

Use o nome exato **atendimento-multimodal.png** dentro de **assets/screenshots/**. No GitHub, abra essa pasta, use Add file → Upload files e confirme o envio. O README já referencia esse caminho e não precisa de correção após o upload.

Prepare a captura sem tokens, dados de contato, mensagens privadas, endpoints de ambiente ou conteúdo de documentos internos.

## Templates

Importe principal.template.json e comercial.template.json em uma instância de demonstração. Vincule a ferramenta Criar Lead CRM ao novo ID do subworkflow comercial. O suporte histórico é opcional para estudo e deve permanecer fora do principal.

Configure credenciais privadas de ManyChat, Pipedrive, Apollo, OpenAI, Gemini, Google Docs e PostgreSQL/Supabase. Substitua os IDs e números de demonstração por seus campos, documentos, tabelas e recursos. Os marcadores CONFIGURE não são valores funcionais.

O banco precisa de uma tabela de buffer compatível com as consultas. O schema SQL de demonstração não foi executado e deve ser revisado. A memória usa a tabela configurada nos nós; não se pressupõe que a tabela de buffer seja a tabela de memória.

Ative cada integração somente em ambiente de teste. Webhook, agendamento, chamadas externas e componentes com credenciais estão desabilitados, e o workflow está globalmente inativo. A execução com esses nós desabilitados não é uma simulação funcional completa, pois saídas necessárias podem faltar.

## Conferências

Testar mensagens seguidas do mesmo contato, contatos simultâneos, retomada inelegível, áudio, imagem, falha de CRM, resposta sem dados e limpeza de buffer seguida de falha. Não habilitar a retomada para uma base real antes de validar os critérios e os limites do canal no seu ambiente.
