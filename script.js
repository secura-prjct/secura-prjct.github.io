// Tabs for the link inspector
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
    themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
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

// ---------- Pestañas del inspector de enlaces ----------
const tabs = document.querySelectorAll('.tab-btn');
const panels = document.querySelectorAll('.inspect-panel');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.setAttribute('aria-selected', 'false'));
    tab.setAttribute('aria-selected', 'true');
    panels.forEach(p => p.classList.remove('active'));
    document.getElementById(tab.dataset.panel).classList.add('active');
  });
});

// ---------- Carrusel de tipos de ataque ----------
const attackCarousel = document.getElementById('attackCarousel');
if(attackCarousel){
  const attackTrack = attackCarousel.querySelector('.attack-track');
  const attackSlides = attackCarousel.querySelectorAll('.attack-slide');
  const attackDots = attackCarousel.querySelectorAll('.carousel-dot');
  let currentAttack = 0;

  function showAttack(index){
    currentAttack = (index + attackSlides.length) % attackSlides.length;
    attackTrack.style.transform = 'translateX(-' + (currentAttack * 100) + '%)';
    attackSlides.forEach((slide, slideIndex) => {
      slide.setAttribute('aria-hidden', slideIndex === currentAttack ? 'false' : 'true');
    });
    attackDots.forEach((dot, dotIndex) => {
      const selected = dotIndex === currentAttack;
      dot.classList.toggle('active', selected);
      dot.setAttribute('aria-selected', selected ? 'true' : 'false');
    });
  }

  attackCarousel.querySelector('[data-carousel-prev]').addEventListener('click', () => showAttack(currentAttack - 1));
  attackCarousel.querySelector('[data-carousel-next]').addEventListener('click', () => showAttack(currentAttack + 1));
  attackDots.forEach(dot => {
    dot.addEventListener('click', () => showAttack(Number(dot.dataset.carouselSlide)));
  });
  attackCarousel.addEventListener('keydown', event => {
    if(event.key === 'ArrowLeft') showAttack(currentAttack - 1);
    if(event.key === 'ArrowRight') showAttack(currentAttack + 1);
  });
}

// Reveal difference buttons
document.querySelectorAll('.reveal-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const chip = document.getElementById(btn.dataset.target);
    const list = document.getElementById(btn.dataset.list);
    chip.classList.toggle('revealed');
    list.classList.toggle('show');
    btn.textContent = chip.classList.contains('revealed') ? 'Ocultar diferencia' : 'Revelar diferencia';
  });
});

// Checklist progress
const checkboxes = document.querySelectorAll('#checklist input[type="checkbox"]');
const progressLine = document.getElementById('progress-line');
function updateProgress(){
  let count = 0;
  checkboxes.forEach(cb => {
    const li = cb.closest('li');
    if(cb.checked){ li.classList.add('checked'); count++; }
    else{ li.classList.remove('checked'); }
  });
  progressLine.textContent = count + ' de ' + checkboxes.length + ' señales marcadas';
}
checkboxes.forEach(cb => cb.addEventListener('change', updateProgress));
updateProgress(); 

// ---------- Verificador de dominios oficiales ----------
const domainCheckerForm = document.getElementById('domainCheckerForm');
const urlToCheck = document.getElementById('urlToCheck');
const domainResult = document.getElementById('domainResult');

function normalizeHostname(hostname){
  return hostname.toLowerCase().replace(/^www\./, '').replace(/\.$/, '');
}

function showDomainResult(isDangerous, message, steps = []){
  domainResult.hidden = false;
  domainResult.className = 'domain-result ' + (isDangerous ? 'danger' : 'safe');
  domainResult.innerHTML = '<strong>' + message + '</strong>';
  if(steps.length){
    domainResult.innerHTML += '<p>Qué hacer:</p><ol>' + steps.map(step => '<li>' + step + '</li>').join('') + '</ol>';
  }
}

const fallbackDomainList = 
`BCR:https://www.bancobcr.com/
BN:https://www.bncr.fi.cr/
BP:https://www.bancopopular.fi.cr/
BANHVI:https://www.banhvi.fi.cr/
BAC:https://www.baccredomatic.com/
BCT:https://www.bancobct.com/
Cathay:https://www.bancocathay.com/
Banco CMB:https://www.citigroup.com/
Davivienda:https://davivienda.cr
Banco General:https://www.bgeneral.fi.cr/
Banco Improsa:https://www.grupoimprosa.com/
Banco Lafise:https://www.lafise.com/
Banco Promerica:https://www.promerica.fi.cr/
Scotiabank (DAVIbank):https://www.davibank.cr/
Coopenae:https://www.coopenae.fi.cr/
Coopealianza:https://coopealianza.fi.cr/
Coopeande:https://coopeande1.com/
Coocique:https://coocique.fi.cr/
Grupo Mutual:https://www.grupomutual.fi.cr/
Mucap:https://www.mucap.fi.cr/`;

function parseDomainList(text){
  return text.split(/\r?\n/).reduce((domains, line) => {
    const separator = line.indexOf(':');
    if(separator === -1) return domains;
    const owner = line.slice(0, separator).trim();
    const listedUrl = line.slice(separator + 1).trim();
    try{
      const listedHostname = normalizeHostname(new URL(listedUrl).hostname);
      domains.push({owner, hostname: listedHostname});
    }catch(error){}
    return domains;
  }, []);
}

async function loadOfficialDomains(){
  try{
    const listUrl = new URL('websitedomains.txt', document.baseURI).href;
    const response = await fetch(listUrl, {cache: 'no-store'});
    if(!response.ok) throw new Error('No se pudo cargar la lista de dominios.');
    const domains = parseDomainList(await response.text());
    if(!domains.length) throw new Error('La lista de dominios está vacía.');
    return domains;
  }catch(error){
    return parseDomainList(fallbackDomainList);
  }
}

if(domainCheckerForm){
  domainCheckerForm.addEventListener('submit', async event => {
    event.preventDefault();
    let parsedUrl;
    try{
      parsedUrl = new URL(urlToCheck.value.trim());
      if(!['http:', 'https:'].includes(parsedUrl.protocol)) throw new Error();
    }catch(error){
      showDomainResult(true, 'La URL no tiene un formato válido y podría ser peligrosa.', [
        'No abras el enlace.',
        'Elimina el mensaje o correo que lo contiene.',
        'Consulta al banco usando su aplicación oficial o un número confiable.'
      ]);
      return;
    }

    try{
      const officialDomains = await loadOfficialDomains();
      const hostname = normalizeHostname(parsedUrl.hostname);
      const match = officialDomains.find(domain => hostname === domain.hostname || hostname.endsWith('.' + domain.hostname));
      if(match){
        showDomainResult(false, 'Este enlace parece real: pertenece a ' + match.owner + ' (' + match.hostname + ').');
      }else{
        showDomainResult(true, 'Este enlace no aparece en la lista oficial y podría ser peligroso.', [
          'No introduzcas contraseñas, códigos ni datos bancarios.',
          'Cierra la página y no descargues archivos.',
          'Entra al banco escribiendo su dirección oficial o usando su aplicación.',
          'Si compartiste información, contacta al banco y cambia tus contraseñas.'
        ]);
      }
    }catch(error){
      showDomainResult(true, 'No se pudo consultar la lista oficial. No abras el enlace hasta verificarlo por otro medio.', [
        'Consulta directamente el sitio web o la aplicación oficial de tu banco.',
        'No compartas información mientras no confirmes el dominio.'
      ]);
    }
  });
}