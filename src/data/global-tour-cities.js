/**
 * @typedef {'open' | 'coming-soon' | 'planned'} GlobalCityStatus
 * @typedef {'japan' | 'greater-china' | 'southeast-asia' | 'oceania' | 'americas' | 'europe' | 'middle-east'} GlobalRegion
 * @typedef {object} GlobalTourCity
 * @property {string} id
 * @property {string} slug
 * @property {string} city
 * @property {string} country
 * @property {GlobalRegion} region
 * @property {GlobalCityStatus} status
 * @property {string} headline
 * @property {string} description
 * @property {string[]} keywords
 * @property {string[]} insightPoints
 * @property {string[]} recommendedFor
 * @property {string} duration
 * @property {string} routeSummary
 * @property {string} image
 * @property {string} detailUrl
 * @property {number} x
 * @property {number} y
 */

/** @type {Record<GlobalCityStatus, string>} */
export const globalStatusLabels = {
  open: '오픈',
  'coming-soon': '준비 중',
  planned: '확장 후보'
};

/** @type {Record<GlobalRegion, string>} */
export const globalRegionLabels = {
  japan: '일본',
  'greater-china': '중국권',
  'southeast-asia': '동남아',
  oceania: '오세아니아',
  americas: '미국',
  europe: '유럽',
  'middle-east': '중동'
};

/**
 * @param {Omit<GlobalTourCity, 'slug' | 'description' | 'recommendedFor' | 'duration' | 'routeSummary' | 'detailUrl'>} city
 * @returns {GlobalTourCity}
 */
const createCity = (city) => ({
  ...city,
  slug: city.id,
  description: `${city.headline}. 상권, 브랜드, 고객 경험과 사업 구조를 현장에서 관찰할 수 있도록 준비하고 있습니다.`,
  recommendedFor: ['대표·창업가', '마케터', '1인기업', '브랜드 운영자'],
  duration: '일정 미정',
  routeSummary: `${city.city} 주요 상권 · 브랜드 공간 · 고객 경험 관찰`,
  detailUrl: ''
});

/** @type {GlobalTourCity[]} */
export const globalTourCities = [
  createCity({ id: 'tokyo', city: '도쿄', country: '일본', region: 'japan', status: 'coming-soon', headline: '디테일한 오프라인 매장 경험과 브랜드 운영 방식을 관찰하는 도시', keywords: ['리테일', '브랜드 운영', '고객 경험'], insightPoints: ['작은 디테일이 구매 경험을 만드는 방식', '일관된 브랜드 운영 구조'], image: '/assets/images/tours/overseas/tokyo-business-tour.webp', x: 85, y: 34 }),
  createCity({ id: 'osaka', city: '오사카', country: '일본', region: 'japan', status: 'coming-soon', headline: '상업 거리와 관광 소비, 로컬 브랜드의 생존 방식을 볼 수 있는 도시', keywords: ['상업 거리', '관광 소비', '로컬 브랜드'], insightPoints: ['관광객과 생활 고객이 만나는 접점', '밀집 상권의 매장 차별화'], image: '', x: 83.5, y: 36 }),
  createCity({ id: 'fukuoka', city: '후쿠오카', country: '일본', region: 'japan', status: 'coming-soon', headline: '서울에서 가까운 일본 로컬 상권과 라이프스타일 소비를 관찰하는 도시', keywords: ['로컬 상권', '라이프스타일', '근거리 시장'], insightPoints: ['중소도시형 상권의 밀도', '생활 소비와 브랜드 공간의 연결'], image: '', x: 81.5, y: 37 }),
  createCity({ id: 'shanghai', city: '상하이', country: '중국', region: 'greater-china', status: 'coming-soon', headline: '중국 소비 트렌드와 도시형 브랜드 경험을 볼 수 있는 도시', keywords: ['소비 트렌드', '도시 브랜드', '신유통'], insightPoints: ['빠르게 변하는 소비자 경험', '온라인과 오프라인의 결합'], image: '', x: 80.5, y: 39 }),
  createCity({ id: 'shenzhen', city: '선전', country: '중국', region: 'greater-china', status: 'coming-soon', headline: '테크, 제조, 라이브커머스, 플랫폼 비즈니스를 관찰할 수 있는 도시', keywords: ['테크', '제조', '플랫폼'], insightPoints: ['제품화 속도를 높이는 생태계', '라이브커머스와 고객 접점'], image: '/assets/images/tours/overseas/shenzhen-business-tour.webp', x: 78.5, y: 44 }),
  createCity({ id: 'hangzhou', city: '항저우', country: '중국', region: 'greater-china', status: 'coming-soon', headline: '플랫폼 경제와 디지털 커머스 생태계를 이해할 수 있는 도시', keywords: ['플랫폼 경제', '디지털 커머스', '데이터'], insightPoints: ['플랫폼이 상권에 미치는 영향', '데이터 기반 고객 경험'], image: '', x: 79.5, y: 40.5 }),
  createCity({ id: 'taipei', city: '타이베이', country: '대만', region: 'greater-china', status: 'coming-soon', headline: '소상공인 상권과 로컬 브랜드 감각을 관찰할 수 있는 도시', keywords: ['소상공인', '로컬 브랜드', '생활 상권'], insightPoints: ['작은 브랜드가 신뢰를 쌓는 방식', '골목과 콘텐츠의 결합'], image: '', x: 81, y: 45 }),
  createCity({ id: 'hong-kong', city: '홍콩', country: '홍콩', region: 'greater-china', status: 'coming-soon', headline: '금융, 쇼핑, 글로벌 상업이 결합된 아시아 비즈니스 허브', keywords: ['금융', '글로벌 상업', '고객 경험'], insightPoints: ['고밀도 상권의 고객 흐름', '글로벌 브랜드의 현지화'], image: '/assets/images/tours/overseas/hong-kong-business-tour.webp', x: 77.5, y: 46 }),
  createCity({ id: 'singapore', city: '싱가포르', country: '싱가포르', region: 'southeast-asia', status: 'coming-soon', headline: '도시국가 브랜딩과 글로벌 비즈니스 환경을 볼 수 있는 도시', keywords: ['도시 브랜딩', '글로벌 비즈니스', '다문화'], insightPoints: ['도시 전체가 브랜드가 되는 방식', '다문화 고객 경험 설계'], image: '', x: 75.5, y: 58 }),
  createCity({ id: 'ho-chi-minh', city: '호치민', country: '베트남', region: 'southeast-asia', status: 'coming-soon', headline: '성장시장과 K-브랜드 진출 가능성을 관찰할 수 있는 도시', keywords: ['성장시장', 'K-브랜드', '신규 고객'], insightPoints: ['빠르게 커지는 소비층의 선택', '한국 브랜드의 현지 접점'], image: '', x: 78, y: 54 }),
  createCity({ id: 'hanoi', city: '하노이', country: '베트남', region: 'southeast-asia', status: 'coming-soon', headline: '베트남 로컬 소비와 도시 성장 흐름을 읽을 수 있는 도시', keywords: ['로컬 소비', '도시 성장', '생활 상권'], insightPoints: ['전통 상권과 신흥 소비의 공존', '도시 성장에 따른 고객 변화'], image: '', x: 77.5, y: 49 }),
  createCity({ id: 'bangkok', city: '방콕', country: '태국', region: 'southeast-asia', status: 'coming-soon', headline: '관광, 커머스, 라이프스타일 소비가 강하게 결합된 도시', keywords: ['관광 소비', '커머스', '라이프스타일'], insightPoints: ['목적형 공간이 체류를 만드는 방식', '관광 고객과 로컬 고객의 교차'], image: '', x: 74.5, y: 52 }),
  createCity({ id: 'sydney', city: '시드니', country: '호주', region: 'oceania', status: 'coming-soon', headline: '글로벌 한인 비즈니스와 라이프스타일 브랜드를 관찰할 수 있는 도시', keywords: ['한인 비즈니스', '라이프스타일', '글로벌 고객'], insightPoints: ['이민 시장과 커뮤니티 비즈니스', '라이프스타일 브랜드의 현지화'], image: '/assets/images/tours/overseas/sydney-business-tour.webp', x: 89, y: 78 }),
  createCity({ id: 'new-york', city: '뉴욕', country: '미국', region: 'americas', status: 'planned', headline: '글로벌 브랜드, 리테일, 콘텐츠 비즈니스의 최전선을 볼 수 있는 도시', keywords: ['글로벌 브랜드', '리테일', '콘텐츠'], insightPoints: ['브랜드가 문화를 만드는 방식', '고밀도 리테일의 차별화'], image: '', x: 23, y: 36 }),
  createCity({ id: 'los-angeles', city: 'LA', country: '미국', region: 'americas', status: 'planned', headline: '콘텐츠, 커뮤니티, 라이프스타일 비즈니스가 결합된 도시', keywords: ['콘텐츠', '커뮤니티', '라이프스타일'], insightPoints: ['커뮤니티가 시장을 만드는 방식', '콘텐츠와 공간 경험의 결합'], image: '', x: 12, y: 41 }),
  createCity({ id: 'london', city: '런던', country: '영국', region: 'europe', status: 'planned', headline: '전통과 현대 브랜드가 공존하는 글로벌 도시', keywords: ['전통', '현대 브랜드', '글로벌 시장'], insightPoints: ['헤리티지를 현재화하는 방법', '다문화 시장의 브랜드 언어'], image: '', x: 47, y: 33 }),
  createCity({ id: 'paris', city: '파리', country: '프랑스', region: 'europe', status: 'planned', headline: '패션, 감성, 공간 브랜딩을 관찰할 수 있는 도시', keywords: ['패션', '감성', '공간 브랜딩'], insightPoints: ['공간이 브랜드 가치를 높이는 방식', '감성과 구매 경험의 연결'], image: '', x: 49, y: 37 }),
  createCity({ id: 'milan', city: '밀라노', country: '이탈리아', region: 'europe', status: 'planned', headline: '디자인, 패션, 프리미엄 브랜드 경험을 볼 수 있는 도시', keywords: ['디자인', '패션', '프리미엄'], insightPoints: ['디자인을 비즈니스 자산으로 만드는 법', '프리미엄 고객 경험의 구조'], image: '', x: 52, y: 39 }),
  createCity({ id: 'dubai', city: '두바이', country: '아랍에미리트', region: 'middle-east', status: 'planned', headline: '글로벌 자본과 미래형 도시 브랜딩을 관찰할 수 있는 도시', keywords: ['글로벌 자본', '미래 도시', '도시 브랜딩'], insightPoints: ['대형 프로젝트가 수요를 만드는 방식', '미래 지향적 고객 경험'], image: '', x: 63, y: 48 })
];

export const defaultGlobalCityId = 'tokyo';
