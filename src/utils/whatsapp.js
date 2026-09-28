import { site } from '../data/site.js';

export function whatsappUrl(service = '') {
  const subject = service ? ` «${service}»` : '';
  const message = `Здравствуйте! Хочу уточнить стоимость услуги${subject}.`;
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function bookingUrl({ name, phone, service }) {
  const message = [
    'Здравствуйте! Хочу записаться на консультацию.',
    `Имя: ${name}`,
    `Телефон: ${phone}`,
    `Услуга: ${service}`,
  ].join('\n');
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
