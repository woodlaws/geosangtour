/**
 * @typedef {object} SeoulDistrict
 * @property {string} name
 * @property {string} label
 * @property {string} summary
 * @property {string[]} keywords
 * @property {string} observation
 * @property {string[]} points
 * @property {string} insight
 * @property {string} action
 * @property {string} accent
 */

/** @type {Record<string, SeoulDistrict>} */
export const seoulDistricts = {
  'Seongdong-gu': {
    name: '성동구',
    label: '성수 브랜드 공간',
    summary: '제조 기반의 도시 결 위에 브랜드 실험과 새로운 고객 경험이 빠르게 쌓이는 지역',
    keywords: ['브랜드 공간', '팝업스토어', '로컬 브랜드', '공간 재생'],
    observation: '오래된 건물의 질감을 브랜드가 어떻게 해석하는지, 매장 밖 골목까지 고객 경험으로 연결하는 방식을 관찰합니다.',
    points: ['성수 연무장길 상권', '서울숲 인접 브랜드 공간', '성수이로 골목 상권'],
    insight: '공간의 물성과 지역 서사를 브랜드 정체성, 콘텐츠, 방문 동기로 전환하는 방법',
    action: '성수 코스 알림 신청',
    accent: '#ef6b3f'
  },
  'Mapo-gu': {
    name: '마포구',
    label: '홍대 트렌드 상권',
    summary: '음악, 패션, F&B, 창작 문화가 교차하며 새로운 소비 감각이 확산되는 지역',
    keywords: ['트렌드', 'Z세대', '콘텐츠 매장', '골목 상권'],
    observation: '유동 인구가 골목으로 확장되는 흐름과 작은 브랜드가 시각 언어로 취향 공동체를 만드는 방식을 살펴봅니다.',
    points: ['홍대입구 상권', '연남동 골목 브랜드', '망원동 로컬 상권'],
    insight: '빠르게 변하는 취향을 상품 구성, 매장 전면, 콘텐츠 소재에 반영하는 방법',
    action: '마포 코스 알림 신청',
    accent: '#f2a93b'
  },
  'Jongno-gu': {
    name: '종로구',
    label: '종로 장수 비즈니스',
    summary: '오래된 상권과 새로운 브랜드가 한 골목 안에서 공존하는 서울의 시간 축',
    keywords: ['장수 브랜드', '전통 상권', '지역 서사', '세대 공존'],
    observation: '오래된 가게가 신뢰를 축적하는 방식과 전통 요소를 현대적인 상품·공간 경험으로 번역하는 과정을 관찰합니다.',
    points: ['서촌 골목 상권', '익선동 공간 재생', '인사동 문화 상권'],
    insight: '시간이 만든 신뢰와 지역 이야기를 브랜드 자산으로 보존하고 재해석하는 방법',
    action: '종로 코스 알림 신청',
    accent: '#7d9c45'
  },
  'Jung-gu': {
    name: '중구',
    label: '도심 상업과 공간 재해석',
    summary: '전통 상업지, 관광 상권, 디자인 산업이 촘촘하게 겹치는 서울 도심의 비즈니스 실험실',
    keywords: ['도심 상권', '관광 소비', '공간 재생', '디자인 콘텐츠'],
    observation: '오래된 산업 골목과 대형 상업 시설이 서로 다른 고객을 끌어들이는 방식, 낮과 밤의 상권 변화를 비교합니다.',
    points: ['을지로 산업 골목', '명동 관광 상권', '동대문 디자인 권역'],
    insight: '상반된 지역 자원을 하나의 방문 경험과 콘텐츠 동선으로 연결하는 방법',
    action: '중구 코스 알림 신청',
    accent: '#3f9b86'
  },
  'Yeongdeungpo-gu_1_': {
    name: '영등포구',
    label: '업무·리테일 복합 상권',
    summary: '금융 업무지구와 대형 리테일, 창작 골목이 서로 다른 고객 경험을 만드는 지역',
    keywords: ['복합 리테일', '업무 상권', '체류 경험', '산업 재생'],
    observation: '목적형 방문을 체류와 소비로 확장하는 대형 공간의 동선, 산업 지역이 창작 상권으로 전환되는 흐름을 봅니다.',
    points: ['여의도 업무·리테일 권역', '문래창작촌', '영등포역 상권'],
    insight: '서로 다른 방문 목적을 연결해 체류 시간을 늘리고 복합적인 고객 여정을 설계하는 방법',
    action: '영등포 코스 알림 신청',
    accent: '#397da7'
  },
  'Gangnam-gu': {
    name: '강남구',
    label: '브랜드 쇼케이스',
    summary: '대형 브랜드, 전시, 고밀도 상업 공간이 브랜드의 규모감과 신뢰를 보여주는 지역',
    keywords: ['브랜드 쇼케이스', '전시 마케팅', '프리미엄 경험', '고객 동선'],
    observation: '브랜드가 큰 공간에서 메시지를 단순화하는 방식과 전시·리테일·문화 콘텐츠를 하나의 경험으로 묶는 구조를 분석합니다.',
    points: ['코엑스 복합문화공간', '신사·도산 브랜드 거리', '강남역 상권'],
    insight: '브랜드의 전문성과 규모를 공간 구성, 안내 체계, 콘텐츠 큐레이션으로 전달하는 방법',
    action: '강남 코스 알림 신청',
    accent: '#395f96'
  },
  'Seocho-gu': {
    name: '서초구',
    label: '전문 서비스와 문화 경험',
    summary: '업무, 생활, 문화예술 소비가 안정적인 고객층과 함께 형성된 지역',
    keywords: ['전문 서비스', '문화 소비', '생활 상권', '신뢰 설계'],
    observation: '전문 서비스가 신뢰를 시각화하는 방식과 문화시설 주변의 식음·생활 상권이 고객의 하루를 연결하는 흐름을 관찰합니다.',
    points: ['강남역 서초권 상권', '서래마을 생활 상권', '예술의전당 인접 문화 권역'],
    insight: '전문성과 편안함을 함께 전달하고 반복 방문을 만드는 서비스 경험 설계 방법',
    action: '서초 코스 알림 신청',
    accent: '#7565a8'
  },
  'Songpa-gu': {
    name: '송파구',
    label: '대형 목적지와 로컬 골목',
    summary: '대형 복합시설과 호수 주변 골목 상권이 목적형 방문을 하루의 경험으로 확장하는 지역',
    keywords: ['목적지 상권', '가족 고객', '복합 경험', '로컬 F&B'],
    observation: '대형 목적지가 주변 골목으로 유동을 확장하는 방식과 산책·식음·쇼핑이 연결되는 고객 여정을 살펴봅니다.',
    points: ['잠실 복합상업 권역', '송리단길', '석촌호수 인접 상권'],
    insight: '강한 앵커 콘텐츠와 작은 브랜드를 연결해 지역 전체의 체류 경험을 만드는 방법',
    action: '송파 코스 알림 신청',
    accent: '#b85d82'
  }
};

export const defaultDistrictId = 'Seongdong-gu';
