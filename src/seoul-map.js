import { defaultDistrictId, seoulDistricts } from './data/seoul-districts.js';

const explorer = /** @type {HTMLElement | null} */ (document.querySelector('[data-seoul-explorer]'));

if (explorer) {
  const mapMount = /** @type {HTMLElement | null} */ (explorer.querySelector('[data-seoul-map]'));
  const panel = /** @type {HTMLElement | null} */ (explorer.querySelector('[data-district-panel]'));
  const districtList = /** @type {HTMLElement | null} */ (explorer.querySelector('[data-district-list]'));
  let activeDistrictId = defaultDistrictId;

  /** @param {(typeof seoulDistricts)[string]} district */
  const panelMarkup = (district) => `
    <div class="district-panel__topline"><span>SELECTED DISTRICT</span><b>${district.name}</b></div>
    <p class="district-panel__eyebrow">${district.label}</p>
    <h2>${district.name}</h2>
    <p class="district-panel__summary">${district.summary}</p>
    <div class="district-keywords" aria-label="${district.name} 핵심 키워드">${district.keywords.map((keyword) => `<span>${keyword}</span>`).join('')}</div>
    <dl class="district-details">
      <div><dt>관찰 포인트</dt><dd>${district.observation}</dd></div>
      <div><dt>대표 탐방 포인트</dt><dd><ul>${district.points.map((point) => `<li>${point}</li>`).join('')}</ul></dd></div>
      <div><dt>얻을 수 있는 인사이트</dt><dd>${district.insight}</dd></div>
    </dl>
    <a class="button district-panel__action" href="/reservation/?tour=seoul&amp;district=${encodeURIComponent(district.name)}">${district.action} <b>→</b></a>`;

  /**
   * @param {string} districtId
   * @param {boolean} [announce]
   */
  const setActiveDistrict = (districtId, announce = false) => {
    const district = seoulDistricts[districtId];
    if (!district || !panel) return;
    activeDistrictId = districtId;
    panel.innerHTML = panelMarkup(district);
    panel.style.setProperty('--district-accent', district.accent);

    explorer.querySelectorAll('[data-district-id]').forEach((element) => {
      const isActive = element.getAttribute('data-district-id') === activeDistrictId;
      element.classList.toggle('is-active', isActive);
      element.setAttribute('aria-pressed', String(isActive));
    });

    if (announce) panel.focus({ preventScroll: true });
  };

  if (districtList) {
    districtList.innerHTML = Object.entries(seoulDistricts).map(([id, district]) =>
      `<button type="button" data-district-id="${id}" style="--district-accent:${district.accent}" aria-pressed="false">${district.name}</button>`
    ).join('');
    districtList.addEventListener('click', (event) => {
      const target = /** @type {Element | null} */ (event.target);
      const button = target?.closest('[data-district-id]');
      const districtId = button?.getAttribute('data-district-id');
      if (districtId) setActiveDistrict(districtId, true);
    });
  }

  const activateMap = async () => {
    if (!mapMount) return;
    try {
      const response = await fetch('/assets/maps/seoul-districts.svg');
      if (!response.ok) throw new Error(`Map request failed: ${response.status}`);
      const markup = await response.text();
      const documentFragment = new DOMParser().parseFromString(markup, 'image/svg+xml');
      const svg = documentFragment.querySelector('svg');
      if (!svg) throw new Error('SVG element missing');

      svg.removeAttribute('width');
      svg.removeAttribute('height');
      svg.classList.add('seoul-district-map');
      svg.setAttribute('role', 'group');
      svg.setAttribute('aria-label', '서울 자치구 선택 지도');

      svg.querySelectorAll('path').forEach((path) => {
        path.classList.add('seoul-district');
        const district = seoulDistricts[path.id];
        if (!district) return;
        path.classList.add('seoul-district--interactive');
        path.setAttribute('data-district-id', path.id);
        path.setAttribute('tabindex', '0');
        path.setAttribute('role', 'button');
        path.setAttribute('aria-label', `${district.name} 비즈니스 학습여행 정보 보기`);
        path.setAttribute('aria-pressed', 'false');
        path.style.setProperty('--district-accent', district.accent);
        path.addEventListener('click', () => setActiveDistrict(path.id));
        path.addEventListener('keydown', (event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            setActiveDistrict(path.id);
          }
        });
      });

      mapMount.replaceChildren(document.adoptNode(svg));
      mapMount.setAttribute('aria-busy', 'false');
      setActiveDistrict(activeDistrictId);
    } catch (error) {
      mapMount.innerHTML = '<p class="map-error">지도를 불러오지 못했습니다. 위의 지역 버튼으로 정보를 선택해 주세요.</p>';
      mapMount.setAttribute('aria-busy', 'false');
      console.error(error);
    }
  };

  setActiveDistrict(activeDistrictId);
  activateMap();
}
