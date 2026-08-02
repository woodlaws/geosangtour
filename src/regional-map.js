import { cityStatusLabels, defaultRegionalCityId, regionGroupLabels, regionalCities } from './data/regional-cities.js';

const hub = /** @type {HTMLElement | null} */ (document.querySelector('[data-regional-hub]'));

if (hub) {
  const markerLayer = /** @type {HTMLElement | null} */ (hub.querySelector('[data-city-markers]'));
  const openGrid = /** @type {HTMLElement | null} */ (hub.querySelector('[data-open-city-grid]'));
  const comingGrid = /** @type {HTMLElement | null} */ (hub.querySelector('[data-coming-city-grid]'));
  const allGrid = /** @type {HTMLElement | null} */ (hub.querySelector('[data-city-grid]'));
  const cityPanel = /** @type {HTMLElement | null} */ (hub.querySelector('[data-city-panel]'));
  const cityMapSection = /** @type {HTMLElement | null} */ (hub.querySelector('[data-regional-map-section]'));
  const filterBar = /** @type {HTMLElement | null} */ (hub.querySelector('[data-city-filters]'));
  let activeCityId = defaultRegionalCityId;

  /** @param {(typeof regionalCities)[number]} city */
  const cityAction = (city) => city.status === 'open'
    ? { url: city.detailUrl, label: '자세히 보기' }
    : { url: `/reservation/?tour=regional&city=${encodeURIComponent(city.slug)}`, label: '알림 신청하기' };

  /** @param {(typeof regionalCities)[number]} city */
  const panelMarkup = (city) => {
    const action = cityAction(city);
    return `
      <div class="regional-panel__top"><span>SELECTED CITY</span><b>${city.englishName}</b></div>
      <div class="regional-panel__title"><div><small class="city-status city-status--${city.status}">${cityStatusLabels[city.status]}</small><h2>${city.name}</h2><span>${city.province}</span></div><span class="regional-panel__index">${String(regionalCities.findIndex((item) => item.id === city.id) + 1).padStart(2, '0')}</span></div>
      <p>${city.headline}</p>
      <div class="regional-panel__keywords">${city.keywords.map((keyword) => `<span>${keyword}</span>`).join('')}</div>
      <div class="regional-panel__insight"><small>대표 인사이트</small><strong>${city.insightPoints.join(' · ')}</strong></div>
      <div class="regional-panel__actions"><a class="button" href="${action.url}">${action.label} →</a><a class="text-link" href="#city-${city.id}">${city.name} 카드 보기 ↓</a></div>`;
  };

  /** @param {(typeof regionalCities)[number]} city */
  const featureCardMarkup = (city) => {
    const action = cityAction(city);
    return `
      <article class="regional-feature-card" data-city-card="${city.id}" style="--city-accent:${city.accent}">
        <div><span>${city.englishName}</span><small class="city-status city-status--${city.status}">${cityStatusLabels[city.status]}</small></div>
        <h3>${city.name}</h3><p>${city.headline}</p>
        <div class="regional-city-card__keywords">${city.keywords.map((keyword) => `<span>${keyword}</span>`).join('')}</div>
        <dl><div><dt>예상 일정</dt><dd>${city.duration}</dd></div><div><dt>대표 관점</dt><dd>${city.insightPoints[0]}</dd></div></dl>
        <a href="${action.url}">${action.label} →</a>
      </article>`;
  };

  /** @param {(typeof regionalCities)[number]} city */
  const listCardMarkup = (city) => `
    <article class="regional-city-card regional-city-card--list" id="city-${city.id}" data-city-card="${city.id}" data-city-status="${city.status}" data-city-region="${city.regionGroup}" style="--city-accent:${city.accent}">
      <div class="regional-city-card__head"><span>${regionGroupLabels[city.regionGroup]} · ${city.province}</span><small class="city-status city-status--${city.status}">${cityStatusLabels[city.status]}</small></div>
      <h3>${city.name}</h3><p>${city.headline}</p>
      <div class="regional-city-card__keywords">${city.keywords.map((keyword) => `<span>${keyword}</span>`).join('')}</div>
      <div class="regional-city-card__actions"><button type="button" data-select-city="${city.id}">지도에서 보기</button><a href="${cityAction(city).url}">${cityAction(city).label} →</a></div>
    </article>`;

  /**
   * @param {string} cityId
   * @param {boolean} [focusPanel]
   */
  const selectCity = (cityId, focusPanel = false) => {
    const city = regionalCities.find((item) => item.id === cityId);
    if (!city || !cityPanel) return;
    activeCityId = cityId;
    cityPanel.innerHTML = panelMarkup(city);
    cityPanel.style.setProperty('--city-accent', city.accent);
    hub.querySelectorAll('[data-city-id], [data-city-card]').forEach((element) => {
      const elementCityId = element.getAttribute('data-city-id') || element.getAttribute('data-city-card');
      const isActive = elementCityId === activeCityId;
      element.classList.toggle('is-active', isActive);
      if (element.hasAttribute('aria-pressed')) element.setAttribute('aria-pressed', String(isActive));
    });
    if (focusPanel) {
      cityMapSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      cityPanel.focus({ preventScroll: true });
    }
  };

  if (markerLayer) {
    markerLayer.innerHTML = regionalCities.map((city) => {
      const content = `<i></i><span>${city.name}${city.status === 'coming-soon' ? '<small>준비 중</small>' : ''}</span>`;
      const attributes = `class="regional-marker regional-marker--${city.status}" data-city-id="${city.id}" style="--city-accent:${city.accent};--city-x:${city.x}%;--city-y:${city.y}%" aria-label="${city.name} ${cityStatusLabels[city.status]}"`;
      return city.status === 'open'
        ? `<a ${attributes} href="${city.detailUrl}">${content}</a>`
        : `<button ${attributes} type="button" aria-pressed="false">${content}</button>`;
    }).join('');
    markerLayer.addEventListener('pointerover', (event) => {
      const target = /** @type {Element | null} */ (event.target);
      const marker = target?.closest('[data-city-id]');
      const cityId = marker?.getAttribute('data-city-id');
      if (cityId) selectCity(cityId);
    });
    markerLayer.addEventListener('click', (event) => {
      const target = /** @type {Element | null} */ (event.target);
      const marker = target?.closest('button[data-city-id]');
      const cityId = marker?.getAttribute('data-city-id');
      if (cityId) selectCity(cityId);
    });
  }

  if (openGrid) openGrid.innerHTML = regionalCities.filter((city) => city.status === 'open').map(featureCardMarkup).join('');
  if (comingGrid) comingGrid.innerHTML = regionalCities.filter((city) => city.status === 'coming-soon').map(featureCardMarkup).join('');

  if (allGrid) {
    allGrid.innerHTML = regionalCities.map(listCardMarkup).join('');
    allGrid.addEventListener('click', (event) => {
      const target = /** @type {Element | null} */ (event.target);
      const button = target?.closest('[data-select-city]');
      const cityId = button?.getAttribute('data-select-city');
      if (cityId) selectCity(cityId, true);
    });
  }

  filterBar?.addEventListener('click', (event) => {
    const target = /** @type {Element | null} */ (event.target);
    const button = target?.closest('[data-filter]');
    const filter = button?.getAttribute('data-filter');
    if (!filter || !allGrid) return;
    filterBar.querySelectorAll('[data-filter]').forEach((item) => item.classList.toggle('is-active', item === button));
    allGrid.querySelectorAll('[data-city-status]').forEach((card) => {
      const cityRegion = card.getAttribute('data-city-region');
      const matches = filter === 'all' || card.getAttribute('data-city-status') === filter || cityRegion === filter || (filter === 'gangwon-jeju' && (cityRegion === 'gangwon' || cityRegion === 'jeju'));
      card.toggleAttribute('hidden', !matches);
    });
  });

  selectCity(activeCityId);
}
