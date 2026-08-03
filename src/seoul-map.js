import { defaultAreaId, seoulTourAreas } from './data/seoul-districts.js';

const explorer = /** @type {HTMLElement | null} */ (document.querySelector('[data-seoul-explorer]'));

if (explorer) {
  const mapMount = /** @type {HTMLElement | null} */ (explorer.querySelector('[data-seoul-map]'));
  const panel = /** @type {HTMLElement | null} */ (explorer.querySelector('[data-district-panel]'));
  const areaList = /** @type {HTMLElement | null} */ (explorer.querySelector('[data-district-list]'));
  const areaCards = /** @type {HTMLElement | null} */ (document.querySelector('[data-area-cards]'));
  let selectedArea = defaultAreaId;

  /** @param {(typeof seoulTourAreas)[string]} area */
  const panelMarkup = (area) => `
    <div class="district-panel__topline"><span>SELECTED AREA</span><b>${area.name}</b></div>
    <p class="district-panel__eyebrow">${area.keyword}</p>
    <h2>${area.name}</h2>
    <p class="district-panel__summary">${area.description}</p>
    <div class="district-details">
      <div><h3>관찰 포인트</h3><ul>${area.points.map((point) => `<li>${point}</li>`).join('')}</ul></div>
      <div class="district-question"><h3>추천 질문</h3><p>${area.question}</p></div>
    </div>
    <a class="button district-panel__action" href="#seoul-courses">${area.cta} <b>↓</b></a>`;

  /** @param {string} areaId @param {{scroll?: boolean}} [options] */
  const setSelectedArea = (areaId, options = {}) => {
    const area = seoulTourAreas[areaId];
    if (!area || !panel) return;
    selectedArea = areaId;
    panel.innerHTML = panelMarkup(area);

    explorer.querySelectorAll('[data-area-id]').forEach((element) => {
      const isActive = element.getAttribute('data-area-id') === selectedArea;
      element.classList.toggle('is-active', isActive);
      element.setAttribute('aria-pressed', String(isActive));
    });
    explorer.querySelectorAll('[data-area-shape]').forEach((element) => {
      element.classList.toggle('is-active', element.getAttribute('data-area-shape') === selectedArea);
    });
    document.querySelectorAll('[data-area-card]').forEach((element) => {
      element.classList.toggle('is-active', element.getAttribute('data-area-card') === selectedArea);
    });

    if (options.scroll && mapMount) {
      mapMount.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  if (areaList) {
    areaList.innerHTML = Object.entries(seoulTourAreas).map(([id, area]) =>
      `<button type="button" data-area-id="${id}" aria-label="${area.name} 정보 보기" aria-pressed="false">${area.name}</button>`
    ).join('');
    areaList.addEventListener('click', (event) => {
      const target = /** @type {Element | null} */ (event.target);
      const areaId = target?.closest('[data-area-id]')?.getAttribute('data-area-id');
      if (areaId) setSelectedArea(areaId);
    });
  }

  if (areaCards) {
    areaCards.innerHTML = Object.entries(seoulTourAreas).map(([id, area], index) => `
      <article class="seoul-area-card" data-area-card="${id}">
        <div class="seoul-area-card__image"><img src="${area.image}" alt="${area.imageAlt}" width="1600" height="1200" loading="${index === 0 ? 'eager' : 'lazy'}"><span>SEOUL ${String(index + 1).padStart(2, '0')}</span></div>
        <div class="seoul-area-card__body"><h3>${area.name}</h3><strong>${area.keyword}</strong><p>${area.shortDescription}</p><ul>${area.points.map((point) => `<li>${point}</li>`).join('')}</ul><button type="button" data-view-area="${id}">지도에서 보기 ↑</button></div>
      </article>`).join('');
    areaCards.addEventListener('click', (event) => {
      const target = /** @type {Element | null} */ (event.target);
      const areaId = target?.closest('[data-view-area]')?.getAttribute('data-view-area');
      if (areaId) setSelectedArea(areaId, { scroll: true });
    });
  }

  const activateMap = async () => {
    if (!mapMount) return;
    try {
      const response = await fetch('/assets/maps/seoul-districts.svg');
      if (!response.ok) throw new Error(`Map request failed: ${response.status}`);
      const markup = await response.text();
      const fragment = new DOMParser().parseFromString(markup, 'image/svg+xml');
      const svg = fragment.querySelector('svg');
      if (!svg) throw new Error('SVG element missing');

      svg.removeAttribute('width');
      svg.removeAttribute('height');
      svg.classList.add('seoul-district-map');
      svg.setAttribute('role', 'img');
      svg.setAttribute('aria-label', '한강과 서울 자치구 윤곽을 표시한 서울 지도');
      svg.querySelectorAll('path').forEach((path) => {
        path.classList.add('seoul-district');
        const areaEntry = Object.entries(seoulTourAreas).find(([, area]) => area.districtPathId === path.id);
        if (areaEntry) {
          path.classList.add('seoul-district--focus');
          path.setAttribute('data-area-shape', areaEntry[0]);
        }
      });

      const pinLayer = document.createElement('div');
      pinLayer.className = 'seoul-pin-layer';
      pinLayer.setAttribute('aria-label', '서울투어 지역 핀');
      pinLayer.innerHTML = Object.entries(seoulTourAreas).map(([id, area]) => `
        <button type="button" class="seoul-area-pin" data-area-id="${id}" style="--pin-x:${area.mapPosition.x}%;--pin-y:${area.mapPosition.y}%" aria-label="${area.name} 투어 정보 보기" aria-pressed="false"><i aria-hidden="true"></i><span>${area.name}</span></button>`).join('');
      pinLayer.addEventListener('click', (event) => {
        const target = /** @type {Element | null} */ (event.target);
        const areaId = target?.closest('[data-area-id]')?.getAttribute('data-area-id');
        if (areaId) setSelectedArea(areaId);
      });
      pinLayer.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        const target = /** @type {Element | null} */ (event.target);
        const areaId = target?.closest('[data-area-id]')?.getAttribute('data-area-id');
        if (!areaId) return;
        event.preventDefault();
        setSelectedArea(areaId);
      });

      mapMount.replaceChildren(document.adoptNode(svg), pinLayer);
      mapMount.setAttribute('aria-busy', 'false');
      setSelectedArea(selectedArea);
    } catch (error) {
      mapMount.innerHTML = '<p class="map-error">지도를 불러오지 못했습니다. 위의 지역 버튼으로 정보를 선택해 주세요.</p>';
      mapMount.setAttribute('aria-busy', 'false');
      console.error(error);
    }
  };

  setSelectedArea(selectedArea);
  activateMap();
}
