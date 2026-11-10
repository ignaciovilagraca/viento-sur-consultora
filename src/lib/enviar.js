// Los formularios llegan por correo a info@ a través de FormSubmit, sin backend
// propio. El primer envío manda a esa casilla un mail de activación: hasta que
// alguien hace clic en él, FormSubmit no reenvía nada.
const DESTINO = 'https://formsubmit.co/ajax/info@vientosurconsultores.com';

export async function enviar(asunto, campos, responderA) {
  const res = await fetch(DESTINO, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      _subject: asunto,
      _template: 'table',
      _captcha: 'false',
      ...(responderA ? { _replyto: responderA } : {}),
      ...campos,
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || String(data.success) !== 'true') {
    throw new Error(data.message || `FormSubmit respondió ${res.status}`);
  }
}
