import { globalStatusLabels, globalTourCities } from './data/global-tour-cities.js';

const root = /** @type {HTMLElement | null} */ (document.querySelector('[data-global-city-detail]'));

if (root) {
  const slug = window.location.pathname.split('/').filter(Boolean).at(-1) || '';
  const city = globalTourCities.find((item) => item.slug === slug && item.detailUrl);

  if (!city) {
    root.innerHTML = `<section class="city-detail-error"><div class="shell"><p class="kicker">GLOBAL CITY</p><h1>도시 정보를 준비하고 있습니다</h1><p>요청한 도시의 상세 정보는 해외투어 허브에서 확인해 주세요.</p><a class="button" href="/tours/global/">해외투어 허브 보기 →</a></div></section>`;
  } else {
    document.title = `${city.city}투어 | 거상투어`;
    root.innerHTML = `<section class="subpage-hero global-city-detail-hero"><div class="shell"><nav class="breadcrumb light-breadcrumb" aria-label="현재 위치"><a href="/">홈</a><span>›</span><a href="/tours/global/">해외투어</a><span>›</span><strong>${city.city}</strong></nav><div class="global-hub-hero__grid"><div><p class="kicker lime">${city.country} · GLOBAL BUSINESS CITY</p><h1>${city.city}에서<br><em>비즈니스 현장</em>을 봅니다</h1></div><div><span class="city-status city-status--${city.status}">${globalStatusLabels[city.status]}</span><p>${city.description}</p><div class="hero-actions"><a class="button" href="/reservation/?tour=global&amp;city=${city.slug}">${city.city}투어 알림 신청 →</a><a class="button button-secondary" href="/tours/global/">전체 도시 보기</a></div></div></div></div></section><section class="section global-city-detail-content"><div class="shell"><div class="section-title"><div><p class="kicker">BUSINESS OBSERVATION</p><h2>${city.city}에서 무엇을 볼까요?</h2></div><p class="section-note">실제 일정과 방문 장소는 확정 후 별도로 안내합니다.</p></div><div class="city-detail-grid"><article><small>핵심 키워드</small><div class="global-detail-keywords">${city.keywords.map((keyword) => `<span>#${keyword}</span>`).join('')}</div></article><article><small>관찰할 인사이트</small><ul>${city.insightPoints.map((insight) => `<li>${insight}</li>`).join('')}</ul></article><article><small>추천 대상</small><ul>${city.recommendedFor.map((target) => `<li>${target}</li>`).join('')}</ul></article><article><small>준비 상태</small><p>${globalStatusLabels[city.status]}</p><strong>일정: ${city.duration}</strong><strong>${city.routeSummary}</strong></article></div></div></section><section class="cta route-cta"><div class="shell cta-inner"><p class="kicker">CITY UPDATE</p><h2>${city.city}투어 소식을<br><em>가장 먼저</em> 받아보세요</h2><p>현재는 관심 도시를 확인하는 준비 단계이며 실제 일정과 가격은 확정되지 않았습니다.</p><a class="button" href="/reservation/?tour=global&amp;city=${city.slug}">${city.city} 알림 신청하기 →</a></div></section>`;
  }
}
