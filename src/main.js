/**
 * @typedef {object} BrandLogoOptions
 * @property {string} [brandName]
 * @property {'header' | 'footer' | 'icon'} [variant]
 * @property {string} [className]
 * @property {boolean} [priority]
 * @property {'light' | 'dark'} [theme]
 */

/** @param {BrandLogoOptions} options */
function GeosangBrandLogo({ brandName, variant = 'header', className = '', priority = false, theme = 'light' }) {
  /** @type {Record<string, string>} */
  const entities = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  const safeBrandName = String(brandName || '거상').replace(/[&<>"']/g, (character) => entities[character] || character);
  const priorityAttributes = priority ? 'loading="eager" fetchpriority="high"' : 'loading="eager"';
  return `<span class="brand-logo__inner brand-logo__inner--${variant} brand-logo__inner--${theme} ${className}"><img class="brand-logo__symbol" src="/assets/images/brand/geosang-brand-symbol.png" alt="${safeBrandName} 로고" width="1154" height="1190" ${priorityAttributes} decoding="async"><span class="brand-logo__name">${safeBrandName}</span></span>`;
}

document.querySelectorAll('[data-brand-logo]').forEach((element) => {
  const logoElement = /** @type {HTMLElement} */ (element);
  element.innerHTML = GeosangBrandLogo({
    brandName: logoElement.dataset.brandName,
    variant: /** @type {'header' | 'footer' | 'icon' | undefined} */ (logoElement.dataset.variant),
    className: logoElement.dataset.className || '',
    priority: logoElement.dataset.priority === 'true',
    theme: /** @type {'light' | 'dark' | undefined} */ (logoElement.dataset.theme)
  });
});

window.GeosangBrandLogo = GeosangBrandLogo;

/** @param {HTMLImageElement} image */
function applyImageFallback(image) {
  if (image.dataset.fallbackApplied === 'true') return;
  image.dataset.fallbackApplied = 'true';

  const visualContainer = image.closest('.photo, .card-image, .global-card');
  if (visualContainer) {
    visualContainer.classList.add('image-fallback');
    /** @type {HTMLElement} */ (visualContainer).dataset.fallbackLabel = image.alt || '이미지를 준비하고 있습니다';
  }

  image.hidden = true;
}

document.querySelectorAll('img').forEach((element) => {
  const image = /** @type {HTMLImageElement} */ (element);
  image.addEventListener('error', () => applyImageFallback(image), { once: true });
  if (image.complete && image.naturalWidth === 0) applyImageFallback(image);
});

const menuButton = /** @type {HTMLButtonElement | null} */ (document.querySelector('.menu-toggle'));
const nav = /** @type {HTMLElement | null} */ (document.querySelector('.nav-links'));

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
  });
}

if (nav) {
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  }));
}

const notifyForm = /** @type {HTMLFormElement | null} */ (document.querySelector('.notify-form'));
notifyForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const currentForm = /** @type {HTMLFormElement} */ (event.currentTarget);
  const input = currentForm.querySelector('input');
  const status = document.querySelector('.form-status');
  if (!input || !status) return;
  status.textContent = `${input.value} 주소로 알림 신청이 접수되었습니다.`;
  currentForm.reset();
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
