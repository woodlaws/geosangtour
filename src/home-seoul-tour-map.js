import { defaultAreaId, seoulTourAreas } from './data/seoul-districts.js';

const explorer = /** @type {HTMLElement | null} */ (document.querySelector('[data-home-seoul-explorer]'));

if (explorer) {
  const mapMount = /** @type {HTMLElement | null} */ (explorer.querySelector('[data-home-seoul-map]'));
  const panel = /** @type {HTMLElement | null} */ (explorer.querySelector('[data-home-seoul-panel]'));
  const cards = /** @type {HTMLElement | null} */ (explorer.querySelector('[data-home-seoul-cards]'));
  let selectedArea = defaultAreaId;

  /** @param {(typeof seoulTourAreas)[string]} area */
  const panelMarkup = (area) => `
    <div class="home-seoul-panel__topline"><span>SELECTED AREA</span><b>${area.name}</b></div>
    <p class="home-seoul-panel__eyebrow">${area.keyword}</p>
    <h3>${area.name}</h3>
    <p class="home-seoul-panel__summary">${area.description}</p>
    <div class="home-seoul-details">
      <div><h4>관찰 포인트</h4><ul>${area.points.map((point) => `<li>${point}</li>`).join('')}</ul></div>
      <div class="home-seoul-question"><h4>추천 질문</h4><p>${area.question}</p></div>
    </div>
    <a class="button home-seoul-panel__action" href="#home-seoul-cards">${area.cta} <b>↓</b></a>`;

  /** @param {string} areaId @param {{scroll?: boolean}} [options] */
  const setSelectedArea = (areaId, options = {}) => {
    const area = seoulTourAreas[areaId];
    if (!area || !panel) return;
    selectedArea = areaId;
    panel.innerHTML = panelMarkup(area);

    explorer.querySelectorAll('[data-home-seoul-area]').forEach((element) => {
      const isActive = element.getAttribute('data-home-seoul-area') === selectedArea;
      element.classList.toggle('is-active', isActive);
      element.setAttribute('aria-pressed', String(isActive));
    });
    explorer.querySelectorAll('[data-home-seoul-shape]').forEach((element) => {
      element.classList.toggle('is-active', element.getAttribute('data-home-seoul-shape') === selectedArea);
    });
    explorer.querySelectorAll('[data-home-seoul-card]').forEach((element) => {
      element.classList.toggle('is-active', element.getAttribute('data-home-seoul-card') === selectedArea);
    });

    if (options.scroll && mapMount) {
      mapMount.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  if (cards) {
    cards.innerHTML = Object.entries(seoulTourAreas).map(([id, area], index) => `
      <article class="home-seoul-area-card" data-home-seoul-card="${id}">
        <div class="home-seoul-area-card__image"><img src="${area.image}" alt="${area.imageAlt}" width="1600" height="1200" loading="lazy" decoding="async"><span>SEOUL ${String(index + 1).padStart(2, '0')}</span></div>
        <div class="home-seoul-area-card__body"><h3>${area.name}</h3><strong>${area.keyword}</strong><p>${area.shortDescription}</p><ul>${area.points.map((point) => `<li>${point}</li>`).join('')}</ul><button type="button" data-home-seoul-view="${id}">지도에서 보기 ↑</button></div>
      </article>`).join('');
    cards.addEventListener('click', (event) => {
      const target = /** @type {Element | null} */ (event.target);
      const areaId = target?.closest('[data-home-seoul-view]')?.getAttribute('data-home-seoul-view');
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
      svg.classList.add('home-seoul-district-map');
      svg.setAttribute('role', 'img');
      svg.setAttribute('aria-label', '한강과 서울 자치구 윤곽을 표시한 서울 지도');
      svg.querySelectorAll('path').forEach((path) => {
        path.classList.add('home-seoul-district');
        const areaEntry = Object.entries(seoulTourAreas).find(([, area]) => area.districtPathId === path.id);
        if (areaEntry) {
          path.classList.add('home-seoul-district--focus');
          path.setAttribute('data-home-seoul-shape', areaEntry[0]);
        }
      });

      const pinLayer = document.createElement('div');
      pinLayer.className = 'home-seoul-pin-layer';
      pinLayer.setAttribute('aria-label', '서울투어 지역 핀');
      pinLayer.innerHTML = Object.entries(seoulTourAreas).map(([id, area]) => `
        <button type="button" class="home-seoul-area-pin" data-home-seoul-area="${id}" style="--pin-x:${area.mapPosition.x}%;--pin-y:${area.mapPosition.y}%" aria-label="${area.name} 투어 정보 보기" aria-pressed="false"><i aria-hidden="true"></i><span>${area.name}</span></button>`).join('');

      /** @param {Event} event */
      const selectFromEvent = (event) => {
        const target = /** @type {Element | null} */ (event.target);
        const areaId = target?.closest('[data-home-seoul-area]')?.getAttribute('data-home-seoul-area');
        if (areaId) setSelectedArea(areaId);
      };
      pinLayer.addEventListener('click', selectFromEvent);
      pinLayer.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        selectFromEvent(event);
      });

      mapMount.replaceChildren(document.adoptNode(svg), pinLayer);
      mapMount.setAttribute('aria-busy', 'false');
      setSelectedArea(selectedArea);
    } catch (error) {
      mapMount.innerHTML = '<p class="home-seoul-map-error">지도를 불러오지 못했습니다. 하단 지역 카드에서 정보를 확인해 주세요.</p>';
      mapMount.setAttribute('aria-busy', 'false');
      console.error(error);
    }
  };

  setSelectedArea(selectedArea);
  activateMap();
}
