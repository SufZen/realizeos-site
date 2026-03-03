/**
 * RealizeOS Landing Page — Interactivity
 * Includes: nav, FAQ, scroll animations, exit-intent popup,
 * GitHub stars, email forms, mobile CTA, analytics events
 */

// --- Mobile Nav Toggle ---
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// --- FAQ Accordion ---
document.querySelectorAll('.faq__question').forEach(button => {
  button.addEventListener('click', () => {
    const answer = button.nextElementSibling;
    const isOpen = button.getAttribute('aria-expanded') === 'true';

    document.querySelectorAll('.faq__question').forEach(q => {
      q.setAttribute('aria-expanded', 'false');
      q.nextElementSibling.classList.remove('open');
    });

    if (!isOpen) {
      button.setAttribute('aria-expanded', 'true');
      answer.classList.add('open');
    }
  });
});

// --- Smooth Scroll ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navHeight = document.querySelector('.nav').offsetHeight;
      const targetPos = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    }
  });
});

// --- Nav Border on Scroll ---
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.style.borderBottomColor = window.scrollY > 50
    ? 'rgba(255,255,255,0.1)'
    : 'rgba(255,255,255,0.05)';
}, { passive: true });

// --- Scroll Animations (Intersection Observer) with stagger ---
const animatedElements = document.querySelectorAll('.animate-on-scroll');
if (animatedElements.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    // Group visible entries by their parent section for proper staggering
    const visibleEntries = entries.filter(e => e.isIntersecting);
    visibleEntries.forEach((entry, index) => {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 100);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  animatedElements.forEach((el, i) => {
    // Set stagger index for CSS transition-delay
    el.style.setProperty('--stagger', i % 6);
    observer.observe(el);
  });
}

// --- Animated Number Counters (Hero Stats) ---
function animateCounter(el, target, suffix = '') {
  const duration = 1500;
  const start = performance.now();
  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(eased * target);
    el.textContent = current.toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const heroStats = document.querySelectorAll('.hero__stat strong');
if (heroStats.length > 0) {
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent.trim();
        // Parse number and suffix (e.g. "8,800+" -> 8800, "+")
        const match = text.match(/^([\d,]+)(\+?)$/);
        if (match) {
          const num = parseInt(match[1].replace(/,/g, ''), 10);
          const suffix = match[2] || '';
          animateCounter(el, num, suffix);
        }
        statsObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  heroStats.forEach(stat => statsObserver.observe(stat));
}

// --- Dynamic GitHub Stars ---
(async function fetchGitHubStars() {
  try {
    const resp = await fetch('https://api.github.com/repos/SufZen/realize-os');
    if (resp.ok) {
      const data = await resp.json();
      const stars = data.stargazers_count || 0;
      const el = document.getElementById('github-stars');
      if (el && stars > 0) {
        el.innerHTML = '<strong>' + stars + '</strong> GitHub stars';
      }
    }
  } catch (e) {
    // Silently fail — keep the placeholder
  }
})();

// --- Exit-Intent Popup ---
let exitPopupShown = false;

function showExitPopup() {
  if (exitPopupShown) return;
  if (sessionStorage.getItem('exitPopupDismissed')) return;
  exitPopupShown = true;
  const popup = document.getElementById('exit-popup');
  if (popup) {
    popup.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

function hideExitPopup() {
  const popup = document.getElementById('exit-popup');
  if (popup) {
    popup.style.display = 'none';
    document.body.style.overflow = '';
    sessionStorage.setItem('exitPopupDismissed', 'true');
  }
}

// Trigger on mouse leaving viewport (desktop)
document.addEventListener('mouseout', (e) => {
  if (e.clientY <= 0 && !exitPopupShown) {
    showExitPopup();
  }
});

// Close popup
const popupClose = document.getElementById('popup-close');
if (popupClose) {
  popupClose.addEventListener('click', hideExitPopup);
}

// Close on overlay click
const exitOverlay = document.getElementById('exit-popup');
if (exitOverlay) {
  exitOverlay.addEventListener('click', (e) => {
    if (e.target === exitOverlay) hideExitPopup();
  });
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') hideExitPopup();
});

// --- Email Capture Forms (Main + Popup) ---
const WEBHOOK_URL = 'https://n8n.realization.co.il/webhook/lead-capture';

function handleEmailForm(form, successEl, errorEl) {
  if (!form) return;
  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const btn = this.querySelector('button[type="submit"]');
    const emailInput = this.querySelector('input[type="email"]');
    const nameInput = this.querySelector('input[name="name"]');
    const challengeInput = this.querySelector('input[name="challenge"]');
    const email = emailInput ? emailInput.value.trim() : '';
    const name = nameInput ? nameInput.value.trim() : '';
    const challenge = challengeInput ? challengeInput.value.trim() : '';

    if (!email) return;

    btn.disabled = true;
    btn.textContent = 'Sending...';

    try {
      const resp = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name || 'Anonymous', email, challenge, source: form.id, timestamp: new Date().toISOString() }),
      });

      if (resp.ok || resp.status === 0) {
        // Success
        form.style.display = 'none';
        if (successEl) successEl.style.display = 'block';
        trackEvent('email_capture', { source: form.id });
      } else {
        throw new Error('Request failed');
      }
    } catch (err) {
      btn.disabled = false;
      btn.textContent = 'Get the Free Guide';
      if (errorEl) errorEl.style.display = 'block';
    }
  });
}

// Initialize both forms
handleEmailForm(
  document.getElementById('email-form'),
  document.getElementById('form-success'),
  document.getElementById('form-error')
);
handleEmailForm(
  document.getElementById('popup-form'),
  document.getElementById('popup-success'),
  null
);

// --- Mobile Sticky CTA ---
const mobileCta = document.getElementById('mobile-cta');
if (mobileCta && window.innerWidth <= 768) {
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    // Hide when scrolling up near the top
    if (currentScroll < 400) {
      mobileCta.style.transform = 'translateY(100%)';
    } else {
      mobileCta.style.transform = 'translateY(0)';
    }
    lastScroll = currentScroll;
  }, { passive: true });

  // Initially hidden
  mobileCta.style.transform = 'translateY(100%)';
  mobileCta.style.transition = 'transform 0.3s ease';
}

// --- Analytics Event Tracking ---
function trackEvent(eventName, params) {
  if (typeof gtag === 'function') {
    gtag('event', eventName, params || {});
  }
}

// Track CTA clicks
document.querySelectorAll('[data-track]').forEach(el => {
  el.addEventListener('click', () => {
    trackEvent('cta_click', { cta_name: el.getAttribute('data-track') });
  });
});

// Track FAQ opens
document.querySelectorAll('.faq__question').forEach(btn => {
  btn.addEventListener('click', () => {
    trackEvent('faq_open', { question: btn.textContent.trim().substring(0, 50) });
  });
});

// --- Code Block Copy Buttons (shared across pages) ---
document.querySelectorAll('.code-block__copy, [data-copy]').forEach(btn => {
  btn.addEventListener('click', async () => {
    const block = btn.closest('.code-block') || btn.closest('.ty__code-block');
    if (!block) return;
    const code = block.querySelector('code');
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code.textContent);
    } catch (e) {
      const ta = document.createElement('textarea');
      ta.value = code.textContent;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    btn.textContent = 'Copied!';
    setTimeout(() => { btn.textContent = 'Copy'; }, 2000);
  });
});
