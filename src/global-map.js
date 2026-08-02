import { defaultGlobalCityId, globalRegionLabels, globalStatusLabels, globalTourCities } from './data/global-tour-cities.js';

const root = /** @type {HTMLElement | null} */ (document.querySelector('[data-global-hub]'));

if (root) {
  const markerLayer = /** @type {HTMLElement | null} */ (root.querySelector('[data-global-markers]'));
  const panel = /** @type {HTMLElement | null} */ (root.querySelector('[data-global-panel]'));
  const grid = /** @type {HTMLElement | null} */ (root.querySelector('[data-global-city-grid]'));
  const filters = /** @type {HTMLElement | null} */ (root.querySelector('[data-global-filters]'));

  /** @param {string | number} value */
  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character] || character);
  /** @param {(typeof globalTourCities)[number]} city */
  const applyUrl = (city) => `/reservation/?tour=global&city=${encodeURIComponent(city.slug)}`;
  /** @param {keyof typeof globalStatusLabels} status */
  const statusClass = (status) => `city-status city-status--${status}`;

  /** @param {(typeof globalTourCities)[number]} city @param {boolean} [compact] */
  const renderAction = (city, compact = false) => {
    if (city.status === 'open' && city.detailUrl) return `<a class="button${compact ? ' button-small' : ''}" href="${city.detailUrl}">자세히 보기 →</a>`;
    if (city.status === 'coming-soon') return `<a class="button${compact ? ' button-small' : ''}" href="${applyUrl(city)}">알림 신청하기 →</a>`;
    return `<span class="global-planned-note" aria-label="${escapeHtml(city.city)} 투어는 확장 후보입니다">확장 후보</span>`;
  };

  /** @param {(typeof globalTourCities)[number]} city */
  const renderPanel = (city) => {
    if (!panel) return;
    panel.style.setProperty('--global-accent', city.status === 'coming-soon' ? '#d9ef5b' : '#8b969e');
    panel.innerHTML = `<div class="global-panel__top"><span>${escapeHtml(city.country)} · ${escapeHtml(globalRegionLabels[city.region])}</span><span class="${statusClass(city.status)}">${globalStatusLabels[city.status]}</span></div><p class="kicker">GLOBAL BUSINESS CITY</p><h2>${escapeHtml(city.city)}</h2><p>${escapeHtml(city.headline)}</p><div class="global-panel__keywords">${city.keywords.map((keyword) => `<span>#${escapeHtml(keyword)}</span>`).join('')}</div><div class="global-panel__insights"><small>관찰할 비즈니스 인사이트</small>${city.insightPoints.map((insight) => `<strong>· ${escapeHtml(insight)}</strong>`).join('')}</div><div class="global-panel__meta"><span>예상 일정</span><b>${escapeHtml(city.duration)}</b></div><div class="global-panel__action">${renderAction(city)}</div>`;
  };

  /** @param {string | undefined} cityId @param {boolean} [focusPanel] */
  const selectCity = (cityId, focusPanel = false) => {
    const city = globalTourCities.find((item) => item.id === cityId);
    if (!city) return;
    root.querySelectorAll('[data-global-city-id]').forEach((element) => {
      const cityElement = /** @type {HTMLElement} */ (element);
      cityElement.classList.toggle('is-active', cityElement.dataset.globalCityId === cityId);
    });
    renderPanel(city);
    if (focusPanel) panel?.focus({ preventScroll: true });
  };

  if (markerLayer) {
    markerLayer.innerHTML = globalTourCities.map((city) => `<button class="global-marker global-marker--${city.status}" type="button" style="--global-x:${city.x}%;--global-y:${city.y}%" data-global-city-id="${city.id}" aria-label="${escapeHtml(city.country)} ${escapeHtml(city.city)}, ${globalStatusLabels[city.status]}"><i></i><span>${escapeHtml(city.city)}<small>${globalStatusLabels[city.status]}</small></span></button>`).join('');
    markerLayer.querySelectorAll('[data-global-city-id]').forEach((element) => {
      const marker = /** @type {HTMLElement} */ (element);
      marker.addEventListener('mouseenter', () => selectCity(marker.dataset.globalCityId));
      marker.addEventListener('focus', () => selectCity(marker.dataset.globalCityId));
      marker.addEventListener('click', () => selectCity(marker.dataset.globalCityId, true));
    });
  }

  if (grid) {
    grid.innerHTML = globalTourCities.map((city) => `<article class="global-city-card" data-global-city-id="${city.id}" data-status="${city.status}" data-region="${city.region}"><div class="global-city-card__head"><span>${escapeHtml(city.country)}</span><span class="${statusClass(city.status)}">${globalStatusLabels[city.status]}</span></div><h3>${escapeHtml(city.city)}</h3><p>${escapeHtml(city.headline)}</p><div class="global-city-card__keywords">${city.keywords.map((keyword) => `<span>${escapeHtml(keyword)}</span>`).join('')}</div><dl><div><dt>예상 일정</dt><dd>${escapeHtml(city.duration)}</dd></div><div><dt>관찰 포인트</dt><dd>${escapeHtml(city.insightPoints[0])}</dd></div></dl><div class="global-city-card__actions"><button type="button" data-select-global-city="${city.id}">지도에서 보기</button>${renderAction(city, true)}</div></article>`).join('');
    grid.querySelectorAll('[data-select-global-city]').forEach((element) => {
      const button = /** @type {HTMLButtonElement} */ (element);
      button.addEventListener('click', () => {
      selectCity(button.dataset.selectGlobalCity, true);
      root.querySelector('#global-map')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  filters?.querySelectorAll('button').forEach((element) => {
    const button = /** @type {HTMLButtonElement} */ (element);
    button.addEventListener('click', () => {
    const filter = button.dataset.globalFilter;
    filters.querySelectorAll('button').forEach((item) => item.classList.toggle('is-active', item === button));
    grid?.querySelectorAll('[data-global-city-id]').forEach((element) => {
      const card = /** @type {HTMLElement} */ (element);
      card.hidden = filter !== 'all' && card.dataset.region !== filter;
    });
    });
  });

  selectCity(defaultGlobalCityId);
}
