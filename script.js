// === Smooth Scroll + Active Link ===
const navLinks = document.querySelectorAll('.navigation-links a');
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const hash = link.getAttribute('href');
    if (hash.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(hash);
      if (!target) return;
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, '', hash);
      closeMobileNav();
    }
  });
});

// Aktiv-Link beim Scrollen
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  const scrollY = window.pageYOffset;
  sections.forEach(sec => {
    const top = sec.offsetTop - 100;
    const height = sec.offsetHeight;
    if (scrollY >= top && scrollY < top + height) current = sec.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});

// === Mobile Burger ===
const burger = document.querySelector('.burger');
const navList = document.getElementById('nav-links');
function closeMobileNav() {
  navList.classList.remove('open');
  burger.setAttribute('aria-expanded', 'false');
  burger.classList.remove('open');
}
if (burger) {
  burger.addEventListener('click', () => {
    const open = navList.classList.toggle('open');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
  });
}

// Burger Anim (optional)
if (burger) {
  burger.addEventListener('click', () => {
    const spans = burger.querySelectorAll('span');
    spans[0].style.transform = burger.classList.contains('open') ? 'translateY(7px) rotate(45deg)' : '';
    spans[1].style.opacity = burger.classList.contains('open') ? '0' : '1';
    spans[2].style.transform = burger.classList.contains('open') ? 'translateY(-7px) rotate(-45deg)' : '';
  });
}

// === Dark Mode Toggle (mit Speicherung) ===
const themeToggle = document.getElementById('theme-toggle');
const userPref = localStorage.getItem('theme');
if (userPref) document.documentElement.classList.toggle('dark', userPref === 'dark');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

// === Reveal Animation per IntersectionObserver ===
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// === Modal für Projekte ===
const modal = document.getElementById('project-modal');
const modalImg = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalLink = document.getElementById('modal-link');

const PROJECT_DATA = {
  landing: {
    title: 'HTML Landing Page',
    desc: 'One-Pager mit Hero, Features und Call-to-Action.',
    img: 'https://picsum.photos/800/450?random=1',
    url: '#'
  },
  personal: {
    title: 'Personal Page CSS',
    desc: 'Responsive Profilseite mit Grid/Flexbox.',
    img: 'https://picsum.photos/800/450?random=2',
    url: '#'
  },
  portfolio: {
    title: 'HTML Portfolio',
    desc: 'Diese Portfolio Seite als Basis & Playground.',
    img: 'https://picsum.photos/800/450?random=3',
    url: '#'
  }
};

function openModal(key) {
  const data = PROJECT_DATA[key];
  if (!data) return;
  modalImg.src = data.img;
  modalImg.alt = data.title;
  modalTitle.textContent = data.title;
  modalDesc.textContent = data.desc;
  modalLink.href = data.url;
  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.querySelectorAll('.open-modal').forEach(btn => {
  btn.addEventListener('click', () => openModal(btn.dataset.project));
});
modal?.addEventListener('click', (e) => {
  if (e.target.hasAttribute('data-close')) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal?.classList.contains('show')) closeModal();
});

// === Accordion ===
document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', () => {
    const item = header.parentElement;
    const panel = item.querySelector('.accordion-panel');
    const expanded = header.getAttribute('aria-expanded') === 'true';
    header.setAttribute('aria-expanded', String(!expanded));

    // schließen/öffnen mit max-height Trick
    if (!expanded) {
      panel.classList.add('open');
      panel.style.maxHeight = panel.scrollHeight + 'px';
    } else {
      panel.style.maxHeight = '0';
      panel.addEventListener('transitionend', () => panel.classList.remove('open'), { once: true });
    }
  });
});

// === Back to Top ===
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  const show = window.scrollY > 400;
  backToTop.classList.toggle('show', show);
});
backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
