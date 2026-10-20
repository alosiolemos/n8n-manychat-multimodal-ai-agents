# Validação e limites

Foram verificados os três JSONs, os nós, conexões, consultas de buffer e códigos selecionados. A versão pública tem dados fixados vazios, ausência de referências a credenciais e integrações desabilitadas.

Os testes locais usam dados fictícios e verificam transformação e estrutura. Consulte [o relatório](../tests/resultados-testes.json) e [o script](../tests/validar-codigo.cjs).

Não houve importação em uma instância n8n, execução de SQL, chamada de modelo, envio de mensagem ou criação de lead. O resultado de mais de 41 leads é meu relato operacional público, não uma medição feita por esses testes.

Não foram validados concorrência real, entrega exatamente uma vez, cobertura de idiomas, precisão multimodal, latência, custos ou limites das plataformas.
