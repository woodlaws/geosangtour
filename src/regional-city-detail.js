import { cityStatusLabels, regionalCities } from './data/regional-cities.js';

const mount = /** @type {HTMLElement | null} */ (document.querySelector('[data-regional-city-detail]'));

if (mount) {
  const citySlug = new URLSearchParams(window.location.search).get('city') || '';
  const city = regionalCities.find((item) => item.slug === citySlug && item.status === 'open' && item.id !== 'seoul');
  if (!city) {
    mount.innerHTML = '<div class="shell city-detail-error"><p class="kicker">CITY TOUR</p><h1>도시 정보를 찾을 수 없습니다</h1><p>공개된 지역투어는 허브 페이지에서 확인해 주세요.</p><a class="button" href="/tours/regional/">지역투어 허브로 돌아가기 →</a></div>';
  } else {
    mount.innerHTML = `
      <section class="subpage-hero regional-city-detail-hero"><div class="shell"><nav class="breadcrumb" aria-label="현재 위치"><a href="/">홈</a><span>›</span><a href="/tours/regional/">지역투어</a><span>›</span><strong>${city.name}</strong></nav><div class="regional-hero__grid"><div><p class="kicker">${city.englishName} BUSINESS JOURNEY</p><h1>${city.name}에서<br><em>사업의 힌트</em>를 찾습니다</h1></div><div><span class="city-status city-status--open">${cityStatusLabels.open}</span><p>${city.description}</p><div class="hero-actions"><a class="button" href="/reservation/?tour=regional&amp;city=${city.slug}">${city.name}투어 알림 신청 →</a><a class="button button-secondary" href="/tours/regional/">전체 도시 보기</a></div></div></div></div></section>
      <section class="section city-detail-content"><div class="shell"><div class="section-title"><div><p class="kicker">BUSINESS OBSERVATION</p><h2>${city.headline}</h2></div><p class="section-note">실제 일정과 세부 방문 장소는 일정 공개 시 안내됩니다.</p></div><div class="city-detail-grid"><article><small>핵심 키워드</small><div class="regional-panel__keywords">${city.keywords.map((keyword) => `<span>${keyword}</span>`).join('')}</div></article><article><small>대표 인사이트</small><ul>${city.insightPoints.map((point) => `<li>${point}</li>`).join('')}</ul></article><article><small>추천 대상</small><p>${city.recommendedFor.join(' · ')}</p></article><article><small>대표 관찰 흐름</small><p>${city.routeSummary}</p><strong>예상 일정: ${city.duration}</strong></article></div></div></section>`;
  }
}
