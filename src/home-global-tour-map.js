import { defaultHomeGlobalCityId, homeGlobalTourCities } from './data/home-global-tour-cities.js';

const explorer = /** @type {HTMLElement | null} */ (document.querySelector('[data-home-global-explorer]'));

if (explorer) {
  const mapMount = /** @type {HTMLElement | null} */ (explorer.querySelector('[data-home-global-map]'));
  const pinLayer = /** @type {HTMLElement | null} */ (explorer.querySelector('[data-home-global-pins]'));
  const panel = /** @type {HTMLElement | null} */ (explorer.querySelector('[data-home-global-panel]'));
  const cityCards = /** @type {HTMLElement | null} */ (explorer.querySelector('[data-home-global-cards]'));
  let selectedGlobalCity = defaultHomeGlobalCityId;

  /** @param {(typeof homeGlobalTourCities)[string]} city */
  const panelMarkup = (city) => `
    <div class="home-global-panel__topline"><span>SELECTED CITY</span><b>${city.country}</b></div>
    <p class="home-global-panel__eyebrow">${city.keyword}</p>
    <h3>${city.name}</h3>
    <p class="home-global-panel__summary">${city.description}</p>
    <div class="home-global-panel__details">
      <div><h4>관찰 포인트</h4><ul>${city.points.map((point) => `<li>${point}</li>`).join('')}</ul></div>
      <div class="home-global-panel__question"><h4>추천 질문</h4><p>${city.question}</p></div>
    </div>
    <a class="button home-global-panel__action" href="#global-cards">${city.cta} <b>↓</b></a>`;

  /** @param {string} cityId @param {{scroll?: boolean}} [options] */
  const setSelectedGlobalCity = (cityId, options = {}) => {
    const city = homeGlobalTourCities[cityId];
    if (!city || !panel) return;
    selectedGlobalCity = cityId;
    panel.innerHTML = panelMarkup(city);
    explorer.querySelectorAll('[data-home-global-city-id]').forEach((element) => {
      const isActive = element.getAttribute('data-home-global-city-id') === selectedGlobalCity;
      element.classList.toggle('is-active', isActive);
      element.setAttribute('aria-pressed', String(isActive));
    });
    explorer.querySelectorAll('[data-home-global-card]').forEach((element) => {
      element.classList.toggle('is-active', element.getAttribute('data-home-global-card') === selectedGlobalCity);
    });
    if (options.scroll && mapMount) mapMount.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  if (pinLayer) {
    pinLayer.innerHTML = Object.entries(homeGlobalTourCities).map(([id, city]) => `
      <button type="button" class="home-global-area-pin" data-home-global-city-id="${id}" style="--global-x:${city.mapPosition.x}%;--global-y:${city.mapPosition.y}%" aria-label="${city.name} 투어 정보 보기" aria-pressed="false"><i aria-hidden="true"></i><span>${city.name}</span></button>`).join('');
    /** @param {Event} event */
    const selectFromEvent = (event) => {
      const target = /** @type {Element | null} */ (event.target);
      const cityId = target?.closest('[data-home-global-city-id]')?.getAttribute('data-home-global-city-id');
      if (cityId) setSelectedGlobalCity(cityId);
    };
    pinLayer.addEventListener('click', selectFromEvent);
    pinLayer.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      selectFromEvent(event);
    });
  }

  if (cityCards) {
    cityCards.innerHTML = Object.entries(homeGlobalTourCities).map(([id, city], index) => `
      <article class="home-global-city-card" data-home-global-card="${id}">
        <div class="home-global-city-card__image"><img src="${city.image}" alt="${city.imageAlt}" width="1400" height="933" loading="lazy"><span>GLOBAL ${String(index + 1).padStart(2, '0')} · ${city.country}</span></div>
        <div class="home-global-city-card__body"><h3>${city.name}</h3><strong>${city.keyword}</strong><p>${city.shortDescription}</p><ul>${city.points.map((point) => `<li>${point}</li>`).join('')}</ul><button type="button" data-view-home-global-city="${id}">지도에서 보기 ↑</button></div>
      </article>`).join('');
    cityCards.addEventListener('click', (event) => {
      const target = /** @type {Element | null} */ (event.target);
      const cityId = target?.closest('[data-view-home-global-city]')?.getAttribute('data-view-home-global-city');
      if (cityId) setSelectedGlobalCity(cityId, { scroll: true });
    });
  }

  setSelectedGlobalCity(selectedGlobalCity);
}
