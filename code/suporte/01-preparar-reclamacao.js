const input = $json;

// --------------------------------------------------
// 1. NORMALIZAÇÃO DA PLATAFORMA
// --------------------------------------------------
const rawPlataforma = String(input.plataforma || '')
  .trim()
  .toUpperCase()
  .replace(/\s+/g, '_');

let plataforma;
let plataformaLabel;
let destinatario;

const plataformasPlataformaA = [
  'PLATAFORMA_A_CO',
  'PLATAFORMA_A.CO',
  'PLATAFORMA_A',
  'PLATAFORMA_ACO',
  'NPS',
  'CXM',
  'PLATAFORMA_A_HEALTH'
];

const plataformasPlataformaB = [
  'PLATAFORMA_B',
  'PLATAFORMA_B_XM',
  'XM',
  'HUB',
  'PLATAFORMA_B_HUB',
  'TOTEM'
];

if (plataformasPlataformaA.includes(rawPlataforma)) {
  plataforma = 'PLATAFORMA_A_CO';
  plataformaLabel = 'PlataformaA.co';

  // TESTE
  destinatario = 'contato@example.com';

} else if (plataformasPlataformaB.includes(rawPlataforma)) {
  plataforma = 'PLATAFORMA_B';
  plataformaLabel = 'PLATAFORMA_B';

  // TESTE
  destinatario = 'contato@example.com';

} else {
  throw new Error(
    `Plataforma não identificada: ${rawPlataforma || 'não informada'}. Informe PLATAFORMA_A_CO ou PLATAFORMA_B.`
  );
}

// --------------------------------------------------
// 2. NORMALIZAÇÃO DOS DADOS
// --------------------------------------------------
const nome = String(input.nome || '').trim() || 'Cliente não identificado';

const email = String(input.email || '')
  .trim()
  .toLowerCase();

const telefone = String(input.telefone || '').trim() || 'Não informado';

const mensagemOriginal =
  String(input.mensagem_original || '').trim() || 'Não informada';

const resumo =
  String(input.resumo || '').trim() || mensagemOriginal;

const nivelAtrito =
  String(input.nivel_atrito || '').trim().toLowerCase() || 'alto';

const idConversa =
  String(input.id_conversa || '').trim() || 'Não informado';

// Dados fixos do fluxo
const origem = 'WhatsApp do site';
const atendente = 'Assistente Demo';
const tipoAtendimento = 'Escalonamento de alto atrito';

// --------------------------------------------------
// 3. VALIDAÇÕES
// --------------------------------------------------
if (!email) {
  throw new Error(
    'E-mail do cliente não informado. Solicite o e-mail antes de escalar a reclamação.'
  );
}

const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailValido.test(email)) {
  throw new Error(`E-mail do cliente inválido: ${email}`);
}

if (!resumo || resumo === 'Não informada') {
  throw new Error('Resumo da reclamação não informado.');
}

// --------------------------------------------------
// 4. ASSUNTO
// --------------------------------------------------
const assunto =
  `[ALTO ATRITO] ${plataformaLabel} | ${nome} | WhatsApp`;

// --------------------------------------------------
// 5. FUNÇÕES HTML
// --------------------------------------------------
const esc = (value) => String(value ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#039;');

const htmlText = (value) =>
  esc(value).replace(/\r?\n/g, '<br>');

// --------------------------------------------------
// 6. CORPO DO E-MAIL
// --------------------------------------------------
const corpo_html = `
<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  border="0"
  style="
    width:100%;
    background:#f5f6f8;
    font-family:Arial,Helvetica,sans-serif;
    color:#900018;
  "
>
  <tr>
    <td align="center" style="padding:24px;">

      <table
        width="720"
        cellpadding="0"
        cellspacing="0"
        border="0"
        style="
          width:100%;
          max-width:720px;
          background:#ffffff;
          border:1px solid #e5e7eb;
        "
      >

        <!-- CABEÇALHO -->
        <tr>
          <td style="padding:24px 28px 18px 28px;border-bottom:1px solid #e5e7eb;">

            <div style="
              font-size:12px;
              font-weight:bold;
              color:#b42318;
              text-transform:uppercase;
              margin-bottom:8px;
            ">
              Atendimento com alto atrito
            </div>

            <div style="
              font-size:22px;
              font-weight:bold;
              color:#900019;
              line-height:1.3;
            ">
              ${esc(nome)} | ${esc(plataformaLabel)}
            </div>

            <div style="
              margin-top:8px;
              font-size:13px;
              color:#900020;
            ">
              Origem: ${esc(origem)} • Atendimento: ${esc(atendente)}
            </div>

          </td>
        </tr>


        <!-- RESUMO EXECUTIVO -->
        <tr>
          <td style="padding:24px 28px 10px 28px;">

            <div style="
              font-size:15px;
              font-weight:bold;
              color:#900019;
              margin-bottom:10px;
            ">
              Resumo rápido
            </div>

            <table
              width="100%"
              cellpadding="0"
              cellspacing="0"
              border="0"
              style="
                background:#f9fafb;
                border-left:4px solid #b42318;
              "
            >
              <tr>
                <td style="
                  padding:16px 18px;
                  font-size:14px;
                  line-height:1.6;
                  color:#900021;
                ">
                  <strong>${esc(nome)}</strong> apresenta uma situação de
                  <strong>alto atrito</strong> relacionada à plataforma
                  <strong>${esc(plataformaLabel)}</strong>.

                  <br><br>

                  ${htmlText(resumo)}
                </td>
              </tr>
            </table>

          </td>
        </tr>


        <!-- DADOS -->
        <tr>
          <td style="padding:18px 28px;">

            <div style="
              font-size:15px;
              font-weight:bold;
              color:#900019;
              margin-bottom:12px;
            ">
              Dados do atendimento
            </div>

            <table
              width="100%"
              cellpadding="8"
              cellspacing="0"
              border="0"
              style="
                font-size:14px;
                border-collapse:collapse;
              "
            >

              <tr>
                <td width="190" style="color:#900020;border-bottom:1px solid #eeeeee;">
                  Cliente
                </td>
                <td style="font-weight:bold;border-bottom:1px solid #eeeeee;">
                  ${esc(nome)}
                </td>
              </tr>

              <tr>
                <td style="color:#900020;border-bottom:1px solid #eeeeee;">
                  Plataforma
                </td>
                <td style="font-weight:bold;border-bottom:1px solid #eeeeee;">
                  ${esc(plataformaLabel)}
                </td>
              </tr>

              <tr>
                <td style="color:#900020;border-bottom:1px solid #eeeeee;">
                  E-mail
                </td>
                <td style="border-bottom:1px solid #eeeeee;">
                  <a
                    href="mailto:${esc(email)}"
                    style="color:#175cd3;text-decoration:none;"
                  >
                    ${esc(email)}
                  </a>
                </td>
              </tr>

              <tr>
                <td style="color:#900020;border-bottom:1px solid #eeeeee;">
                  Telefone / WhatsApp
                </td>
                <td style="border-bottom:1px solid #eeeeee;">
                  ${esc(telefone)}
                </td>
              </tr>

              <tr>
                <td style="color:#900020;border-bottom:1px solid #eeeeee;">
                  Nível de atrito
                </td>
                <td style="border-bottom:1px solid #eeeeee;">
                  <strong style="color:#b42318;">
                    ${esc(nivelAtrito.toUpperCase())}
                  </strong>
                </td>
              </tr>

              <tr>
                <td style="color:#900020;border-bottom:1px solid #eeeeee;">
                  Origem
                </td>
                <td style="border-bottom:1px solid #eeeeee;">
                  ${esc(origem)}
                </td>
              </tr>

              <tr>
                <td style="color:#900020;">
                  ID da conversa
                </td>
                <td>
                  ${esc(idConversa)}
                </td>
              </tr>

            </table>

          </td>
        </tr>


        <!-- MENSAGEM DO CLIENTE -->
        <tr>
          <td style="padding:10px 28px 24px 28px;">

            <div style="
              font-size:15px;
              font-weight:bold;
              color:#900019;
              margin-bottom:10px;
            ">
              Mensagem que originou o escalonamento
            </div>

            <table
              width="100%"
              cellpadding="0"
              cellspacing="0"
              border="0"
              style="
                background:#fff8f6;
                border:1px solid #fecdca;
              "
            >
              <tr>
                <td style="
                  padding:16px 18px;
                  font-size:14px;
                  line-height:1.6;
                  color:#900021;
                  font-style:italic;
                ">
                  “${htmlText(mensagemOriginal)}”
                </td>
              </tr>
            </table>

          </td>
        </tr>


        <!-- AÇÃO -->
        <tr>
          <td style="
            padding:20px 28px;
            background:#f9fafb;
            border-top:1px solid #e5e7eb;
          ">

            <div style="
              font-size:14px;
              font-weight:bold;
              color:#900019;
              margin-bottom:6px;
            ">
              Ação esperada
            </div>

            <div style="
              font-size:13px;
              line-height:1.6;
              color:#900022;
            ">
              Avaliar o contexto apresentado e realizar a tratativa com o cliente
              conforme o fluxo de suporte da ${esc(plataformaLabel)}.
            </div>

          </td>
        </tr>


        <!-- RODAPÉ -->
        <tr>
          <td style="
            padding:16px 28px;
            font-size:11px;
            color:#98a2b3;
            border-top:1px solid #e5e7eb;
          ">
            Origem: ${esc(origem)} • ${esc(tipoAtendimento)}<br>
            Atendimento automatizado por Assistente Demo • ID ${esc(idConversa)}
          </td>
        </tr>

      </table>

    </td>
  </tr>
</table>
`;

// --------------------------------------------------
// 7. SAÍDA
// --------------------------------------------------
return [
  {
    json: {
      plataforma,
      plataforma_label: plataformaLabel,
      destinatario,
      nome,
      email,
      telefone,
      mensagem_original: mensagemOriginal,
      resumo,
      nivel_atrito: nivelAtrito,
      origem,
      id_conversa: idConversa,
      assunto,
      corpo_html
    }
  }
];
