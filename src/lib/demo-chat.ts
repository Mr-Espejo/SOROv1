const KEYWORD_RESPONSES: Array<{ keywords: string[]; answer: string }> = [
  {
    keywords: ['precio', 'coste', 'costo', 'plan', 'planes'],
    answer:
      'SORO se adapta al volumen de tu clinica y al canal que quieras activar. Si quieres, te mostramos el funnel y luego te ayudamos a cotizar la configuracion ideal.',
  },
  {
    keywords: ['cita', 'agendar', 'agenda', 'reservar'],
    answer:
      'Puedo ayudarte a agendar una cita. Cuentame el tratamiento que buscas y el horario que prefieres, y te guio como lo haria SORO con un paciente real.',
  },
  {
    keywords: ['whatsapp', 'numero', 'numero real', 'conectar'],
    answer:
      'SORO puede conectarse a WhatsApp para responder, clasificar leads y confirmar citas. En la implementacion real, lo conectamos a tu numero y a tu calendario.',
  },
  {
    keywords: ['recordatorio', 'recordatorios', 'ausencias', 'no show'],
    answer:
      'Uno de los usos mas fuertes es enviar recordatorios automaticos y seguimiento para reducir ausencias y recuperar citas perdidas.',
  },
  {
    keywords: ['clinica', 'odontologia', 'dental', 'paciente'],
    answer:
      'SORO esta pensado para clinicas dentales: responde preguntas frecuentes, filtra pacientes, agenda y da seguimiento sin perder el tono de tu marca.',
  },
];

export function getDemoChatResponse(input: string): string {
  const normalizedInput = input.toLowerCase();

  const matchedResponse = KEYWORD_RESPONSES.find(({ keywords }) =>
    keywords.some((keyword) => normalizedInput.includes(keyword))
  );

  if (matchedResponse) {
    return matchedResponse.answer;
  }

  return 'Te puedo ayudar con agendamiento, WhatsApp, precios, recordatorios y automatizacion para tu clinica. Escribe, por ejemplo: "quiero agendar una cita" o "como funciona en WhatsApp".';
}
