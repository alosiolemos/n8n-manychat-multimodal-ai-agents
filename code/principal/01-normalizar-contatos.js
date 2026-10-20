const MINUTOS_PARA_RETOMADA = 40;

// =========================
// JUNTAR RESPOSTAS DO MERGE
// =========================

const respostas = $input.all();

const contatosRecebidos = respostas.flatMap(item => {
  const data = item.json?.data;

  return Array.isArray(data)
    ? data
    : [];
});

// =========================
// FILTRAR ATIVOS + DEDUPLICAR
// =========================

const contatos = [
  ...new Map(
    contatosRecebidos
      .filter(contato =>
        contato?.id &&
        contato.status === 'active'
      )
      .map(contato => [String(contato.id), contato])
  ).values()
];

// =========================
// NORMALIZAÇÃO
// =========================

return contatos.map(contato => {

  // =========================
  // CUSTOM FIELDS
  // =========================

  const customFields = {};

  const camposOriginais =
    contato.custom_fields || [];

  if (Array.isArray(camposOriginais)) {
    for (const field of camposOriginais) {
      if (!field?.name) continue;

      customFields[field.name] =
        field.value ?? null;
    }
  }

  // =========================
  // CAMPOS PRINCIPAIS
  // =========================

  const statusConversa =
    customFields.status_conversa || '';

  const dataInicio =
    customFields.data_inicio_conversa_comercial || null;

  const dataFinal =
    customFields.data_final_conversa_comercial || null;

  const dataUltimaTentativa =
    customFields.data_ultima_tentativa || null;

  const tentativasRealizadas =
    Number(customFields.tentativa_retomada || 0);

  const tentativaAtual =
    tentativasRealizadas + 1;

  const mensagemUltimaTentativa =
    customFields.mensagem_ultima_tentativa || '';

  const dataEncerramentoRetomada =
    customFields.data_encerramento_retomada || null;

  const ultimamensagembot =
    customFields.ultima_mensagem_bot || null;

  const contextoIdentificado =
    customFields.contexto_identificado || '';

  const motivoEscolha =
    customFields.motivo_escolha || '';

  const dataPrimeiraMensagem =
    customFields['Data e hora da primeira mensagem'] || null;

  const leadCriadoRaw =
    customFields.lead_criado_pipedrive ?? null;

  const leadCriado =
    leadCriadoRaw !== null &&
    leadCriadoRaw !== undefined &&
    String(leadCriadoRaw).trim() !== '';

  const conversaFinalizada =
    leadCriado || !!dataFinal;

  // =========================
  // TEMPO
  // =========================

  const dataReferencia =
    dataUltimaTentativa || dataInicio;

  let minutosParado = null;

  if (dataReferencia) {
    const dtReferencia =
      new Date(dataReferencia);

    if (!Number.isNaN(dtReferencia.getTime())) {
      minutosParado = Math.floor(
        (Date.now() - dtReferencia.getTime()) / 60000
      );
    }
  }

  // =========================
  // ELEGIBILIDADE
  // =========================

  const statusElegivel =
    statusConversa === 'conversa_comercial_iniciada' ||
    statusConversa === 'retomada_comercial_enviada' || statusConversa === 'conversa_abertura_inicial';

  const elegivelRecuperacao =
    statusElegivel &&
    !conversaFinalizada &&
    !dataEncerramentoRetomada &&
    tentativasRealizadas < 3 &&
    contato.optin_whatsapp === true;

  const podeRecuperarAgora =
    elegivelRecuperacao &&
    minutosParado !== null &&
    minutosParado >= MINUTOS_PARA_RETOMADA;

  // =========================
  // SAÍDA
  // =========================

  return {
    json: {
      subscriber_id: contato.id,

      nome: contato.first_name || '',
      sobrenome: contato.last_name || '',

      whatsapp:
        contato.whatsapp_phone || '',

      ultima_mensagem:
        contato.last_input_text || '',

      status_conversa:
        statusConversa,

      data_inicio_conversa_comercial:
        dataInicio,

      data_final_conversa_comercial:
        dataFinal,

      tentativas_realizadas:
        tentativasRealizadas,

      tentativa_retomada:
        tentativaAtual,

      data_ultima_tentativa:
        dataUltimaTentativa,

      mensagem_ultima_tentativa:
        mensagemUltimaTentativa,

      data_encerramento_retomada:
        dataEncerramentoRetomada,

      contexto_identificado:
        contextoIdentificado,

      motivo_escolha:
        motivoEscolha,

      data_primeira_mensagem:
        dataPrimeiraMensagem,

      ultima_mensagem_bot:
        ultimamensagembot,

      conversa_finalizada:
        conversaFinalizada,

      minutos_parado:
        minutosParado,

      elegivel_recuperacao:
        elegivelRecuperacao,

      pode_recuperar_agora:
        podeRecuperarAgora
    }
  };
});
