/* ==========================================================
   CONFIGURACIÓN — edita estos datos
   ========================================================== */
const CONFIG = {
  whatsapp: '58XXXXXXXXXX',          // Número con código de país, sin + ni espacios. Ej: 584121234567
  instagram: 'kuacreativa',          // Usuario de Instagram (sin @)
  map: { lat: 10.2600, lng: -68.0180, zoom: 15 }  // Aproximado en Naguanagua: reemplazar por la ubicación exacta de C.C. Biarritz
};

/* Proyectos del portafolio. Para usar fotos reales, añade  img: 'assets/foto.jpg'  */
const PROJECTS = [
  { cat: 'Impresiones', title: 'Valla publicitaria en gran formato', ratio: '4/3',
    desc: 'Gigantografía impresa en lona de alta resistencia con colores saturados y acabado duradero para exteriores.',
    specs: { Servicio: 'Impresión · Montaje', Material: 'Lona frontlight 13 oz', Ubicación: 'Exterior' } },
  { cat: 'Diseño', title: 'Identidad visual completa', ratio: '1/1',
    desc: 'Desarrollo de logotipo, paleta cromática, tipografías y manual de uso para una marca nueva.',
    specs: { Servicio: 'Branding', Entregables: 'Logo · Paleta · Manual', Formato: 'Digital e impreso' } },
  { cat: 'Impresiones', title: 'Banners y displays para eventos', ratio: '1/1',
    desc: 'Banners roll-up, pendones y fondos de escenario impresos en alta definición para ferias y activaciones de marca.',
    specs: { Servicio: 'Impresión', Material: 'Lona · Tela · Vinil', Ubicación: 'Interior' } },
  { cat: 'Diseño', title: 'Papelería y piezas corporativas', ratio: '4/5',
    desc: 'Tarjetas, carpetas, facturas, sobres y material institucional con una línea gráfica coherente.',
    specs: { Servicio: 'Diseño · Impresión', Entregables: 'Papelería completa', Formato: 'Offset / digital' } },
  { cat: 'Impresiones', title: 'Stickers y etiquetas troqueladas', ratio: '4/3',
    desc: 'Stickers adhesivos y etiquetas con troquel personalizado para empaques, productos y material P.O.P.',
    specs: { Servicio: 'Diseño · Impresión · Troquelado', Material: 'Vinil adhesivo', Ubicación: 'Productos / P.O.P.' } },
  { cat: 'Instalaciones', title: 'Vinil decorativo en oficinas', ratio: '3/4',
    desc: 'Murales, vinil esmerilado y gráficos de pared para transformar espacios corporativos interiores.',
    specs: { Servicio: 'Diseño · Instalación', Material: 'Vinil impreso y esmerilado', Ubicación: 'Interior' } },
  { cat: 'Diseño', title: 'Rediseño de logotipo', ratio: '4/3',
    desc: 'Evolución de una marca existente: más limpia, más versátil y lista para gran formato.',
    specs: { Servicio: 'Branding', Entregables: 'Logo · Variantes', Formato: 'Vectorial' } }
];

/* ==========================================================
   UTILIDADES
   ========================================================== */
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasGSAP = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';
/* Modo ligero (teléfonos/tablets táctiles): sin scroll suave JS, sin parallax por scroll y preloader corto */
const lite = matchMedia('(max-width: 767px), (hover: none)').matches;
const seenIntro = (() => { try { return sessionStorage.getItem('kua-seen') === '1'; } catch (e) { return false; } })();
const waURL = (text) => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;

$('#year').textContent = new Date().getFullYear();
$$('[data-wa]').forEach(a => a.href = waURL(a.dataset.wa));
$('#igLink').href = `https://instagram.com/${CONFIG.instagram}`;
$('#igText').textContent = '@' + CONFIG.instagram;
$('#dirLink').href = `https://www.google.com/maps/search/?api=1&query=${CONFIG.map.lat},${CONFIG.map.lng}`;

/* Marquee */
(() => {
  const words = ['Gigantografía', 'Vinilos', 'Branding', 'Stickers', 'Instalación', 'Diseño gráfico', 'Material P.O.P.', 'Imagen corporativa'];
  const row = words.map(w => `<span class="px-6 whitespace-nowrap">${w}</span><span class="text-coral px-2">✦</span>`).join('');
  $('#marquee').innerHTML = row + row;
})();

/* ==========================================================
   ARTE GENERATIVO (placeholders hasta tener fotos reales)
   ========================================================== */
function rnd(seed) { let s = seed * 9301 + 49297; return () => (s = (s * 9301 + 49297) % 233280) / 233280; }
const HEIGHTS = { '4/5': 1000, '1/1': 800, '4/3': 600, '3/4': 1066 };

function art(cat, i, ratio = '4/5') {
  const W = 800, H = HEIGHTS[ratio] || 1000, r = rnd(i + 3);
  const hue = ['#E63946', '#FF5A5F', '#C1121F', '#FF6B6B'][i % 4];
  let body = '';
  if (cat === 'Instalaciones') {
    const top = H * .3, bw = 560, bx = (W - bw) / 2;
    body = `
      <rect x="${bx}" y="${top}" width="${bw}" height="${H - top - 90}" fill="#1c1c1c"/>
      <rect x="${bx}" y="${top}" width="${bw}" height="110" fill="${hue}"/>
      <rect x="${bx + 40}" y="${top + 34}" width="${180 + r() * 120}" height="18" rx="9" fill="#fff"/>
      <rect x="${bx + 40}" y="${top + 62}" width="120" height="10" rx="5" fill="#fff" opacity=".6"/>
      ${[0, 1, 2, 3, 4, 5, 6].map(k => `<path d="M${bx + k * 80} ${top + 110} h80 l-10 36 h-60z" fill="${k % 2 ? '#fff' : '#2a2a2a'}" opacity="${k % 2 ? .9 : 1}"/>`).join('')}
      <rect x="${bx + 40}" y="${top + 180}" width="${bw - 200}" height="${H - top - 330}" rx="6" fill="url(#glass)"/>
      <path d="M${bx + 40} ${H - 160} q90 -90 180 -30 t180 -40 v70 h-360z" fill="${hue}" opacity=".85"/>
      <rect x="${bx + bw - 130}" y="${top + 180}" width="90" height="${H - top - 270}" rx="4" fill="#0d0d0d" stroke="#333"/>
      <rect x="0" y="${H - 90}" width="${W}" height="90" fill="#0f0f0f"/>
      <defs><linearGradient id="glass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3a3a3a"/><stop offset="1" stop-color="#121212"/></linearGradient></defs>`;
  } else if (cat === 'Impresiones') {
    const bh = H * .42, by = H * .18;
    body = `
      <rect x="0" y="${H * .72}" width="${W}" height="${H * .28}" fill="#0f0f0f"/>
      <rect x="${W / 2 - 14}" y="${by + bh}" width="28" height="${H * .72 - by - bh + 40}" fill="#2a2a2a"/>
      <rect x="70" y="${by}" width="${W - 140}" height="${bh}" rx="6" fill="#161616" stroke="#333" stroke-width="4"/>
      <rect x="90" y="${by + 20}" width="${W - 180}" height="${bh - 40}" fill="url(#pan)"/>
      <circle cx="${220 + r() * 120}" cy="${by + bh / 2}" r="${60 + r() * 50}" fill="#fff" opacity=".92"/>
      ${[0, 1, 2, 3, 4].map(k => `<rect x="${W - 330 + k * 22}" y="${by + 20}" width="12" height="${bh - 40}" fill="#fff" opacity="${.12 + k * .06}" transform="skewX(-14)"/>`).join('')}
      <rect x="${W / 2 - 40}" y="${by + bh / 2 - 12}" width="${200 + r() * 80}" height="24" rx="12" fill="#0D0D0D" opacity=".85"/>
      <defs><linearGradient id="pan" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${hue}"/><stop offset="1" stop-color="#7a1523"/></linearGradient></defs>`;
  } else {
    const cx = W / 2, cy = H * .42;
    body = `
      <g stroke="#fff" stroke-opacity=".08">${Array.from({ length: 11 }, (_, k) => `<path d="M${k * 80} 0V${H}M0 ${k * 80}H${W}"/>`).join('')}</g>
      <circle cx="${cx - 60}" cy="${cy}" r="${150 + r() * 30}" fill="${hue}"/>
      <circle cx="${cx + 70}" cy="${cy + 20}" r="${150 + r() * 30}" fill="none" stroke="#fff" stroke-width="3"/>
      <path d="M${cx - 60} ${cy - 150} L${cx + 70} ${cy + 170}" stroke="#0d0d0d" stroke-width="3"/>
      <text x="${cx - 190}" y="${H * .8}" font-family="Georgia, serif" font-size="150" fill="#fff" font-weight="700">Aa</text>
      ${['#E63946', '#fff', '#8a8a8a', '#262626'].map((c, k) => `<circle cx="${cx + 20 + k * 52}" cy="${H * .76}" r="20" fill="${c}" stroke="#444"/>`).join('')}`;
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice">
    <defs><radialGradient id="bg" cx="${30 + r() * 40}%" cy="${20 + r() * 20}%" r="90%"><stop offset="0" stop-color="${hue}" stop-opacity=".35"/><stop offset="1" stop-color="#0d0d0d"/></radialGradient></defs>
    <rect width="${W}" height="${H}" fill="#0d0d0d"/><rect width="${W}" height="${H}" fill="url(#bg)"/>${body}</svg>`;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}
/* Fotos de stock (Unsplash) mientras no haya fotos propias. Si una falla, se usa la ilustración. */
const PHOTOS = [
  'photo-1699480114704-ac153307d2a0', // valla publicitaria
  'photo-1788869521029-15f572da50f2', // identidad visual / packaging
  'photo-1790422181210-f34696ad41ab', // backdrop de evento
  'photo-1516131206008-dd041a9764fd', // papelería corporativa
  'photo-1633533452206-8ab246b00e30', // stickers troquelados
  'photo-1715593948000-adbdf0cee759', // vinil decorativo en oficina
  'photo-1713616147761-c126f8009c6f'  // bocetos de logotipo
];
const HERO_PHOTO = 'photo-1763256552751-db613582fb2c';   // instalación de gigantografía en edificio
const BANNER_PHOTO = 'photo-1693031630369-bd429a57f115'; // impresora de gran formato
const unsplash = (id, w) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;
const srcset = (id, ws) => ws.map(w => `${unsplash(id, w)} ${w}w`).join(', ');
const srcOf = (p, i, w = 900) => p.img || (PHOTOS[i] ? unsplash(PHOTOS[i], w) : art(p.cat, i, p.ratio));
const fallback = (img, p, i) => { img.onerror = () => { img.onerror = null; img.removeAttribute('srcset'); img.src = art(p.cat, i, p.ratio); }; };

const heroImg = $('#heroArt'), bannerImg = $('#bannerImg');
heroImg.onerror = () => { heroImg.onerror = null; heroImg.src = art('Impresiones', 4, '4/5'); };
bannerImg.onerror = () => { bannerImg.onerror = null; bannerImg.removeAttribute('srcset'); bannerImg.src = art('Impresiones', 7, '4/3'); };
/* La composición del hero está oculta en móvil: no descargamos su foto allí */
if (matchMedia('(min-width: 768px)').matches) heroImg.src = unsplash(HERO_PHOTO, 700);
bannerImg.sizes = '100vw';
bannerImg.srcset = srcset(BANNER_PHOTO, [700, 1100, 1600, 2000]);
bannerImg.src = unsplash(BANNER_PHOTO, 1100);

/* ==========================================================
   PORTAFOLIO: render, filtros, modal
   ========================================================== */
const grid = $('#grid');
grid.innerHTML = PROJECTS.map((p, i) => `
  <button class="p-card group relative block w-full mb-5 break-inside-avoid rounded-3xl overflow-hidden border border-line bg-panel text-left" data-i="${i}" data-cat="${p.cat}" data-cursor="view" aria-label="Ver proyecto: ${p.title}" style="aspect-ratio:${p.ratio}">
    <div class="zoom absolute inset-0"><img class="p-img absolute left-0 w-full h-[118%] -top-[9%] object-cover" src="${srcOf(p, i, 640)}" ${PHOTOS[i] && !p.img ? `srcset="${srcset(PHOTOS[i], [400, 640, 800])}" sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"` : ''} alt="${p.title}" width="640" height="800" loading="lazy" decoding="async"></div>
    <span class="absolute top-4 left-4 text-[11px] tracking-[.16em] uppercase bg-ink/70 backdrop-blur px-3 py-1.5 rounded-full border border-white/10">${p.cat}</span>
    <div class="overlay absolute inset-0 flex items-end p-6"><div class="ov-txt"><h3 class="font-display text-xl md:text-2xl leading-tight mb-1.5">${p.title}</h3><p class="text-sm text-white/65">Ver detalles →</p></div></div>
  </button>`).join('');

const cards = $$('.p-card');
let gridRevealed = false;
const visibleCards = () => cards.filter(c => c.style.display !== 'none');

function revealCards() {
  gridRevealed = true;
  if (!hasGSAP || reduceMotion) { cards.forEach(c => c.style.opacity = 1); return; }
  gsap.fromTo(visibleCards(), { opacity: 0, y: 50, scale: .96 }, { opacity: 1, y: 0, scale: 1, duration: .9, ease: 'expo.out', stagger: .08, overwrite: true });
}

$$('.filter-btn').forEach(btn => btn.addEventListener('click', () => {
  $$('.filter-btn').forEach(b => b.setAttribute('aria-pressed', b === btn));
  const f = btn.dataset.filter;
  cards.forEach(c => c.style.display = (f === 'all' || c.dataset.cat === f) ? '' : 'none');
  revealCards();
  if (hasGSAP) setTimeout(() => ScrollTrigger.refresh(), 60);
}));

/* Modal */
const modal = $('#modal'), mPanel = $('#mPanel'), mBackdrop = $('#mBackdrop');
let current = 0, lastFocus = null;

function fillModal(i) {
  const p = PROJECTS[i]; current = i;
  $('#mImg').src = srcOf(p, i, lite ? 800 : 1200); $('#mImg').alt = p.title;
  $('#mCat').textContent = p.cat; $('#mTitle').textContent = p.title; $('#mDesc').textContent = p.desc;
  $('#mSpecs').innerHTML = Object.entries(p.specs).map(([k, v]) => `<div class="flex justify-between gap-6 border-b border-line pb-3"><dt class="text-white/40">${k}</dt><dd class="text-right">${v}</dd></div>`).join('');
  $('#mCta').href = waURL(`Hola kua creativa, vi el proyecto "${p.title}" en su portafolio y quisiera cotizar algo similar.`);
}
function openModal(i) {
  lastFocus = document.activeElement; fillModal(i);
  modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false');
  window.lenis && lenis.stop(); document.documentElement.style.overflow = 'hidden';
  if (hasGSAP && !reduceMotion) {
    gsap.to(mBackdrop, { opacity: 1, duration: .4 });
    gsap.fromTo(mPanel, { opacity: 0, y: 40, scale: .96 }, { opacity: 1, y: 0, scale: 1, duration: .6, ease: 'expo.out' });
  } else { mBackdrop.style.opacity = 1; mPanel.style.opacity = 1; }
  $('#mClose').focus();
}
function closeModal() {
  const done = () => {
    modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true');
    document.documentElement.style.overflow = ''; window.lenis && lenis.start();
    lastFocus && lastFocus.focus();
  };
  if (hasGSAP && !reduceMotion) {
    gsap.to(mBackdrop, { opacity: 0, duration: .3 });
    gsap.to(mPanel, { opacity: 0, y: 24, duration: .3, ease: 'power2.in', onComplete: done });
  } else { mBackdrop.style.opacity = 0; mPanel.style.opacity = 0; done(); }
}
function step(dir) {
  const list = visibleCards().map(c => +c.dataset.i);
  const idx = list.indexOf(current);
  fillModal(list[(idx + dir + list.length) % list.length]);
  if (hasGSAP && !reduceMotion) gsap.fromTo('#mImg', { opacity: 0, scale: 1.05 }, { opacity: 1, scale: 1, duration: .6, ease: 'expo.out' });
}
cards.forEach(c => { fallback($('.p-img', c), PROJECTS[+c.dataset.i], +c.dataset.i); c.addEventListener('click', () => openModal(+c.dataset.i)); });
fallback($('#mImg'), { cat: 'Diseño', ratio: '4/5' }, 0);
$('#mClose').addEventListener('click', closeModal);
mBackdrop.addEventListener('click', closeModal);
modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
$('#mPrev').addEventListener('click', () => step(-1));
$('#mNext').addEventListener('click', () => step(1));
document.addEventListener('keydown', e => {
  if (!modal.classList.contains('open')) return;
  if (e.key === 'Escape') closeModal();
  if (e.key === 'ArrowLeft') step(-1);
  if (e.key === 'ArrowRight') step(1);
  if (e.key === 'Tab') { // atrapar foco dentro del modal
    const f = $$('button, a[href]', mPanel).filter(el => el.offsetParent !== null);
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});

/* Formulario → WhatsApp */
$('#quoteForm').addEventListener('submit', e => {
  e.preventDefault();
  const name = $('#fName').value.trim(), svc = $('#fSvc').value, msg = $('#fMsg').value.trim();
  const err = $('#fErr');
  if (!name) { err.classList.remove('hidden'); $('#fName').focus(); return; }
  err.classList.add('hidden');
  const text = `Hola kua creativa, soy ${name}. Me interesa: ${svc}.${msg ? '\n\n' + msg : ''}`;
  window.open(waURL(text), '_blank', 'noopener');
});

/* Mapa oscuro (Leaflet + tiles CARTO Dark Matter) */
function initMap() {
  if (typeof L === 'undefined') { $('#map').innerHTML = '<p class="p-8 text-white/50">No se pudo cargar el mapa.</p>'; return; }
  const { lat, lng, zoom } = CONFIG.map;
  /* En táctil, un dedo desplaza la página (no el mapa); pellizco para hacer zoom */
  const map = L.map('map', { scrollWheelZoom: false, zoomControl: true, dragging: !lite, tap: false }).setView([lat, lng], zoom);
  /* Teselas de OpenStreetMap (gratuitas, sin API key); el modo oscuro se aplica con un filtro CSS (.leaflet-tile-pane) */
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19
  }).addTo(map);
  const icon = L.divIcon({ className: '', html: '<div class="map-pin"><i></i></div>', iconSize: [22, 22], iconAnchor: [11, 11] });
  L.marker([lat, lng], { icon, title: 'kua creativa' }).addTo(map).bindPopup('<strong>kua creativa</strong><br>C.C. Biarritz, Naguanagua');
  map.on('click', () => map.scrollWheelZoom.enable());
  map.on('mouseout', () => map.scrollWheelZoom.disable());
  window.__map = map;
}

/* Leaflet se descarga solo cuando el mapa está por entrar en pantalla */
function loadMap() {
  const css = document.createElement('link');
  css.rel = 'stylesheet'; css.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css';
  document.head.appendChild(css);
  const s = document.createElement('script');
  s.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js';
  s.onload = initMap; s.onerror = initMap;
  document.head.appendChild(s);
}
if ('IntersectionObserver' in window) {
  new IntersectionObserver((entries, obs) => { if (entries[0].isIntersecting) { obs.disconnect(); loadMap(); } }, { rootMargin: '700px' }).observe($('#map'));
} else loadMap();

/* ==========================================================
   ANIMACIONES
   ========================================================== */
function showEverything() {
  const pl = $('#preloader'); if (pl) pl.remove();
  $$('[data-reveal], .p-card, .hero-in').forEach(el => { el.style.opacity = 1; el.style.transform = 'none'; });
  $$('.mask-line > span').forEach(s => s.style.transform = 'none');
}

if (!hasGSAP) {
  showEverything();
} else {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true }); // la barra de direcciones del móvil no debe recalcular todo
  document.documentElement.classList.add('gsap-on');

  /* Scroll suave */
  if (!reduceMotion && !lite && typeof Lenis !== 'undefined') {
    window.lenis = new Lenis({ lerp: .09, wheelMultiplier: 1 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    lenis.stop();
  }
  $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const id = a.getAttribute('href'); if (id.length < 2) return;
    const t = $(id); if (!t) return;
    e.preventDefault(); closeMenu();
    window.lenis ? lenis.scrollTo(t, { offset: -70, duration: 1.4 }) : t.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  }));

  /* Preloader */
  const plText = $('#plText');
  'kua creativa'.split('').forEach(ch => {
    const s = document.createElement('span'); s.className = 'pl-char';
    s.innerHTML = ch === ' ' ? '&nbsp;' : ch;
    if ('kua'.includes(ch) && plText.children.length < 3) s.style.fontWeight = 700; else s.style.opacity = .75;
    plText.appendChild(s);
  });
  const counter = { v: 0 };
  const intro = gsap.timeline({ defaults: { ease: 'expo.out' } });
  try { sessionStorage.setItem('kua-seen', '1'); } catch (e) {}

  const at = (base, off) => typeof base === 'number' ? base + off : `${base}+${off}`;
  const heroIn = (pos) => intro
    .to('#header', { yPercent: 0, duration: .9 }, pos)
    .to('.mask-line > span', { yPercent: 0, duration: 1, stagger: .05 }, at(pos, .1))
    .to('.hero-in', { opacity: 1, y: 0, duration: .9, stagger: .08 }, at(pos, .3));

  if (reduceMotion) {
    $('#preloader').remove(); $$('.mask-line > span').forEach(s => s.style.transform = 'none');
    gsap.set('.hero-in', { opacity: 1 });
  } else if (seenIntro) {
    /* Visita repetida en la misma sesión: sin preloader, solo la entrada del hero */
    $('#preloader').remove();
    gsap.set('.mask-line > span', { yPercent: 115 });
    gsap.set('#header', { yPercent: -100 });
    gsap.set('.hero-in', { y: 24 });
    heroIn(0);
    window.lenis && lenis.start();
  } else {
    gsap.set('.pl-char', { yPercent: 120 });
    gsap.set('.mask-line > span', { yPercent: 115 });
    gsap.set('#header', { yPercent: -100 });
    gsap.set('.hero-in', { y: 24 });
    intro
      .from('#plMark', { scale: 0, rotate: -180, duration: 1 }, 0)
      .to('.pl-char', { yPercent: 0, duration: .9, stagger: .04 }, .1)
      .to(counter, { v: 100, duration: 1.3, ease: 'power2.inOut', onUpdate: () => $('#plCount').textContent = Math.round(counter.v) }, 0)
      .to('#plBar', { scaleX: 1, duration: 1.3, ease: 'power2.inOut' }, 0)
      .to('#preloader > *', { opacity: 0, y: -30, duration: .4, stagger: .04, ease: 'power3.in' }, '+=.15')
      .to('#preloader', { yPercent: -100, duration: .9, ease: 'expo.inOut' }, '>-.1')
      .add(() => { $('#preloader').remove(); window.lenis && lenis.start(); }, '>-.3');
    heroIn('<');
  }

  /* Red de seguridad: si algo falla o tarda demasiado, nunca dejar la página bloqueada */
  const rescue = () => {
    if (!$('#preloader') && document.documentElement.dataset.rescued) return;
    document.documentElement.dataset.rescued = '1';
    intro.kill(); showEverything();
    const hd = $('#header'); if (hd) { hd.style.transform = 'none'; }
    window.lenis && lenis.start();
  };
  setTimeout(() => { if ($('#preloader')) rescue(); }, 6500);
  addEventListener('error', () => { if ($('#preloader')) rescue(); });

  /* Reveal al hacer scroll */
  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 88%', once: true,
    onEnter: els => gsap.to(els, { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', stagger: .12 })
  });
  ScrollTrigger.create({ trigger: grid, start: 'top 82%', once: true, onEnter: () => { if (!gridRevealed) revealCards(); } });

  if (!reduceMotion && !lite) {
    /* Parallax: imágenes del portafolio */
    cards.forEach(c => gsap.fromTo($('.p-img', c), { yPercent: -7 }, {
      yPercent: 7, ease: 'none', scrollTrigger: { trigger: c, start: 'top bottom', end: 'bottom top', scrub: true }
    }));
    /* Parallax: banner de gigantografía */
    gsap.fromTo('#bannerImg', { yPercent: -10 }, { yPercent: 10, ease: 'none', scrollTrigger: { trigger: '#bannerImg', start: 'top bottom', end: 'bottom top', scrub: true, endTrigger: '#bannerImg' } });
    /* Parallax suave de blobs del hero */
    gsap.to('.float-a', { y: 160, ease: 'none', scrollTrigger: { trigger: '#inicio', start: 'top top', end: 'bottom top', scrub: true } });
    /* Marquee reacciona al scroll */
    gsap.to('#marquee', { x: -120, ease: 'none', scrollTrigger: { trigger: '#marquee', start: 'top bottom', end: 'bottom top', scrub: .6 } });

    /* Composición hero: parallax con el mouse */
    const hv = $('#heroVisual');
    if (hv && matchMedia('(hover: hover)').matches) {
      const layers = $$('.hv-layer', hv).map(el => ({ el, d: +el.dataset.depth, x: gsap.quickTo(el, 'x', { duration: .9, ease: 'power3' }), y: gsap.quickTo(el, 'y', { duration: .9, ease: 'power3' }) }));
      $('#inicio').addEventListener('mousemove', e => {
        const nx = e.clientX / innerWidth - .5, ny = e.clientY / innerHeight - .5;
        layers.forEach(l => { l.x(nx * l.d * 2); l.y(ny * l.d * 2); });
      });
    }
  }

  /* Subtítulo dinámico */
  const subs = $$('.sub-item'); let si = 0;
  const lightSub = () => subs.forEach((s, k) => { s.classList.toggle('text-white', k === si); s.classList.toggle('text-white/40', k !== si); });
  lightSub(); setInterval(() => { si = (si + 1) % subs.length; lightSub(); }, 2200);

  /* Header: se oculta al bajar, aparece al subir + fondo cristal */
  const bar = $('#headerBar');
  let lastY = 0, wasScrolled = false, hdrHidden = false;
  ScrollTrigger.create({
    start: 0, end: 'max',
    onUpdate: self => {
      const y = self.scroll();
      const scrolled = y > 40;
      if (scrolled !== wasScrolled) {
        wasScrolled = scrolled;
        ['bg-ink/90', 'backdrop-blur-xl', 'border-b', 'border-white/5'].forEach(c => bar.classList.toggle(c, scrolled));
      }
      const hide = y > lastY && y > 300 && !menuOpen;
      if (hide !== hdrHidden && Math.abs(y - lastY) > 4 && !$('#preloader')) {
        hdrHidden = hide;
        gsap.to('#header', { yPercent: hide ? -100 : 0, duration: .5, ease: 'power3.out', overwrite: true });
      }
      lastY = y;
    }
  });

  /* Enlace activo */
  const links = $$('.nav-link');
  ['inicio', 'servicios', 'portafolio', 'nosotros', 'ubicacion', 'contacto'].forEach(id => {
    ScrollTrigger.create({ trigger: '#' + id, start: 'top 55%', end: 'bottom 55%',
      onToggle: s => { if (!s.isActive) return; links.forEach(l => l.classList.toggle('text-white', l.getAttribute('href') === '#' + id)); } });
  });

  /* Botones magnéticos */
  if (!reduceMotion && matchMedia('(hover: hover)').matches) {
    $$('.magnetic').forEach(el => {
      const qx = gsap.quickTo(el, 'x', { duration: .5, ease: 'power3' }), qy = gsap.quickTo(el, 'y', { duration: .5, ease: 'power3' });
      el.addEventListener('mousemove', e => { const r = el.getBoundingClientRect(); qx((e.clientX - r.left - r.width / 2) * .25); qy((e.clientY - r.top - r.height / 2) * .35); });
      el.addEventListener('mouseleave', () => { qx(0); qy(0); });
    });
  }

  window.addEventListener('load', () => ScrollTrigger.refresh());
}

/* Resplandor que sigue al cursor en tarjetas de servicio */
$$('.glow').forEach(c => c.addEventListener('pointermove', e => {
  const r = c.getBoundingClientRect(); c.style.setProperty('--mx', (e.clientX - r.left) + 'px'); c.style.setProperty('--my', (e.clientY - r.top) + 'px');
}));

/* Menú móvil */
let menuOpen = false;
const menu = $('#mobileMenu'), menuBtn = $('#menuBtn');
function toggleMenu(open) {
  menuOpen = open; menuBtn.setAttribute('aria-expanded', open);
  document.documentElement.style.overflow = open ? 'hidden' : ''; // sin scroll de fondo con el menú abierto
  $('#menuBtn').setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  if (open) {
    menu.classList.remove('hidden'); menu.classList.add('flex');
    window.lenis && lenis.stop();
    if (hasGSAP) { gsap.to(menu, { clipPath: 'inset(0 0 0% 0)', duration: .8, ease: 'expo.out' }); gsap.fromTo('.m-link', { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: .07, duration: .8, ease: 'expo.out', delay: .15 }); }
    else menu.style.clipPath = 'none';
    gsap.to('#b1', { y: 6, rotate: 45, duration: .3 }); gsap.to('#b2', { y: -6, rotate: -45, duration: .3 });
  } else {
    window.lenis && lenis.start();
    gsap.to('#b1', { y: 0, rotate: 0, duration: .3 }); gsap.to('#b2', { y: 0, rotate: 0, duration: .3 });
    gsap.to(menu, { clipPath: 'inset(0 0 100% 0)', duration: .6, ease: 'expo.inOut', onComplete: () => { menu.classList.add('hidden'); menu.classList.remove('flex'); } });
  }
}
function closeMenu() { if (menuOpen) toggleMenu(false); }
menuBtn.addEventListener('click', () => toggleMenu(!menuOpen));

/* Cursor personalizado */
if (hasGSAP && !reduceMotion && matchMedia('(hover: hover) and (pointer: fine)').matches) {
  document.documentElement.classList.add('has-cursor');
  const dot = $('#cursor-dot'), ring = $('#cursor-ring'), label = $('#cursor-label');
  const dx = gsap.quickTo(dot, 'x', { duration: .1 }), dy = gsap.quickTo(dot, 'y', { duration: .1 });
  const rx = gsap.quickTo(ring, 'x', { duration: .45, ease: 'power3' }), ry = gsap.quickTo(ring, 'y', { duration: .45, ease: 'power3' });
  addEventListener('mousemove', e => { dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY); });
  document.addEventListener('mouseover', e => {
    const t = e.target.closest('a, button, input, select, textarea, [data-cursor]');
    ring.classList.remove('is-link', 'is-view'); label.textContent = '';
    if (!t) { gsap.to(ring, { scale: 1, duration: .35 }); gsap.to(dot, { scale: 1, duration: .3 }); return; }
    if (t.dataset.cursor === 'view') { ring.classList.add('is-view'); label.textContent = 'Ver'; gsap.to(ring, { scale: 2, duration: .4, ease: 'power3' }); gsap.to(dot, { scale: 0, duration: .2 }); }
    else { ring.classList.add('is-link'); gsap.to(ring, { scale: 1.6, duration: .4, ease: 'power3' }); }
  });
  document.addEventListener('mouseleave', () => gsap.to([ring, dot], { opacity: 0, duration: .2 }));
  document.addEventListener('mouseenter', () => gsap.to([ring, dot], { opacity: 1, duration: .2 }));
}

/* Seguridad: si algo falla, no dejar el sitio bloqueado */
setTimeout(() => { const p = $('#preloader'); if (p && !hasGSAP) p.remove(); }, 4000);
