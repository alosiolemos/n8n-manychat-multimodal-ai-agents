# Texto, áudio e imagem

Após o buffer, Tipo de mensagem direciona o conteúdo para caminhos distintos. Texto segue por campos normalizados; áudio é baixado e transcrito por um nó OpenAI; imagem é baixada e analisada por outro nó OpenAI. A saída textual converge para SetDados e Supervisor.

Transcrição de áudio e análise de imagem são operações diferentes: a imagem é interpretada para gerar texto, não necessariamente transcrita palavra por palavra. Os parâmetros do modelo e formatos aceitos precisam ser validados ao configurar a nova instância.

O atendimento é orientado a usar o idioma do contato. Não foi executado um benchmark de idiomas, sotaques, qualidade de áudio, precisão de imagem ou latência nesta preparação.

A normalização inicial exige uma mensagem textual. Na integração multimodal, é necessário conferir como URLs e metadados de mídia chegam do ManyChat, sua validade, permissões de download e o comportamento quando várias mensagens ou anexos caem no mesmo buffer.
