import {Resend} from 'resend';

export const MEETING_RECIPIENTS = [
  'sevdelin.dimitrov@ludogoriesoft.com',
  'emiliyan.kadiyski@ludogoriesoft.com',
] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type MeetingRequestInput = {
  name?: unknown;
  company?: unknown;
  email?: unknown;
  phone?: unknown;
};

export type MeetingRequestResult =
  | {ok: true; status: 200}
  | {ok: false; status: number; error: string};

function asTrimmedString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export async function sendMeetingRequest(
  input: MeetingRequestInput,
): Promise<MeetingRequestResult> {
  const name = asTrimmedString(input.name);
  const company = asTrimmedString(input.company);
  const email = asTrimmedString(input.email);
  const phone = asTrimmedString(input.phone);

  if (!name || !company || !email) {
    return {ok: false, status: 400, error: 'Моля, попълнете всички задължителни полета.'};
  }

  if (!EMAIL_RE.test(email)) {
    return {ok: false, status: 400, error: 'Моля, въведете валиден имейл адрес.'};
  }

  if (phone.length > 40) {
    return {ok: false, status: 400, error: 'Телефонният номер е твърде дълъг.'};
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM || process.env.MAIL_FROM;

  if (!apiKey || !from) {
    console.error('Missing Resend configuration (RESEND_API_KEY / RESEND_FROM)');
    return {ok: false, status: 500, error: 'Имейл услугата не е конфигурирана.'};
  }

  const safeName = escapeHtml(name);
  const safeCompany = escapeHtml(company);
  const safeEmail = escapeHtml(email);
  const safePhone = phone ? escapeHtml(phone) : '—';

  const subject = `Заявка за среща — ${company}`;
  const text = [
    'Нова заявка за безплатна предварителна среща (AI обучения за фирми)',
    '',
    `Име: ${name}`,
    `Фирма: ${company}`,
    `Имейл: ${email}`,
    `Телефон: ${phone || '—'}`,
  ].join('\n');

  const html = `
    <h2>Нова заявка за безплатна предварителна среща</h2>
    <p>Формуляр от страницата <strong>AI обучения за фирми</strong>.</p>
    <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
      <tr><td><strong>Име</strong></td><td>${safeName}</td></tr>
      <tr><td><strong>Фирма</strong></td><td>${safeCompany}</td></tr>
      <tr><td><strong>Имейл</strong></td><td><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
      <tr><td><strong>Телефон</strong></td><td>${safePhone}</td></tr>
    </table>
  `;

  try {
    const resend = new Resend(apiKey);
    const {error} = await resend.emails.send({
      from,
      to: [...MEETING_RECIPIENTS],
      replyTo: email,
      subject,
      text,
      html,
    });

    if (error) {
      console.error('Resend API error', error);
      return {ok: false, status: 500, error: 'Неуспешно изпращане. Моля, опитайте отново.'};
    }

    return {ok: true, status: 200};
  } catch (error) {
    console.error('Failed to send meeting request email', error);
    return {ok: false, status: 500, error: 'Неуспешно изпращане. Моля, опитайте отново.'};
  }
}
