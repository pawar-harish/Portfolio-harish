/* ============================================================
   PORTFOLIO.JS — Harish Pawar | Angular Developer
   Smooth scroll, typed text, dynamic JSON rendering, form, back-to-top
   ============================================================ */

'use strict';

/* ---- DOM Ready ---- */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHamburger();
  initTypedText();
  initBackToTop();
  initActiveNavLinks();
  initContactForm();
  initSmoothScroll();
  
  // Load dynamic data and then initialize scroll reveal
  loadPortfolioData();
});

/* ============================================================
   JSON DATA LOADING & RENDERING
============================================================ */
async function loadPortfolioData() {
  try {
    const response = await fetch('assets/data/portfolio.json');
    if (!response.ok) throw new Error('Data fetch failed');
    const data = await response.json();
    
    renderSkills(data.skills);
    renderExperience(data.experience);
    renderProjects(data.projects);
    
    // Give the DOM a tiny moment to paint before observing
    setTimeout(() => {
      initScrollReveal();
    }, 100);
    
  } catch (error) {
    console.error('Error loading portfolio data:', error);
    // If running from file:// without a server, fetch will fail due to CORS.
    // In production (GitHub pages/hosting), it will work perfectly.
  }
}

function renderSkills(skills) {
  const container = document.getElementById('skills-container');
  if (!container) return;
  
  const renderCards = (filter) => {
    container.innerHTML = '';
    const filtered = filter === 'all' ? skills : skills.filter(s => s.category === filter);
    
    filtered.forEach((skill, index) => {
      const delay = (index % 10) * 0.05; // Staggered animation
      const iconHtml = skill.faClass 
        ? `<i class="${skill.faClass}"></i>` 
        : `<img src="${skill.icon}" alt="${skill.name}" onerror="this.outerHTML='<i class=\\'fas fa-code\\'></i>'">`;
        
      const html = `
        <div class="skill-box" style="animation-delay: ${delay}s">
          <div class="skill-box-icon">
            ${iconHtml}
          </div>
          <span class="skill-box-name">${skill.name}</span>
        </div>
      `;
      container.insertAdjacentHTML('beforeend', html);
    });
  };
  
  renderCards('all'); // Initial load
  
  // Tabs filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      const filter = e.target.getAttribute('data-filter');
      renderCards(filter);
    });
  });
}

function renderExperience(experience) {
  const container = document.getElementById('experience-container');
  if (!container || !experience) return;
  
  let html = '';
  experience.forEach(exp => {
    const defaultIcon = 'fas fa-briefcase';
    const iconHtml = `<i class="${defaultIcon}" style="color:var(--primary); font-size: 1.2rem;"></i>`;
    const techTags = exp.technologies.map(t => `<span>${t}</span>`).join('');
    const endDate = exp.endDate ? exp.endDate : 'Present';
    
    html += `
      <div class="exp-item reveal-left">
        <div class="exp-icon">
           <img src="${exp.icon}" alt="${exp.company} icon" onerror="this.outerHTML='${iconHtml}'">
        </div>
        <div class="exp-content">
          <div class="exp-header">
            <div>
              <h3 class="exp-title">${exp.position}</h3>
              <div class="exp-company">${exp.company} • ${exp.location}</div>
            </div>
            <div class="exp-date">${exp.startDate} – ${endDate}</div>
          </div>
          <p class="exp-desc">${exp.description}</p>
          <div class="exp-tech">
            ${techTags}
          </div>
        </div>
      </div>
    `;
  });
  
  container.innerHTML = html;
}

function renderProjects(projects) {
  const container = document.getElementById('projects-container');
  if (!container || !projects) return;
  
  // Filter out hidden (commented-out) projects
  const visibleProjects = projects.filter(p => !p.hidden);

  let html = '';
  visibleProjects.forEach((proj, index) => {
    const isFeatured = proj.status === 'running' ? 'project-card--featured' : '';
    const badgeHtml = proj.status === 'running' ? '<div class="project-featured-badge">Active</div>' : '';
    
    const techTags = proj.technologies.slice(0, 4).map(t => `<span class="p-tag">${t}</span>`).join('');
    
    let catIcon = 'fas fa-desktop';
    let catText = 'Web App';
    if (proj.category.includes('mobile')) {
      catIcon = 'fas fa-mobile-alt';
      catText = 'Mobile App';
    }
    if (proj.category.includes('web') && proj.category.includes('mobile')) {
      catIcon = 'fas fa-laptop-code';
      catText = 'Cross-Platform';
    }
    
    const iClass = proj.faClass || 'fas fa-code';
    
    let linksHtml = '';
    if (proj.playStoreUrl) {
      linksHtml += `<a href="${proj.playStoreUrl}" target="_blank" rel="noopener" class="project-link" aria-label="Play Store"><i class="fab fa-google-play"></i></a>`;
    }
    if (proj.adminUrl || proj.userUrl) {
      linksHtml += `<a href="${proj.adminUrl || proj.userUrl}" target="_blank" rel="noopener" class="project-link" aria-label="Website"><i class="fas fa-external-link-alt"></i></a>`;
    }
    
    const mainActionUrl = proj.playStoreUrl || proj.adminUrl || proj.userUrl || '#';
    
    html += `
        <article class="project-card reveal ${isFeatured}">
          ${badgeHtml}
          <div class="project-header">
            <div class="project-icon-wrap">
              <i class="${iClass} project-icon"></i>
            </div>
            <div class="project-links">
              ${linksHtml}
            </div>
          </div>
          <div class="project-body">
            <h3 class="project-title">${proj.title}</h3>
            <p class="project-description">${proj.description}</p>
            <div class="project-tech-tags">
              ${techTags}
            </div>
          </div>
          <div class="project-footer">
            <span class="project-category"><i class="${catIcon}"></i> ${catText}</span>
            <a href="${mainActionUrl}" target="_blank" rel="noopener" class="project-cta">
              View Work <i class="fas fa-arrow-right"></i>
            </a>
          </div>
        </article>
    `;
  });
  
  container.innerHTML = html;
}

/* ============================================================
   NAVBAR — Adds scrolled class on scroll
============================================================ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* ============================================================
   HAMBURGER — Mobile menu toggle
============================================================ */
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    }
  });
}

/* ============================================================
   TYPED TEXT — Hero role cycling animation
============================================================ */
function initTypedText() {
  const el = document.getElementById('typed-text');
  if (!el) return;

  const phrases = [
    'Angular Apps',
    'Web Interfaces',
    'SPA Solutions',
    'Clean UI/UX',
    'TypeScript Code',
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;

  function type() {
    const current = phrases[phraseIdx];
    const visible = current.substring(0, charIdx);
    el.textContent = visible;

    let delay = isDeleting ? 60 : 110;

    if (!isDeleting && charIdx === current.length) {
      delay = 1800; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      delay = 400;
    }

    if (isDeleting) charIdx--;
    else charIdx++;

    setTimeout(type, delay);
  }

  setTimeout(type, 800);
}

/* ============================================================
   SCROLL REVEAL — Intersection Observer for animations
============================================================ */
function initScrollReveal() {
  const selectors = [
    { sel: '.info-card', cls: 'reveal' },
    { sel: '.about-text', cls: 'reveal-left' },
    { sel: '.about-info-cards', cls: 'reveal-right' },
    { sel: '.contact-info', cls: 'reveal-left' },
    { sel: '.contact-form-wrapper', cls: 'reveal-right' },
    { sel: '.section-header', cls: 'reveal' }
  ];

  selectors.forEach(({ sel, cls }) => {
    document.querySelectorAll(sel).forEach((el, i) => {
      if (!el.classList.contains(cls)) {
        el.classList.add(cls);
        el.style.transitionDelay = `${(i % 5) * 0.08}s`;
      }
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px',
  });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    observer.observe(el);
  });
}

/* ============================================================
   BACK TO TOP — Show/hide and scroll
============================================================ */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================================
   ACTIVE NAV LINKS — Highlight current section in nav
============================================================ */
function initActiveNavLinks() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function onScroll() {
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ============================================================
   SMOOTH SCROLL — Override for all anchor links
============================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 70;
        const top = target.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

/* ============================================================
   CONTACT FORM — Validation & submission simulation
============================================================ */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const fields = [
    { id: 'name', errorId: 'name-error', validate: v => v.trim().length >= 2, msg: 'Please enter your full name.' },
    { id: 'email', errorId: 'email-error', validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), msg: 'Please enter a valid email address.' },
    { id: 'subject', errorId: 'subject-error', validate: v => v.trim().length >= 3, msg: 'Please enter a subject.' },
    { id: 'message', errorId: 'message-error', validate: v => v.trim().length >= 10, msg: 'Your message must be at least 10 characters.' },
  ];

  fields.forEach(({ id, errorId, validate, msg }) => {
    const el = document.getElementById(id);
    const errEl = document.getElementById(errorId);
    if (!el || !errEl) return;

    el.addEventListener('blur', () => {
      if (!validate(el.value)) {
        el.classList.add('invalid');
        errEl.textContent = msg;
      } else {
        el.classList.remove('invalid');
        errEl.textContent = '';
      }
    });

    el.addEventListener('input', () => {
      if (el.classList.contains('invalid') && validate(el.value)) {
        el.classList.remove('invalid');
        errEl.textContent = '';
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    fields.forEach(({ id, errorId, validate, msg }) => {
      const el = document.getElementById(id);
      const errEl = document.getElementById(errorId);
      if (!el || !errEl) return;

      if (!validate(el.value)) {
        el.classList.add('invalid');
        errEl.textContent = msg;
        valid = false;
      } else {
        el.classList.remove('invalid');
        errEl.textContent = '';
      }
    });

    if (!valid) return;

    const btn = document.getElementById('submit-btn');
    const btnText = btn.querySelector('.btn-text');
    const btnLoading = btn.querySelector('.btn-loading');
    const successEl = document.getElementById('form-success');

    btn.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'flex';

    setTimeout(() => {
      btnLoading.style.display = 'none';
      btn.disabled = false;
      btnText.style.display = 'flex';
      successEl.style.display = 'flex';
      form.reset();

      setTimeout(() => {
        successEl.style.display = 'none';
      }, 5000);
    }, 1800);
  });
}