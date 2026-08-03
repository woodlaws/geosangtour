/**
 * @typedef {object} DomesticTourArea
 * @property {string} name
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

/** @type {Record<string, DomesticTourArea>} */
export const domesticTourAreas = {
  busan: {
    name: '부산',
    keyword: '해양도시 부산의 상권과 관광 비즈니스',
    description: '부산은 바다, 항구, 관광, 로컬 상권이 함께 움직이는 대표적인 해양도시입니다. 해운대, 광안리, 영도, 전포 등 다양한 권역의 상권과 관광 동선을 관찰하며 체류형 소비와 로컬 브랜드의 가능성을 살펴봅니다.',
    shortDescription: '해안 상권과 로컬 브랜드가 여행자의 체류와 소비를 만드는 흐름을 관찰합니다.',
    points: ['해안 상권과 관광객 동선', '로컬 브랜드와 카페 거리', '체류형 소비 구조'],
    question: '우리 지역이나 브랜드는 어떤 동선에서 고객의 시간을 더 오래 붙잡을 수 있을까?',
    cta: '부산 투어 포인트 보기',
    image: '/assets/images/tours/korea/busan-business-tour.webp',
    imageAlt: '부산의 해안 상권과 도시 풍경',
    mapPosition: { x: 83, y: 72 }
  },
  gyeongju: {
    name: '경주',
    keyword: '역사와 문화가 만드는 관광 브랜드',
    description: '경주는 문화유산과 로컬 콘텐츠가 관광 비즈니스로 연결되는 도시입니다. 황리단길, 역사 유적, 숙박, 카페, 기념품, 체험 콘텐츠가 어떻게 하나의 도시 브랜드를 만드는지 관찰합니다.',
    shortDescription: '문화유산과 로컬 콘텐츠가 하나의 도시 브랜드로 연결되는 방식을 살펴봅니다.',
    points: ['문화유산과 상권의 연결', '도시 브랜딩과 로컬 콘텐츠', '관광객 경험 설계'],
    question: '우리 사업은 어떤 이야기와 경험을 결합해 브랜드 자산으로 만들 수 있을까?',
    cta: '경주 투어 포인트 보기',
    image: '/assets/images/tours/korea/gyeongju-business-tour.webp',
    imageAlt: '경주의 문화유산과 지역 상권',
    mapPosition: { x: 77, y: 59 }
  },
  yeosu: {
    name: '여수',
    keyword: '바다와 여정이 빚어내는 관광 경제',
    description: '여수는 바다, 야경, 먹거리, 숙박, 이동 동선이 결합된 관광도시입니다. 여행자의 이동 흐름과 소비 접점이 어떻게 만들어지는지, 지역의 자연 자원이 어떻게 비즈니스 콘텐츠가 되는지 살펴봅니다.',
    shortDescription: '여행 동선과 자연 자원이 먹거리·숙박·야경 소비로 이어지는 구조를 관찰합니다.',
    points: ['여행 동선과 소비 접점', '먹거리와 숙박 비즈니스', '야경과 자연 자원의 콘텐츠화'],
    question: '우리 사업은 고객의 여정 중 어느 순간에 가장 강하게 기억될 수 있을까?',
    cta: '여수 투어 포인트 보기',
    image: '/assets/images/tours/korea/yeosu-business-tour.webp',
    imageAlt: '여수의 바다와 관광 동선',
    mapPosition: { x: 43, y: 79 }
  },
  mokpo: {
    name: '목포',
    keyword: '근대문화와 항구도시의 로컬 비즈니스',
    description: '목포는 근대문화, 항구, 음식, 골목 콘텐츠가 살아 있는 도시입니다. 오래된 공간과 지역 스토리가 어떻게 새로운 관광 콘텐츠와 로컬 비즈니스로 재해석되는지 관찰합니다.',
    shortDescription: '항구와 골목에 쌓인 지역 이야기가 새로운 관광 콘텐츠가 되는 과정을 배웁니다.',
    points: ['근대문화와 공간 재해석', '항구도시 로컬 스토리', '음식과 골목 상권'],
    question: '우리 사업의 오래된 자산은 어떻게 새로운 고객 경험으로 재해석될 수 있을까?',
    cta: '목포 투어 포인트 보기',
    image: '/assets/images/tours/korea/mokpo-business-tour.webp',
    imageAlt: '목포의 항구와 근대문화 거리',
    mapPosition: { x: 18, y: 77 }
  }
};

export const defaultDomesticAreaId = 'busan';
