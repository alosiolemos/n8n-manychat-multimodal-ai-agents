let lead = null;
let origem = '';

if ($('Criar Lead2').isExecuted) {
  lead = $('Criar Lead2').first().json;
  origem = 'Criar Lead2';
}

if (!lead && $('Criar Lead4').isExecuted) {
  lead = $('Criar Lead4').first().json;
  origem = 'Criar Lead4';
}

const leadId = lead?.data?.id || '';
const addTimeOriginal = lead?.data?.add_time || '';

const addTime = addTimeOriginal
  ? DateTime
      .fromISO(addTimeOriginal)
      .setZone('America/Sao_Paulo')
      .toFormat('dd/MM/yyyy HH:mm')
  : '';

const success =
  lead?.success === true ||
  Boolean(leadId);

return [
  {
    json: {
      success,
      lead_id: leadId,
      add_time: addTime,
      lead_criado_pipedrive: `${success} - ${leadId}`,
      origem
    }
  }
];
