import { defaultDomesticAreaId, domesticTourAreas } from './data/domestic-tour-areas.js';

const explorer = /** @type {HTMLElement | null} */ (document.querySelector('[data-domestic-explorer]'));

if (explorer) {
  const mapMount = /** @type {HTMLElement | null} */ (explorer.querySelector('[data-domestic-map]'));
  const pinLayer = /** @type {HTMLElement | null} */ (explorer.querySelector('[data-domestic-pin-layer]'));
  const panel = /** @type {HTMLElement | null} */ (explorer.querySelector('[data-domestic-panel]'));
  const areaCards = /** @type {HTMLElement | null} */ (explorer.querySelector('[data-domestic-cards]'));
  let selectedDomesticArea = defaultDomesticAreaId;

  /** @param {(typeof domesticTourAreas)[string]} area */
  const panelMarkup = (area) => `
    <div class="domestic-panel__topline"><span>SELECTED CITY</span><b>${area.name}</b></div>
    <p class="domestic-panel__eyebrow">${area.keyword}</p>
    <h3>${area.name}</h3>
    <p class="domestic-panel__summary">${area.description}</p>
    <div class="domestic-panel__details">
      <div><h4>관찰 포인트</h4><ul>${area.points.map((point) => `<li>${point}</li>`).join('')}</ul></div>
      <div class="domestic-panel__question"><h4>추천 질문</h4><p>${area.question}</p></div>
    </div>
    <a class="button domestic-panel__action" href="#domestic-cards">${area.cta} <b>↓</b></a>`;

  /** @param {string} areaId @param {{scroll?: boolean}} [options] */
  const setSelectedDomesticArea = (areaId, options = {}) => {
    const area = domesticTourAreas[areaId];
    if (!area || !panel) return;
    selectedDomesticArea = areaId;
    panel.innerHTML = panelMarkup(area);

    explorer.querySelectorAll('[data-domestic-area-id]').forEach((element) => {
      const isActive = element.getAttribute('data-domestic-area-id') === selectedDomesticArea;
      element.classList.toggle('is-active', isActive);
      element.setAttribute('aria-pressed', String(isActive));
    });
    explorer.querySelectorAll('[data-domestic-card]').forEach((element) => {
      element.classList.toggle('is-active', element.getAttribute('data-domestic-card') === selectedDomesticArea);
    });
    if (options.scroll && mapMount) mapMount.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  if (pinLayer) {
    pinLayer.innerHTML = Object.entries(domesticTourAreas).map(([id, area]) => `
      <button type="button" class="domestic-area-pin" data-domestic-area-id="${id}" style="--pin-x:${area.mapPosition.x}%;--pin-y:${area.mapPosition.y}%" aria-label="${area.name} 투어 정보 보기" aria-pressed="false"><i aria-hidden="true"></i><span>${area.name}</span></button>`).join('');
    /** @param {Event} event */
    const selectFromEvent = (event) => {
      const target = /** @type {Element | null} */ (event.target);
      const areaId = target?.closest('[data-domestic-area-id]')?.getAttribute('data-domestic-area-id');
      if (areaId) setSelectedDomesticArea(areaId);
    };
    pinLayer.addEventListener('click', selectFromEvent);
    pinLayer.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      selectFromEvent(event);
    });
  }

  if (areaCards) {
    areaCards.innerHTML = Object.entries(domesticTourAreas).map(([id, area], index) => `
      <article class="domestic-area-card" data-domestic-card="${id}">
        <div class="domestic-area-card__image"><img src="${area.image}" alt="${area.imageAlt}" width="1400" height="933" loading="lazy"><span>DOMESTIC ${String(index + 1).padStart(2, '0')}</span></div>
        <div class="domestic-area-card__body"><h3>${area.name}</h3><strong>${area.keyword}</strong><p>${area.shortDescription}</p><ul>${area.points.map((point) => `<li>${point}</li>`).join('')}</ul><button type="button" data-view-domestic-area="${id}">지도에서 보기 ↑</button></div>
      </article>`).join('');
    areaCards.addEventListener('click', (event) => {
      const target = /** @type {Element | null} */ (event.target);
      const areaId = target?.closest('[data-view-domestic-area]')?.getAttribute('data-view-domestic-area');
      if (areaId) setSelectedDomesticArea(areaId, { scroll: true });
    });
  }

  setSelectedDomesticArea(selectedDomesticArea);
}
