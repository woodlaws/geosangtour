/**
 * @typedef {object} SeoulTourArea
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
 * @property {string} districtPathId
 */

/** @type {Record<string, SeoulTourArea>} */
export const seoulTourAreas = {
  seongsu: {
    name: '성수',
    keyword: '브랜드와 공간이 만나는 로컬 비즈니스 생태계',
    description: '성수는 오래된 공장지대와 새로운 브랜드 공간이 공존하는 지역입니다. 팝업스토어, 쇼룸, 카페, 편집숍을 관찰하며 브랜드가 공간을 통해 고객 경험을 만드는 방식을 배웁니다.',
    shortDescription: '오래된 산업 공간이 브랜드 경험과 방문 동기로 전환되는 과정을 관찰합니다.',
    points: ['브랜드 공간 기획', '팝업스토어 운영 방식', '고객 체류 동선'],
    question: '우리 브랜드는 어떤 공간 경험으로 기억될 수 있을까?',
    cta: '성수 투어 포인트 보기',
    image: '/assets/images/tours/seoul/seongsu-business-tour.webp',
    imageAlt: '성수의 브랜드와 카페 공간',
    mapPosition: { x: 64, y: 52 },
    districtPathId: 'Seongdong-gu'
  },
  hongdae: {
    name: '홍대',
    keyword: '트렌드와 젊은 소비가 움직이는 거리 상권',
    description: '홍대는 젊은 소비자, 콘텐츠, 거리 문화가 빠르게 움직이는 상권입니다. 트렌드가 어떻게 만들어지고 확산되는지, 소규모 브랜드와 콘텐츠 비즈니스가 어떻게 고객을 끌어들이는지 관찰합니다.',
    shortDescription: '젊은 소비와 거리 문화가 매장 콘텐츠와 상권의 변화를 만드는 방식을 살펴봅니다.',
    points: ['젊은 소비자 동선', '콘텐츠형 매장 운영', '거리 상권 변화'],
    question: '우리 사업은 어떤 콘텐츠로 고객의 발길을 멈추게 할 수 있을까?',
    cta: '홍대 투어 포인트 보기',
    image: '/assets/images/tours/seoul/hongdae-business-tour.webp',
    imageAlt: '홍대의 젊은 거리 상권',
    mapPosition: { x: 35, y: 49 },
    districtPathId: 'Mapo-gu'
  },
  jongno: {
    name: '종로',
    keyword: '역사와 현대가 공존하는 장수 비즈니스 현장',
    description: '종로는 오래된 상권과 새로운 라이프스타일 공간이 함께 존재하는 지역입니다. 전통, 역사, 신뢰, 장수 브랜드가 현대적인 고객 경험과 어떻게 연결되는지 살펴봅니다.',
    shortDescription: '시간이 만든 신뢰와 지역 이야기가 현대적인 고객 경험으로 이어지는 방식을 배웁니다.',
    points: ['장수 상권의 신뢰 구조', '전통과 현대의 연결', '로컬 스토리텔링'],
    question: '우리 사업이 오래 기억되려면 어떤 신뢰 자산을 쌓아야 할까?',
    cta: '종로 투어 포인트 보기',
    image: '/assets/images/tours/seoul/jongno-business-tour.webp',
    imageAlt: '종로의 전통 건축과 오래된 상권',
    mapPosition: { x: 51, y: 35 },
    districtPathId: 'Jongno-gu'
  },
  coex: {
    name: '코엑스',
    keyword: '전시, 브랜드, 복합문화공간이 만나는 비즈니스 쇼케이스',
    description: '코엑스는 전시, 브랜드 행사, 복합문화공간, 대형 유통이 결합된 비즈니스 쇼케이스입니다. 브랜드가 어떻게 자신을 보여주고, 고객과 만나는 접점을 설계하는지 관찰합니다.',
    shortDescription: '전시와 복합문화공간에서 브랜드가 고객 접점을 설계하는 방법을 관찰합니다.',
    points: ['전시와 브랜드 경험', '복합문화공간 동선', 'B2B/B2C 접점 설계'],
    question: '우리 사업은 고객 앞에서 어떻게 보여지고 있는가?',
    cta: '코엑스 투어 포인트 보기',
    image: '/assets/images/tours/seoul/coex-business-tour.webp',
    imageAlt: '코엑스의 복합문화공간',
    mapPosition: { x: 68, y: 68 },
    districtPathId: 'Gangnam-gu'
  }
};

export const defaultAreaId = 'seongsu';
