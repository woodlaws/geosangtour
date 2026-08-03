/**
 * @typedef {object} HomeGlobalTourCity
 * @property {string} name
 * @property {string} country
 * @property {string} keyword
 * @property {string} description
 * @property {string} shortDescription
 * @property {string[]} points
 * @property {string} question
 * @property {string} cta
 * @property {string} image
 * @property {string} imageAlt
 * @property {{x: number, y: number}} mapPosition
 */

/** @type {Record<string, HomeGlobalTourCity>} */
export const homeGlobalTourCities = {
  tokyo: {
    name: '도쿄',
    country: '일본',
    keyword: '리테일, 브랜딩, 공간 경험의 도시',
    description: '도쿄는 브랜드 공간, 편집숍, 리테일, 고객 경험 설계가 촘촘하게 발달한 도시입니다. 매장 구성, 고객 동선, 브랜드 세계관, 디테일한 서비스 경험을 관찰하며 내 사업에 적용할 수 있는 힌트를 찾습니다.',
    shortDescription: '브랜드 세계관이 매장 구성과 세밀한 서비스 경험으로 구현되는 방식을 관찰합니다.',
    points: ['브랜드 공간과 리테일 경험', '고객 동선과 매장 디테일', '콘텐츠형 소비 공간'],
    question: '우리 브랜드는 고객이 머무르고 싶어지는 경험을 만들고 있는가?',
    cta: '도쿄 투어 포인트 보기',
    image: '/assets/images/tours/overseas/tokyo-business-tour.webp',
    imageAlt: '도쿄의 네온 상업 거리',
    mapPosition: { x: 84, y: 37 }
  },
  shenzhen: {
    name: '선전',
    country: '중국',
    keyword: '제조, 테크, 플랫폼 생태계',
    description: '선전은 제조, 하드웨어, 테크 스타트업, 플랫폼 비즈니스가 빠르게 움직이는 도시입니다. 제품화 속도, 공급망, 테크 생태계, 새로운 비즈니스 모델이 만들어지는 방식을 관찰합니다.',
    shortDescription: '아이디어가 제품과 플랫폼 비즈니스로 빠르게 전환되는 생태계를 살펴봅니다.',
    points: ['제조와 제품화 속도', '테크 스타트업 생태계', '플랫폼 기반 비즈니스'],
    question: '우리 사업은 기술과 실행 속도를 어떻게 경쟁력으로 만들 수 있을까?',
    cta: '선전 투어 포인트 보기',
    image: '/assets/images/tours/overseas/shenzhen-business-tour.webp',
    imageAlt: '중국 선전의 야간 스카이라인',
    mapPosition: { x: 77, y: 49 }
  },
  hongkong: {
    name: '홍콩',
    country: '홍콩',
    keyword: '글로벌 비즈니스와 도시 상권',
    description: '홍콩은 금융, 무역, 리테일, 글로벌 브랜드가 밀집한 도시입니다. 좁은 도시 공간 안에서 브랜드와 상권이 어떻게 고밀도로 운영되는지, 글로벌 비즈니스 감각이 어떻게 구현되는지 관찰합니다.',
    shortDescription: '한정된 도시 공간에서 글로벌 브랜드와 상권이 고밀도로 운영되는 방식을 배웁니다.',
    points: ['고밀도 도시 상권', '글로벌 브랜드 운영', '금융·무역 기반 비즈니스 감각'],
    question: '우리 사업은 한정된 공간과 자원을 어떻게 고밀도 가치로 바꿀 수 있을까?',
    cta: '홍콩 투어 포인트 보기',
    image: '/assets/images/tours/overseas/hong-kong-business-tour.webp',
    imageAlt: '홍콩 빅토리아 하버의 야경',
    mapPosition: { x: 76, y: 55 }
  },
  sydney: {
    name: '시드니',
    country: '호주',
    keyword: '라이프스타일 비즈니스와 도시 브랜딩',
    description: '시드니는 자연, 도시, 라이프스타일, 관광 비즈니스가 결합된 도시입니다. 도시 브랜딩, 프리미엄 라이프스타일, 관광 동선, 로컬 비즈니스가 어떻게 조화를 이루는지 관찰합니다.',
    shortDescription: '자연과 도시 경험이 프리미엄 라이프스타일 비즈니스로 연결되는 흐름을 봅니다.',
    points: ['라이프스타일 기반 비즈니스', '도시 브랜딩과 관광 동선', '프리미엄 로컬 경험'],
    question: '우리 사업은 어떤 라이프스타일 감각과 연결될 수 있을까?',
    cta: '시드니 투어 포인트 보기',
    image: '/assets/images/tours/overseas/sydney-business-tour.webp',
    imageAlt: '시드니 오페라하우스와 항구',
    mapPosition: { x: 89, y: 77 }
  }
};

export const defaultHomeGlobalCityId = 'tokyo';
