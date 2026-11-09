// =========================================================
// IDIOMA (ES / EN) — debe ir primero: otras partes usan t()
// =========================================================
let lang = 'es';
try{ lang = localStorage.getItem('secura-lang') === 'en' ? 'en' : 'es'; }catch(e){}

// Textos que se generan desde JS
const S = {
  es: {
    guide:'Guía rápida', closeGuide:'Cerrar guía',
    toDark:'Cambiar a modo oscuro', toLight:'Cambiar a modo claro',
    whatToDo:'Qué hacer:',
    // Verificador (IA)
    invalidMsg:'Escribí un enlace web completo y válido.',
    invalidDetail:'Por ejemplo: https://www.ejemplo.com. El enlace no fue enviado a la IA.',
    loadingMsg:'SECURA está analizando el enlace…',
    loadingDetail:'Se revisa el texto de la dirección. Algunas consultas se envían a Google Gemini.',
    serverFail:'El servidor no pudo analizar el enlace.',
    serverBad:'El servidor devolvió una respuesta inesperada.',
    estimate:p=>'Estimación del modelo para la categoría maliciosa: '+p+'% (no es una certeza).',
    noEstimate:'No fue posible mostrar la estimación numérica del modelo.',
    dangerMsg:'SECURA encontró señales que requieren mucha precaución.',
    unsureMsg:'SECURA recomienda precaución con este enlace.',
    unsureDetail:'No se confirmó que el enlace sea seguro.',
    safeMsg:'La IA no detectó patrones sospechosos en este enlace.',
    safeDetail:'Importante: esto NO garantiza que el enlace sea seguro. No introduzcas datos sensibles si tenés dudas.',
    errMsg:'No se pudo completar el análisis.',
    timeout:'La solicitud tardó demasiado. Probá nuevamente.',
    detailLabel:'Detalle: ',
    errNoClass:'Sin un análisis completo, SECURA no clasifica el enlace.',
    safetySteps:[
      'No ingreses contraseñas, códigos ni datos bancarios en el enlace.',
      'Ingresá a tu institución desde su aplicación oficial o escribiendo la dirección que ya conocías.',
      'Si ya compartiste datos, contactá a la institución por sus canales oficiales.'
    ],
    // Repaso
    count:(n,total)=>n+' de '+total+' señales marcadas',
    repaso:[
      'Marca las señales que ya reconoces. Si alguna no te suena, vuelve a mirar el ejercicio práctico.',
      'Vas empezando. Repasa el ejercicio práctico para conocer las señales que te faltan.',
      'Vas empezando. Repasa el ejercicio práctico para conocer las señales que te faltan.',
      '¡Buen avance! Ya reconoces varias señales. Ante la duda, no abras el enlace y compruébalo antes.',
      '¡Buen avance! Ya reconoces varias señales. Ante la duda, no abras el enlace y compruébalo antes.',
      '¡Muy bien! Casi las conoces todas. Repasa la que te falta.',
      '¡Felicidades! Reconoces las 6 señales de alerta. Recuerda: ante la duda, no hagas clic y comprueba el enlace.'
    ]
  },
  en: {
    guide:'Quick guide', closeGuide:'Close guide',
    toDark:'Switch to dark mode', toLight:'Switch to light mode',
    whatToDo:'What to do:',
    // Checker (AI)
    invalidMsg:'Enter a complete and valid web link.',
    invalidDetail:'For example: https://www.example.com. The link was not sent to the AI.',
    loadingMsg:'SECURA is analyzing the link…',
    loadingDetail:'The address text is checked. Some requests are sent to Google Gemini.',
    serverFail:'The server could not analyze the link.',
    serverBad:'The server returned an unexpected response.',
    estimate:p=>'Model estimate for the malicious category: '+p+'% (this is not certainty).',
    noEstimate:'The model’s numeric estimate could not be displayed.',
    dangerMsg:'SECURA found signs that require extra caution.',
    unsureMsg:'SECURA recommends caution with this link.',
    unsureDetail:'The link was not confirmed to be safe.',
    safeMsg:'The AI did not detect suspicious patterns in this link.',
    safeDetail:'Important: this does NOT guarantee the link is safe. Do not enter sensitive data if you have doubts.',
    errMsg:'The analysis could not be completed.',
    timeout:'The request took too long. Please try again.',
    detailLabel:'Detail: ',
    errHelp:'To use the AI, open this page at http://127.0.0.1:5000 after running python servidor.py.',
    errNoClass:'Without a complete analysis, SECURA does not classify the link.',
    safetySteps:[
      'Do not enter passwords, codes or bank details on the link.',
      'Go to your institution through its official app or by typing the address you already knew.',
      'If you already shared data, contact the institution through its official channels.'
    ],
    // Review
    count:(n,total)=>n+' of '+total+' signs checked',
    repaso:[
      'Check the signs you already recognize. If any of them is new to you, look at the practical exercise again.',
      'You are getting started. Review the practical exercise to learn the signs you are missing.',
      'You are getting started. Review the practical exercise to learn the signs you are missing.',
      'Good progress! You already recognize several signs. When in doubt, do not open the link and check it first.',
      'Good progress! You already recognize several signs. When in doubt, do not open the link and check it first.',
      'Very good! You know almost all of them. Review the one you are missing.',
      'Congratulations! You recognize all 6 warning signs. Remember: when in doubt, do not click and check the link.'
    ]
  }
};
const t = key => S[lang][key];

// [selector, texto en inglés] — textos fijos nuestros, por eso se usa innerHTML.
// Comunes a todas las páginas (encabezado y pie)
const I18N_COMMON = [
  ['.skip-link','Skip to content'],
  ['header.site a[href$="#verificacion"]','Verification'],
  ['header.site a[href$="#ayuda"]','Help'],
  ['header.site a[href$="#recursos"]','Other resources'],
  ['.back-link','<span aria-hidden="true">←</span> Back to home'],
  ['footer .wrap > p:not(.meta-line)','Research project: social engineering attacks on older adults in the GAM, Costa Rica, 2025-2026.'],
  ['footer .meta-line','Expotec Cybersecurity Project 2026']
];

// Solo para index.html (se aplican si existe #verificacion)
const I18N_INDEX = [
  ['.hero h1','Before you click, <em>check the link.</em>'],
  ['.hero p.lead','Secura is a guide for older adults in the GAM to recognize links from financial institutions that try to steal your information and your money — explained without technical jargon.'],
  ['.cta-row .btn-primary','What is phishing?'],
  ['.cta-row .btn-ghost','Warning signs'],
  ['.fake-msg > div:not(.from)','Your account will be suspended today. Verify your data immediately to avoid being blocked. Go to the following link:'],
  ['.hero-card .callout span:last-child','Urgency, capital letters and a link that does not belong to the real bank: three typical signs of phishing.'],
  ['.btn-card','Check links'],

  ['#verificacion-titulo','Link verification'],
  ['.domain-checker .sub','Artificial intelligence analyzes the link without opening it. Its result is only a guide and does not guarantee safety.'],
  ['label[for="urlToCheck"]','URL you want to check'],
  ['#domainCheckerForm button[type="submit"]','Check link'],
  ['.quick-guide h3','Quick guide: how to copy and paste a link without opening it'],
  ['.guide-step:nth-child(1) h4','Watch the step-by-step video'],
  ['.guide-step:nth-child(1) p','Copy the suspicious link without opening it, paste it into the checker and press “Check link”.'],
  ['#goToChecker','Go to the checker'],
  ['.guide-step:nth-child(2) h4','Example'],
  ['.guide-step:nth-child(2) p','Here you will see an example of how to use the checker.'],
  ['.guide-step:nth-child(2) .media-empty','Space for the example'],

  ['#ayuda h2','What to do if you think you fell for it'],
  ['#ayuda .sub','Opening the link does not mean your information was stolen; the risk increases when you enter data or download files.'],
  ['#ayuda .step:nth-child(1) h3','Change your passwords'],
  ['#ayuda .step:nth-child(1) p','If you entered any password, change it from the official site.'],
  ['#ayuda .step:nth-child(2) h3','Contact your bank'],
  ['#ayuda .step:nth-child(2) p','If you shared bank details, contact the bank immediately through its official number.'],
  ['#ayuda .step:nth-child(3) h3','Check your devices'],
  ['#ayuda .step:nth-child(3) p','If you downloaded a suspicious file, do not open it; uninstall it or ask for help.'],
  ['#ayuda .step:nth-child(4) h3','Ask for help and report it'],
  ['#ayuda .step:nth-child(4) p','Tell someone you trust what happened, keep evidence and report it to <a href="tel:800-8000-645">800-8000-645</a> (OIJ).'],

  ['#recursos h2','Other sites that help you verify links'],
  ['#recursos .sub','These pages let you analyze a link before opening it. Secura aims to explain the same thing in simpler language.'],
  ['#recursos .resource-card:nth-child(1) p','Checks whether a site has been flagged as dangerous.'],
  ['#recursos .resource-card:nth-child(2) p','Analyzes a link or file with multiple security engines.'],
  ['#recursos .resource-card:nth-child(3) p','Community database of sites reported as phishing.'],
  ['#recursos .resource-card a.go','Visit page <span aria-hidden="true">→</span>']
];

// [selector, atributo, texto en inglés]
const I18N_ATTR = [
  ['#urlToCheck','placeholder','https://www.example.com'],
  ['#menuBtn','aria-label','Open menu'],
  ['nav.links','aria-label','Main navigation'],
  ['#mobileNav','aria-label','Mobile navigation'],
  ['.brand','aria-label','Secura, go to top']
];

// ---------- que-es-phishing.html ----------
const I18N_PHISH = [
  ['.page-title','What is phishing?'],
  ['.page-hero .section-head p','It is a <mark>social engineering</mark> technique used by cybercriminals to obtain your personal data. The attack almost always arrives disguised as a message from a trusted entity: your bank, a social network or a government institution, asking you to “verify” something urgently.'],
  ['.hint','Tap the cards to flip them'],
  ['.flip-front .flip-tap','Tap to read ↻'],
  ['.flip-back .flip-tap','Tap to go back ↻'],
  ['.flip-card:nth-child(1) .flip-title','Identity spoofing'],
  ['.flip-card:nth-child(1) .flip-text','Also called <em>spoofing</em>: someone pretends to be a person, company or entity so the deception looks real. It can be a fake social media profile or a web page identical to your bank’s.'],
  ['.flip-card:nth-child(2) .flip-title','Malicious links'],
  ['.flip-card:nth-child(2) .flip-text','Addresses designed to steal your passwords or install spyware. They often hide their real destination with link shorteners or by changing a single letter of the real name.'],
  ['#formas h2','Three ways it can arrive'],
  ['#formas .section-head p','The name changes depending on the medium, but the goal is always the same:<br>Get you to hand over your data'],
  ['.swipe-hint','Swipe sideways to see more →'],
  ['.attack-slide:nth-child(1) .attack-text p','By email. It tries to steal your data through fake links that imitate a known entity.'],
  ['.attack-slide:nth-child(2) .attack-text p','The same, but through messaging: SMS or WhatsApp. It often arrives as a “pending package” or a bank alert.'],
  ['.attack-slide:nth-child(3) .attack-text p','Scams carried out through voice phone calls, where someone pretends to be tech support or bank staff.'],
  ['.zoom-label','<span aria-hidden="true">🔍</span> View larger image'],
  ['.cta-band h2','Did you receive a suspicious link?'],
  ['.cta-band p','Check it before opening it.'],
  ['.cta-band .btn','Check a link'],
  ['#lightboxTitle','Example of a fake email'],
  ['#lightboxClose','<span aria-hidden="true">✕</span> Close image']
];
const I18N_PHISH_ATTR = [
  ['#attackCarousel','aria-label','Three ways phishing can arrive'],
  ['#attackCarousel','aria-roledescription','carousel'],
  ['.attack-slide:nth-child(1)','aria-label','1 of 3: Phishing'],
  ['.attack-slide:nth-child(2)','aria-label','2 of 3: Smishing'],
  ['.attack-slide:nth-child(3)','aria-label','3 of 3: Vishing'],
  ['[data-carousel-prev]','aria-label','Previous'],
  ['[data-carousel-next]','aria-label','Next'],
  ['.carousel-dots','aria-label','Choose one of the three ways'],
  ['.attack-slide:nth-child(1) .zoom-btn','data-lightbox-title','Fake email (phishing)'],
  ['.attack-slide:nth-child(2) .zoom-btn','data-lightbox-title','Fake text message (smishing)'],
  ['.attack-slide:nth-child(3) .zoom-btn','data-lightbox-title','Fake call (vishing)'],
  ['.attack-slide:nth-child(1) img','alt','Example of a fake BCR email with five marked signs: an alarming subject, a strange sender, a message that causes worry, a suspicious link and design errors.'],
  ['.attack-slide:nth-child(2) img','alt','Example of a fake Banco Nacional text message with four marked signs: unknown number, no personalization, an urgent message and a suspicious link.'],
  ['.attack-slide:nth-child(3) img','alt','Example of a fake Banco Popular call with four marked signs: unknown number, asks for codes or passwords, an urgent message and they ask you not to hang up.']
];

// ---------- practica.html ----------
const I18N_PRACTICA = [
  ['.page-title','Warning signs'],
  ['#ejercicio-titulo','Practical exercise'],
  ['.practice-kicker','Practical example'],
  ['.practice-card > p','Many fake links look almost identical to the real ones. Choose an example, press the video and learn.'],
  ['#tab-p1','Changed letter'],
  ['#tab-p2','Shortened link'],
  ['#tab-p3','Urgent email'],
  ['#repaso-titulo','Check the signs you already know'],
  ['#checklist li:nth-child(1) label > span:last-child','The message pressures you with a threat or a short deadline'],
  ['#checklist li:nth-child(2) label > span:last-child','The sender does not exactly match the real entity'],
  ['#checklist li:nth-child(3) label > span:last-child','They ask for your password, card or personal data through a link'],
  ['#checklist li:nth-child(4) label > span:last-child','The link uses a shortener or odd letters in the domain'],
  ['#checklist li:nth-child(5) label > span:last-child','You received the message without expecting it'],
  ['#checklist li:nth-child(6) label > span:last-child','There are spelling mistakes or odd wording'],
  ['.result-link a','Check a link in Verification <span aria-hidden="true">→</span>']
];
const I18N_PRACTICA_ATTR = [
  ['.tabs[role="tablist"]','aria-label','Examples of fake links']
];

// Qué entradas, atributos y metadatos usa cada página
const PAGES = {
  index: {
    entries: I18N_INDEX, attrs: [],
    title: 'Secura — Guide against fraudulent links',
    desc: 'Secura is a guide for older adults in the GAM to recognize fraudulent links from financial institutions.'
  },
  phish: {
    entries: I18N_PHISH, attrs: I18N_PHISH_ATTR,
    title: 'What is phishing? — Secura',
    desc: 'What phishing is, identity spoofing, malicious links and the three ways it can arrive.'
  },
  practica: {
    entries: I18N_PRACTICA, attrs: I18N_PRACTICA_ATTR,
    title: 'Warning signs — Secura',
    desc: 'Practical exercise and quick review to recognize phishing warning signs.'
  }
};
const pageKey = document.getElementById('verificacion') ? 'index'
  : document.getElementById('formas') ? 'phish'
  : document.getElementById('ejercicio') ? 'practica' : null;
const pg = PAGES[pageKey] || {entries: [], attrs: [], title: null, desc: null};

function applyLang(l){
  lang = l;
  document.documentElement.lang = l;

  const entries = I18N_COMMON.concat(pg.entries);

  entries.forEach(([sel, en]) => document.querySelectorAll(sel).forEach(el => {
    if(el.dataset.es === undefined) el.dataset.es = el.innerHTML;
    el.innerHTML = l === 'en' ? en : el.dataset.es;
  }));

  I18N_ATTR.concat(pg.attrs).forEach(([sel, attr, en]) => document.querySelectorAll(sel).forEach(el => {
    const key = 'data-es-' + attr;
    if(!el.hasAttribute(key)) el.setAttribute(key, el.getAttribute(attr) || '');
    el.setAttribute(attr, l === 'en' ? en : el.getAttribute(key));
  }));

  // Título y descripción
  const desc = document.querySelector('meta[name="description"]');
  if(document.documentElement.dataset.esTitle === undefined){
    document.documentElement.dataset.esTitle = document.title;
    if(desc) document.documentElement.dataset.esDesc = desc.content;
  }
  document.title = (l === 'en' && pg.title) ? pg.title : document.documentElement.dataset.esTitle;
  if(desc) desc.content = (l === 'en' && pg.desc) ? pg.desc : document.documentElement.dataset.esDesc;

  // Botón de idioma: muestra el idioma al que cambiarás
  const btn = document.getElementById('langToggle');
  if(btn){
    btn.querySelector('.lang-label').textContent = l === 'en' ? 'ES' : 'EN';
    btn.setAttribute('aria-label', l === 'en' ? 'Cambiar a español' : 'Switch to English');
    btn.setAttribute('lang', l === 'en' ? 'es' : 'en');
  }

  // Textos dinámicos
  const gt = document.getElementById('guideToggle');
  if(gt) gt.textContent = gt.getAttribute('aria-expanded') === 'true' ? t('closeGuide') : t('guide');
  const dr = document.getElementById('domainResult');
  if(dr) dr.hidden = true; // el resultado anterior quedaría en el otro idioma
  applyTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');
  document.dispatchEvent(new CustomEvent('secura:lang'));
}

// ---------- Menú móvil ----------
const menuBtn = document.getElementById('menuBtn');
const mobileNav = document.getElementById('mobileNav');
if(menuBtn && mobileNav){
  menuBtn.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

// ---------- Modo oscuro ----------
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

function applyTheme(theme){
  if(theme === 'dark'){
    root.setAttribute('data-theme', 'dark');
  } else {
    root.removeAttribute('data-theme');
  }
  if(themeToggle){
    themeToggle.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    themeToggle.setAttribute('aria-label', theme === 'dark' ? t('toLight') : t('toDark'));
  }
}

// El script en el <head> ya aplicó el tema guardado (o el del sistema) antes de pintar la página.
// Aquí solo sincronizamos el estado del botón con lo que quedó aplicado.
applyTheme(root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');

if(themeToggle){
  themeToggle.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    const nextTheme = isDark ? 'light' : 'dark';
    applyTheme(nextTheme);
    try{ localStorage.setItem('secura-theme', nextTheme); }catch(e){}
  });
}

// Si el usuario no ha elegido un tema manualmente, seguir la preferencia del sistema en vivo
if(window.matchMedia){
  const mql = window.matchMedia('(prefers-color-scheme: dark)');
  mql.addEventListener('change', (e) => {
    let saved = null;
    try{ saved = localStorage.getItem('secura-theme'); }catch(err){}
    if(!saved){
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
}

// ---------- Botón de idioma ----------
const langToggle = document.getElementById('langToggle');
if(langToggle){
  langToggle.addEventListener('click', () => {
    const next = lang === 'en' ? 'es' : 'en';
    applyLang(next);
    try{ localStorage.setItem('secura-lang', next); }catch(e){}
  });
}

// ---------- Tarjetas que se voltean ----------
document.querySelectorAll('.flip-card').forEach(card => {
  const front = card.querySelector('.flip-front');
  const back = card.querySelector('.flip-back');
  card.addEventListener('click', () => {
    const flipped = card.getAttribute('aria-pressed') === 'true';
    card.setAttribute('aria-pressed', flipped ? 'false' : 'true');
    // Solo la cara visible se anuncia en los lectores de pantalla
    front.setAttribute('aria-hidden', flipped ? 'false' : 'true');
    back.setAttribute('aria-hidden', flipped ? 'true' : 'false');
  });
});

// ---------- Imagen ampliada con botón para cerrar ----------
(function(){
  const box = document.getElementById('lightbox');
  if(!box) return;
  const img = document.getElementById('lightboxImg');
  const closeBtn = document.getElementById('lightboxClose');
  const titleEl = document.getElementById('lightboxTitle');
  document.querySelectorAll('[data-lightbox]').forEach(btn => {
    btn.addEventListener('click', () => {
      const thumb = btn.querySelector('img');
      img.src = btn.dataset.lightbox;
      img.alt = thumb ? thumb.alt : '';
      if(titleEl && btn.dataset.lightboxTitle) titleEl.textContent = btn.dataset.lightboxTitle;
      if(typeof box.showModal === 'function') box.showModal(); else box.setAttribute('open', '');
      box.querySelector('.lightbox-scroll').scrollTo(0, 0);
      closeBtn.focus();
    });
  });
  const close = () => { if(typeof box.close === 'function') box.close(); else box.removeAttribute('open'); };
  closeBtn.addEventListener('click', close);
  // Tocar fuera de la imagen también cierra (en el fondo oscuro)
  box.addEventListener('click', e => { if(e.target === box) close(); });
  // La tecla Esc cierra el cuadro de forma nativa
})();

// ---------- Carrusel deslizable: Phishing / Smishing / Vishing ----------
// Usa scroll-snap del navegador: funciona con el dedo (swipe), el mouse (arrastrar),
// el teclado (← →) y los botones. JS solo sincroniza los puntos y las flechas.
(function(){
  const carousel = document.getElementById('attackCarousel');
  if(!carousel) return;
  const track = carousel.querySelector('.attack-track');
  const slides = Array.from(carousel.querySelectorAll('.attack-slide'));
  const dots = Array.from(carousel.querySelectorAll('.carousel-dot'));
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let current = 0;

  function slideStep(){
    return slides.length > 1 ? slides[1].offsetLeft - slides[0].offsetLeft : track.clientWidth;
  }
  function setCurrent(i){
    current = Math.max(0, Math.min(slides.length - 1, i));
    dots.forEach((dot, n) => {
      dot.classList.toggle('active', n === current);
      if(n === current) dot.setAttribute('aria-current', 'true'); else dot.removeAttribute('aria-current');
    });
  }
  function goTo(i){
    const target = (i + slides.length) % slides.length;
    track.scrollTo({left: target * slideStep(), behavior: reduceMotion ? 'auto' : 'smooth'});
    setCurrent(target);
  }

  let ticking = false;
  track.addEventListener('scroll', () => {
    if(ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      setCurrent(Math.round(track.scrollLeft / slideStep()));
      ticking = false;
    });
  }, {passive: true});

  carousel.querySelector('[data-carousel-prev]').addEventListener('click', () => goTo(current - 1));
  carousel.querySelector('[data-carousel-next]').addEventListener('click', () => goTo(current + 1));
  dots.forEach(dot => dot.addEventListener('click', () => goTo(Number(dot.dataset.carouselSlide))));
  track.addEventListener('keydown', e => {
    if(e.key === 'ArrowLeft'){ e.preventDefault(); goTo(current - 1); }
    if(e.key === 'ArrowRight'){ e.preventDefault(); goTo(current + 1); }
  });

  // Arrastrar con el mouse (en pantallas táctiles el swipe ya es nativo)
  let startX = 0, startScroll = 0, dragging = false, moved = false;
  track.addEventListener('pointerdown', e => {
    if(e.pointerType !== 'mouse' || e.button !== 0) return;
    dragging = true; moved = false; startX = e.clientX; startScroll = track.scrollLeft;
  });
  window.addEventListener('pointermove', e => {
    if(!dragging) return;
    const dx = e.clientX - startX;
    if(!moved && Math.abs(dx) > 6){ moved = true; track.classList.add('dragging'); }
    if(moved) track.scrollLeft = startScroll - dx;
  });
  window.addEventListener('pointerup', () => {
    if(!dragging) return;
    dragging = false;
    if(moved){
      track.classList.remove('dragging');
      goTo(Math.round(track.scrollLeft / slideStep()));
    }
  });
  window.addEventListener('resize', () => track.scrollTo({left: current * slideStep(), behavior: 'auto'}));
})();

// ---------- Guía rápida (4 pasos) ----------
const guideToggle = document.getElementById('guideToggle');
const quickGuide = document.getElementById('quickGuide');
if(guideToggle && quickGuide){
  guideToggle.addEventListener('click', () => {
    const open = guideToggle.getAttribute('aria-expanded') === 'true';
    guideToggle.setAttribute('aria-expanded', open ? 'false' : 'true');
    guideToggle.textContent = open ? t('guide') : t('closeGuide');
    quickGuide.hidden = open;
    if(!open) quickGuide.scrollIntoView({behavior: 'smooth', block: 'nearest'});
  });
}
const goToChecker = document.getElementById('goToChecker');
if(goToChecker){
  goToChecker.addEventListener('click', () => {
    const input = document.getElementById('urlToCheck');
    document.getElementById('verificacion').scrollIntoView({behavior: 'smooth'});
    setTimeout(() => input.focus({preventScroll: true}), 400);
  });
}

// ---------- Verificador de enlaces: SOLO modelo de IA en Python ----------

/* ========== VERIFICADOR CON GEMINI ========== */

const domainCheckerForm = document.getElementById("domainCheckerForm");
const urlToCheck = document.getElementById("urlToCheck");
const domainResult = document.getElementById("domainResult");

function showDomainResult(status, message, details = [], steps = []) {
  domainResult.hidden = false;
  domainResult.className = "domain-result " + status;
  domainResult.replaceChildren();

  const titulo = document.createElement("strong");
  titulo.textContent = message;
  domainResult.appendChild(titulo);

  details.forEach(detail => {
    const p = document.createElement("p");
    p.className = "result-detail";
    p.textContent = detail;
    domainResult.appendChild(p);
  });

  if (steps.length) {
    const tituloPasos = document.createElement("p");
    tituloPasos.textContent = t("whatToDo");

    const lista = document.createElement("ol");

    steps.forEach(step => {
      const li = document.createElement("li");
      li.textContent = step;
      lista.appendChild(li);
    });

    domainResult.append(tituloPasos, lista);
  }
}

if (domainCheckerForm) {
  const boton = domainCheckerForm.querySelector(
    'button[type="submit"]'
  );

  domainCheckerForm.addEventListener("submit", async event => {
    event.preventDefault();

    let enlace = urlToCheck.value.trim();

    try {
      if (!/^https?:\/\//i.test(enlace)) {
        enlace = "https://" + enlace;
      }

      const url = new URL(enlace);

      if (
        !["http:", "https:"].includes(url.protocol) ||
        !url.hostname.includes(".") ||
        url.username ||
        url.password ||
        enlace.length > 2048 ||
        /\s/.test(enlace)
      ) {
        throw new Error("Enlace inválido");
      }

      enlace = url.href;
    } catch (error) {
      showDomainResult("warning", t("invalidMsg"), [
        t("invalidDetail")
      ]);
      return;
    }

    boton.disabled = true;

    showDomainResult("loading", t("loadingMsg"), [
      t("loadingDetail")
    ]);

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 30000);

      let respuesta;

      try {
        respuesta = await fetch("/api/analizar", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ enlace }),
          signal: controller.signal
        });
      } finally {
        clearTimeout(timeout);
      }

      const datos = await respuesta.json();
      
      if (!respuesta.ok) {
        throw new Error(datos.error || t("serverFail"));
      }

      const niveles = ["alto", "medio", "indeterminado", "bajo"];

      if (
        !niveles.includes(datos.riesgo) ||
        typeof datos.explicacion !== "string"
      ) {
        throw new Error(t("serverBad"));
      }

      const explicacion = [datos.explicacion];

      if (datos.riesgo === "bajo") {
  showDomainResult(
    "safe",
    lang === "en"
  ? "Recognized domain"
  : "Dominio reconocido",
    [datos.explicacion]
  );
} else if (datos.riesgo === "alto") {
        showDomainResult(
          "danger",
          t("dangerMsg"),
          explicacion,
          t("safetySteps")
        );
      } else if (datos.riesgo === "medio") {
        showDomainResult(
          "warning",
          t("unsureMsg"),
          explicacion,
          t("safetySteps")
        );
      } else {
        showDomainResult(
          "warning",
          t("unsureMsg"),
          [...explicacion, t("unsureDetail")],
          t("safetySteps")
        );
      }

    } catch (error) {
      showDomainResult("warning", t("errMsg"), [
        error.name === "AbortError"
          ? t("timeout")
          : t("detailLabel") + error.message,
        t("errNoClass")
      ]);
    } finally {
      boton.disabled = false;
    }
  });
}

// ---------- Pestañas del ejercicio práctico (practica.html) ----------
(function(){
  const tablist = document.querySelector('.tabs[role="tablist"]');
  if(!tablist) return;
  const tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));
  function select(tab, focus){
    tabs.forEach(t => {
      const on = t === tab;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
      // Al cambiar de pestaña se pausa el video de la anterior
      if(!on){ const v = document.getElementById(t.getAttribute('aria-controls')).querySelector('video'); if(v) v.pause(); }
    });
    if(focus) tab.focus();
  }
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => select(tab, false));
    tab.addEventListener('keydown', e => {
      let n = null;
      if(e.key === 'ArrowRight') n = (i + 1) % tabs.length;
      if(e.key === 'ArrowLeft') n = (i - 1 + tabs.length) % tabs.length;
      if(e.key === 'Home') n = 0;
      if(e.key === 'End') n = tabs.length - 1;
      if(n !== null){ e.preventDefault(); select(tabs[n], true); }
    });
  });
})();

// ---------- Repaso: "Marca las señales que ya conozcas" ----------
(function(){
  const list = document.getElementById('checklist');
  if(!list) return;
  const boxes = Array.from(list.querySelectorAll('input[type="checkbox"]'));
  const count = document.getElementById('resultCount');
  const msg = document.getElementById('resultMsg');
  const box = document.getElementById('resultBox');
  // ✏️ Los mensajes se editan en S.es.repaso y S.en.repaso (arriba del archivo)
  function update(){
    const n = boxes.filter(b => b.checked).length;
    count.textContent = S[lang].count(n, boxes.length);
    msg.textContent = S[lang].repaso[n];
    box.classList.toggle('done', n === boxes.length);
  }
  document.addEventListener('secura:lang', update);
  boxes.forEach(b => b.addEventListener('change', update));
  update();
})();

// ---------- Aplicar el idioma guardado al cargar (siempre al final) ----------
if(lang === 'en') applyLang('en');



