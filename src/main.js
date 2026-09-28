import './styles.css';
import { site, nav, facts, services, packages, gallery, faq } from './data/site.js';
import { whatsappUrl, bookingUrl } from './utils/whatsapp.js';

const icon = (name) => ({
  arrow: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  menu: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 7h16M4 17h16"/></svg>',
  close: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="m6 6 12 12M18 6 6 18"/></svg>',
  phone: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-4-2-2 2c-3.6-1.5-6.5-4.4-8-8l2-2-2-4Z"/></svg>',
  pin: '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>',
}[name]);

const navMarkup = nav.map(([label, id]) => `<a href="#${id}" data-nav="${id}">${label}</a>`).join('');
const app = document.querySelector('#app');

app.innerHTML = `
  <header class="site-header" data-header>
    <a class="wordmark" href="#top" aria-label="Gloss Car Detailing, на главную">
      <strong>GLOSS</strong><span>CAR DETAILING</span>
    </a>
    <nav class="desktop-nav" aria-label="Основная навигация">${navMarkup}</nav>
    <a class="header-cta" href="#booking">Записаться</a>
    <button class="menu-toggle" type="button" aria-label="Открыть меню" aria-expanded="false" aria-controls="mobile-menu">${icon('menu')}</button>
  </header>
  <div class="mobile-menu" id="mobile-menu" aria-hidden="true">
    <div class="mobile-menu__top"><span>Навигация</span><button type="button" class="menu-close" aria-label="Закрыть меню">${icon('close')}</button></div>
    <nav aria-label="Мобильная навигация">${navMarkup}</nav>
    <a class="button button--accent" href="#booking">Записаться ${icon('arrow')}</a>
    <div class="mobile-menu__contact"><a href="tel:${site.phone}">${site.phoneDisplay}</a><span>${site.city}</span></div>
  </div>

  <main id="main">
    <section class="hero" id="top" aria-labelledby="hero-title">
      <img class="hero__texture" src="assets/hero.jpg" alt="" width="1920" height="1280" />
      <div class="hero__grid" aria-hidden="true"></div>
      <div class="hero__copy reveal">
        <p class="eyebrow"><span></span>Профессиональный детейлинг · Алматы</p>
        <h1 id="hero-title">Защита, которую<br><em>видно в блеске.</em></h1>
        <p class="hero__lead">Оклейка бронеплёнкой, полировка и керамика, глубокая химчистка салона.</p>
        <div class="hero__actions">
          <a class="button button--accent" href="#booking">Записаться ${icon('arrow')}</a>
          <a class="text-link" href="#services">Смотреть услуги</a>
        </div>
      </div>
      <div class="hero__visual reveal">
        <div class="hero__halo"></div>
        <img src="assets/service-1.png" alt="Тёмный спортивный автомобиль" width="2000" height="1250" fetchpriority="high" />
        <span class="hero__caption">Concept visual · 01</span>
      </div>
      <a class="hero__scroll" href="#facts"><span></span>Листайте</a>
    </section>

    <section class="facts" id="facts" aria-label="Факты о студии">
      <p class="facts__intro">Проверенные факты <span>без лишних обещаний</span></p>
      ${facts.map((fact) => `<div class="fact reveal"><strong>${fact.value}</strong><span>${fact.label}</span></div>`).join('')}
    </section>

    <section class="section services" id="services" aria-labelledby="services-title">
      <div class="section-head reveal">
        <p class="section-index">01 / УСЛУГИ</p>
        <h2 id="services-title">Работа с кузовом<br>и салоном.</h2>
        <p>Три основных направления студии — от защиты нового автомобиля до восстановления блеска и чистоты.</p>
      </div>
      <div class="service-list">
        ${services.map((service) => `
          <article class="service reveal">
            <div class="service__number">${service.number}</div>
            <div class="service__image"><img src="${service.image}" alt="${service.alt}" loading="lazy" width="750" height="500" /></div>
            <div class="service__body">
              <h3>${service.title}</h3><p>${service.text}</p>
              <div class="service__footer"><strong>${service.price}</strong><a href="${whatsappUrl(service.title)}" target="_blank" rel="noopener">Уточнить стоимость ${icon('arrow')}</a></div>
            </div>
          </article>`).join('')}
      </div>
    </section>

    <section class="section comparison" aria-labelledby="compare-title">
      <div class="comparison__copy reveal">
        <p class="section-index">02 / ДО · ПОСЛЕ</p>
        <h2 id="compare-title">Разница<br>в поверхности.</h2>
        <p>Интерактивная демонстрация эффекта обработки. Перемещайте маркер мышью, пальцем или клавишами.</p>
      </div>
      <div class="compare reveal" data-compare style="--position: 52%">
        <img class="compare__base" src="assets/work-4.png" alt="Демонстрационный визуал кузова до обработки" width="1640" height="922" />
        <div class="compare__after"><img src="assets/work-4.png" alt="Демонстрационный визуал кузова после обработки" width="1640" height="922" /></div>
        <input type="range" min="0" max="100" value="52" aria-label="Сравнить до и после" />
        <span class="compare__label compare__label--before">До</span><span class="compare__label compare__label--after">После</span>
        <span class="compare__handle" aria-hidden="true"><i></i></span>
      </div>
      <p class="compare-note">Пример визуального эффекта обработки · не фотография клиентской работы</p>
    </section>

    <section class="section pricing" id="pricing" aria-labelledby="pricing-title">
      <div class="section-head section-head--light reveal">
        <p class="section-index">03 / ПАКЕТЫ</p><h2 id="pricing-title">Защита<br>по задаче.</h2>
        <p>Два подтверждённых варианта оклейки. Итоговая стоимость зависит от автомобиля и выбранного материала.</p>
      </div>
      <div class="price-stack">
        ${packages.map((item, i) => `<article class="price-row reveal"><span class="price-row__index">0${i + 1}</span><div><h3>${item.name}</h3><ul>${item.items.map((x) => `<li>${x}</li>`).join('')}</ul></div><div class="price-row__action"><strong>${item.price}</strong><a href="${whatsappUrl(item.name)}" target="_blank" rel="noopener">Обсудить ${icon('arrow')}</a></div></article>`).join('')}
      </div>
    </section>

    <section class="section gallery" id="gallery" aria-labelledby="gallery-title">
      <div class="gallery__head reveal"><p class="section-index">04 / ДЕТАЛИ</p><h2 id="gallery-title">Детейлинг<br>крупным планом.</h2><p>Демонстрационные визуалы процесса и поверхностей.</p></div>
      <div class="gallery-grid">
        ${gallery.map(([src, alt], i) => `<button type="button" class="gallery-item gallery-item--${i + 1} reveal" data-gallery-index="${i}" aria-label="Открыть изображение: ${alt}"><img src="${src}" alt="${alt}" loading="lazy" /><span>0${i + 1}</span></button>`).join('')}
      </div>
    </section>

    <section class="section process" aria-labelledby="process-title">
      <div class="process__sticky reveal"><p class="section-index">05 / ПРОЦЕСС</p><h2 id="process-title">От задачи<br>до выдачи.</h2><p>Последовательность, которую студия описывает в своих материалах.</p></div>
      <ol class="timeline">
        ${[['Консультация', 'Уточняем задачу и подбираем решение.'], ['Подготовка', 'Очищаем и готовим поверхности.'], ['Работа', 'Выполняем согласованный комплекс.'], ['Выдача', 'Проверяем результат и обсуждаем дальнейший уход.']].map((x, i) => `<li class="reveal"><span>0${i + 1}</span><div><h3>${x[0]}</h3><p>${x[1]}</p></div></li>`).join('')}
      </ol>
    </section>

    <section class="section about" id="about" aria-labelledby="about-title">
      <div class="about__visual reveal"><img src="assets/service-2.png" alt="Тёмный автомобиль" loading="lazy" /></div>
      <div class="about__copy reveal"><p class="section-index">06 / О СТУДИИ</p><h2 id="about-title">Gloss Car<br>Detailing.</h2><p class="about__lead">Детейлинг-центр в Алматы работает с 2020 года и сосредоточен на защите и восстановлении внешнего вида автомобиля.</p><p>В официальных материалах указаны плёнки PLATINUM PPF, STEK и BODYGUARD. Статус официального дилера не заявляется.</p><a class="text-link" href="#contacts">Контакты студии</a></div>
    </section>

    <section class="section faq" id="faq" aria-labelledby="faq-title">
      <div class="faq__head reveal"><p class="section-index">07 / FAQ</p><h2 id="faq-title">Коротко<br>о главном.</h2></div>
      <div class="accordion">
        ${faq.map(([q, a], i) => `<div class="accordion-item reveal"><h3><button type="button" aria-expanded="${i === 0}" aria-controls="faq-${i}"><span>${q}</span><i aria-hidden="true"></i></button></h3><div class="accordion-panel" id="faq-${i}" ${i ? 'hidden' : ''}><div><p>${a}</p></div></div></div>`).join('')}
      </div>
    </section>

    <section class="booking" id="booking" aria-labelledby="booking-title">
      <div class="booking__copy reveal"><p class="section-index">08 / ЗАПИСЬ</p><h2 id="booking-title">Обсудим<br>ваш автомобиль?</h2><p>Заполните три поля. Сайт сформирует текст для WhatsApp — вы сами решите, отправлять ли его.</p></div>
      <form class="booking-form reveal" novalidate>
        <label><span>Имя</span><input name="name" autocomplete="name" required minlength="2" placeholder="Как к вам обращаться" /><small></small></label>
        <label><span>Телефон</span><input name="phone" type="tel" autocomplete="tel" required pattern="[+0-9 ()-]{10,}" placeholder="+7 700 000 00 00" /><small></small></label>
        <label><span>Услуга</span><select name="service" required><option value="">Выберите</option>${services.map((x) => `<option>${x.title}</option>`).join('')}</select><small></small></label>
        <button class="button button--accent" type="submit">Продолжить в WhatsApp ${icon('arrow')}</button>
        <p class="form-note">Данные не отправляются на сервер.</p>
      </form>
    </section>

    <section class="contacts" id="contacts" aria-labelledby="contacts-title">
      <div class="contacts__label"><p class="section-index">09 / КОНТАКТЫ</p></div>
      <div class="contacts__main reveal"><h2 id="contacts-title">${site.city}<br><span>${site.address}</span></h2><p>Адрес указан по карточке 2GIS. На официальном сайте сейчас опубликован другой адрес — перед визитом уточните локацию по телефону.</p></div>
      <div class="contacts__details reveal">
        <div><span>Телефон</span><a href="tel:${site.phone}">${site.phoneDisplay}</a></div>
        <div><span>Режим на официальном сайте</span><p>${site.hours}</p></div>
        <div class="contacts__actions"><a class="button button--line" href="tel:${site.phone}">${icon('phone')} Позвонить</a><a class="button button--line" href="${whatsappUrl()}" target="_blank" rel="noopener">WhatsApp</a><a class="button button--line" href="${site.directions}" target="_blank" rel="noopener">${icon('pin')} Маршрут</a></div>
      </div>
    </section>
  </main>

  <footer class="footer">
    <a class="wordmark" href="#top"><strong>GLOSS</strong><span>CAR DETAILING</span></a>
    <nav aria-label="Навигация в подвале">${navMarkup}</nav>
    <div class="footer__social"><a href="${site.instagram}" target="_blank" rel="noopener">Instagram</a><a href="${site.youtube}" target="_blank" rel="noopener">YouTube</a></div>
    <p class="footer__note">Неофициальный концепт редизайна, созданный для портфолио. Не является официальным сайтом Gloss Car Detailing.</p>
    <p class="footer__year">© ${new Date().getFullYear()} Portfolio concept</p>
  </footer>

  <div class="lightbox" role="dialog" aria-modal="true" aria-label="Просмотр изображения" aria-hidden="true">
    <button class="lightbox__close" type="button" aria-label="Закрыть">${icon('close')}</button>
    <button class="lightbox__prev" type="button" aria-label="Предыдущее">←</button>
    <figure><img src="" alt="" /><figcaption><span></span><strong></strong></figcaption></figure>
    <button class="lightbox__next" type="button" aria-label="Следующее">→</button>
  </div>
`;

const body = document.body;
const menu = document.querySelector('.mobile-menu');
const menuToggle = document.querySelector('.menu-toggle');
const menuClose = document.querySelector('.menu-close');
let previousFocus;

function setMenu(open) {
  menu.classList.toggle('is-open', open);
  menu.setAttribute('aria-hidden', String(!open));
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
  body.classList.toggle('scroll-lock', open);
  if (open) { previousFocus = document.activeElement; menuClose.focus(); } else { previousFocus?.focus(); }
}
menuToggle.addEventListener('click', () => setMenu(true));
menuClose.addEventListener('click', () => setMenu(false));
menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));

const header = document.querySelector('[data-header]');
const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('[data-nav]')];
const activeObserver = new IntersectionObserver((entries) => {
  entries.filter((entry) => entry.isIntersecting).forEach((entry) => {
    navLinks.forEach((link) => link.classList.toggle('is-active', link.dataset.nav === entry.target.id));
  });
}, { rootMargin: '-30% 0px -60% 0px' });
sections.forEach((section) => activeObserver.observe(section));
window.addEventListener('scroll', () => header.classList.toggle('is-scrolled', scrollY > 32), { passive: true });

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const compare = document.querySelector('[data-compare]');
compare.querySelector('input').addEventListener('input', (event) => compare.style.setProperty('--position', `${event.target.value}%`));

document.querySelectorAll('.accordion-item button').forEach((button) => {
  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    document.querySelectorAll('.accordion-item button').forEach((other) => {
      other.setAttribute('aria-expanded', 'false');
      document.getElementById(other.getAttribute('aria-controls')).hidden = true;
    });
    if (!expanded) { button.setAttribute('aria-expanded', 'true'); document.getElementById(button.getAttribute('aria-controls')).hidden = false; }
  });
});

const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox.querySelector('img');
const lightboxCaption = lightbox.querySelector('figcaption strong');
const lightboxCounter = lightbox.querySelector('figcaption span');
let galleryIndex = 0;
let touchStartX = 0;

function showImage(index) {
  galleryIndex = (index + gallery.length) % gallery.length;
  const [src, alt] = gallery[galleryIndex];
  lightboxImage.src = src; lightboxImage.alt = alt; lightboxCaption.textContent = alt;
  lightboxCounter.textContent = `${String(galleryIndex + 1).padStart(2, '0')} / ${String(gallery.length).padStart(2, '0')}`;
  [gallery[(galleryIndex + 1) % gallery.length][0], gallery[(galleryIndex - 1 + gallery.length) % gallery.length][0]].forEach((nextSrc) => { const img = new Image(); img.src = nextSrc; });
}
function openLightbox(index) {
  previousFocus = document.activeElement; showImage(index); lightbox.classList.add('is-open'); lightbox.setAttribute('aria-hidden', 'false'); body.classList.add('scroll-lock'); lightbox.querySelector('.lightbox__close').focus();
}
function closeLightbox() { lightbox.classList.remove('is-open'); lightbox.setAttribute('aria-hidden', 'true'); body.classList.remove('scroll-lock'); previousFocus?.focus(); }
document.querySelectorAll('[data-gallery-index]').forEach((button) => button.addEventListener('click', () => openLightbox(Number(button.dataset.galleryIndex))));
lightbox.querySelector('.lightbox__close').addEventListener('click', closeLightbox);
lightbox.querySelector('.lightbox__prev').addEventListener('click', () => showImage(galleryIndex - 1));
lightbox.querySelector('.lightbox__next').addEventListener('click', () => showImage(galleryIndex + 1));
lightbox.addEventListener('click', (event) => { if (event.target === lightbox) closeLightbox(); });
lightbox.addEventListener('touchstart', (event) => { touchStartX = event.changedTouches[0].clientX; }, { passive: true });
lightbox.addEventListener('touchend', (event) => { const distance = event.changedTouches[0].clientX - touchStartX; if (Math.abs(distance) > 50) showImage(galleryIndex + (distance < 0 ? 1 : -1)); }, { passive: true });

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') { if (lightbox.classList.contains('is-open')) closeLightbox(); else if (menu.classList.contains('is-open')) setMenu(false); }
  if (lightbox.classList.contains('is-open') && event.key === 'ArrowRight') showImage(galleryIndex + 1);
  if (lightbox.classList.contains('is-open') && event.key === 'ArrowLeft') showImage(galleryIndex - 1);
});

const form = document.querySelector('.booking-form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const fields = [...form.querySelectorAll('input, select')];
  fields.forEach((field) => {
    const message = field.validity.valueMissing ? 'Заполните это поле' : field.validity.patternMismatch || field.validity.tooShort ? 'Проверьте формат' : '';
    field.closest('label').classList.toggle('has-error', Boolean(message)); field.nextElementSibling.textContent = message;
  });
  if (!form.checkValidity()) { form.querySelector(':invalid')?.focus(); return; }
  const data = Object.fromEntries(new FormData(form));
  window.open(bookingUrl(data), '_blank', 'noopener');
});

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'));
