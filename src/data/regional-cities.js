/**
 * @typedef {'metropolitan' | 'provincial-core' | 'tourism-core' | 'business-core'} RegionType
 * @typedef {'open' | 'coming-soon' | 'planned'} CityStatus
 * @typedef {'capital' | 'gangwon' | 'chungcheong' | 'honam' | 'yeongnam' | 'jeju'} RegionGroup
 * @typedef {object} RegionalCity
 * @property {string} id
 * @property {string} slug
 * @property {string} name
 * @property {string} englishName
 * @property {string} province
 * @property {RegionType} regionType
 * @property {RegionGroup} regionGroup
 * @property {CityStatus} status
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
 * @property {string} accent
 */

/**
 * @typedef {object} CityInput
 * @property {string} id
 * @property {string} name
 * @property {string} englishName
 * @property {string} province
 * @property {RegionType} regionType
 * @property {RegionGroup} regionGroup
 * @property {CityStatus} status
 * @property {string} headline
 * @property {string[]} keywords
 * @property {string[]} insights
 * @property {number} x
 * @property {number} y
 * @property {string} accent
 * @property {string} [image]
 */

/** @param {CityInput} city */
const createCity = (city) => ({
  id: city.id,
  slug: city.id,
  name: city.name,
  englishName: city.englishName,
  province: city.province,
  regionType: city.regionType,
  regionGroup: city.regionGroup,
  status: city.status,
  headline: city.headline,
  description: `${city.headline}. 상권, 브랜드, 고객 흐름과 공간 경험을 현장에서 관찰하고 내 사업에 적용할 질문을 찾습니다.`,
  keywords: city.keywords,
  insightPoints: city.insights,
  recommendedFor: ['소상공인', '1인기업', '마케터', '지역 사업자'],
  duration: '일정별 안내',
  routeSummary: `${city.name} 주요 상권 · 브랜드 공간 · 고객 흐름 관찰`,
  image: city.image || '',
  detailUrl: city.status === 'open'
    ? (city.id === 'seoul' ? '/tours/seoul/' : `/tours/regional/city/?city=${city.id}`)
    : '',
  x: city.x,
  y: city.y,
  accent: city.accent
});

const CAPITAL = '#e57a45';
const GANGWON = '#74944f';
const CHUNGCHEONG = '#39927f';
const HONAM = '#806aa8';
const YEONGNAM = '#3f7698';
const JEJU = '#b65f7f';

/** @type {RegionalCity[]} */
export const regionalCities = [
  createCity({ id:'seoul', name:'서울', englishName:'SEOUL', province:'서울특별시', regionType:'metropolitan', regionGroup:'capital', status:'open', headline:'트렌드와 브랜드가 가장 빠르게 움직이는 비즈니스 관찰 도시', keywords:['트렌드 상권','브랜드 공간','고객 경험','콘텐츠'], insights:['상권 변화 읽기','브랜드 경험 설계','콘텐츠 소재 발견'], x:29, y:20, accent:CAPITAL, image:'/assets/images/tours/seoul/seongsu-business-tour.webp' }),
  createCity({ id:'incheon', name:'인천', englishName:'INCHEON', province:'인천광역시', regionType:'metropolitan', regionGroup:'capital', status:'coming-soon', headline:'공항, 항만, 신도시가 연결되는 글로벌 관문 도시', keywords:['글로벌 관문','항만 상권','신도시','이동 고객'], insights:['관문형 고객 흐름','도시 권역 연결','글로벌 소비 관찰'], x:23, y:21, accent:CAPITAL }),
  createCity({ id:'suwon', name:'수원', englishName:'SUWON', province:'경기도', regionType:'provincial-core', regionGroup:'capital', status:'open', headline:'수도권 생활 상권과 가족 소비 흐름을 관찰할 수 있는 도시', keywords:['생활 상권','가족 소비','상권 연결','체류 경험'], insights:['반복 방문 구조','가족 고객 동선','생활권 콘텐츠'], x:30, y:26, accent:CAPITAL }),
  createCity({ id:'seongnam', name:'성남', englishName:'SEONGNAM', province:'경기도', regionType:'business-core', regionGroup:'capital', status:'planned', headline:'판교와 분당을 중심으로 테크·라이프스타일 소비를 볼 수 있는 도시', keywords:['테크 비즈니스','신도시','라이프스타일','업무 상권'], insights:['직장인 고객 흐름','테크 브랜드 경험','계획도시 소비'], x:35, y:23, accent:CAPITAL }),
  createCity({ id:'goyang', name:'고양', englishName:'GOYANG', province:'경기도', regionType:'business-core', regionGroup:'capital', status:'planned', headline:'전시, 콘텐츠, 생활권 소비가 만나는 수도권 확장 도시', keywords:['전시 콘텐츠','생활권','목적형 방문','가족 소비'], insights:['행사 유입 전환','생활 상권 연결','목적지 경험'], x:27, y:17, accent:CAPITAL }),
  createCity({ id:'yongin', name:'용인', englishName:'YONGIN', province:'경기도', regionType:'provincial-core', regionGroup:'capital', status:'planned', headline:'신도시 생활권과 가족 중심 소비 흐름을 관찰할 수 있는 도시', keywords:['신도시','가족 고객','생활 서비스','체류 소비'], insights:['생활권 고객 이해','가족 경험 설계','반복 소비 구조'], x:35, y:28, accent:CAPITAL }),

  createCity({ id:'chuncheon', name:'춘천', englishName:'CHUNCHEON', province:'강원특별자치도', regionType:'tourism-core', regionGroup:'gangwon', status:'planned', headline:'로컬 관광과 청년 창업, 지역 콘텐츠를 함께 볼 수 있는 도시', keywords:['청년 창업','로컬 관광','지역 콘텐츠','수변 상권'], insights:['청년 브랜드 성장','관광과 생활 연결','지역 콘텐츠화'], x:47, y:18, accent:GANGWON }),
  createCity({ id:'wonju', name:'원주', englishName:'WONJU', province:'강원특별자치도', regionType:'provincial-core', regionGroup:'gangwon', status:'coming-soon', headline:'중소도시형 상권과 지역 중심 비즈니스를 관찰할 수 있는 도시', keywords:['중소도시','중심 상권','지역 고객','생활 서비스'], insights:['단골 관계 형성','지역 신뢰 축적','중심 상권 변화'], x:52, y:28, accent:GANGWON }),
  createCity({ id:'gangneung', name:'강릉', englishName:'GANGNEUNG', province:'강원특별자치도', regionType:'tourism-core', regionGroup:'gangwon', status:'coming-soon', headline:'관광, 카페, 로컬 브랜드가 강하게 결합된 동해안 대표 도시', keywords:['카페 상권','로컬 브랜드','해안 관광','체류 콘텐츠'], insights:['카페 목적지화','지역 브랜드 확장','관광 체류 설계'], x:69, y:26, accent:GANGWON }),

  createCity({ id:'daejeon', name:'대전', englishName:'DAEJEON', province:'대전광역시', regionType:'metropolitan', regionGroup:'chungcheong', status:'open', headline:'중부권 비즈니스와 연구·교육 인프라가 만나는 도시', keywords:['연구 도시','교육 인프라','중부권 허브','업무 수요'], insights:['지식 기반 고객','업무 상권 흐름','중부권 연결성'], x:43, y:45, accent:CHUNGCHEONG }),
  createCity({ id:'sejong', name:'세종', englishName:'SEJONG', province:'세종특별자치시', regionType:'metropolitan', regionGroup:'chungcheong', status:'coming-soon', headline:'행정도시의 성장과 신도시 생활 상권을 볼 수 있는 도시', keywords:['행정도시','신도시','생활 상권','성장 도시'], insights:['신규 생활권 형성','직장인 소비 흐름','계획도시 서비스'], x:40, y:41, accent:CHUNGCHEONG }),
  createCity({ id:'cheongju', name:'청주', englishName:'CHEONGJU', province:'충청북도', regionType:'provincial-core', regionGroup:'chungcheong', status:'coming-soon', headline:'충북 생활권 중심 상권과 교육·행정 소비 흐름을 볼 수 있는 도시', keywords:['교육 소비','행정 수요','생활권','중심 상권'], insights:['생활권 중심성','교육 고객 흐름','행정 상권 관찰'], x:47, y:38, accent:CHUNGCHEONG }),
  createCity({ id:'cheonan', name:'천안', englishName:'CHEONAN', province:'충청남도', regionType:'business-core', regionGroup:'chungcheong', status:'coming-soon', headline:'수도권과 충청권이 만나는 교통·생활 상권 도시', keywords:['교통 허브','생활 상권','광역 고객','역세권'], insights:['이동 고객 전환','광역 생활권','역세권 소비 흐름'], x:37, y:34, accent:CHUNGCHEONG }),
  createCity({ id:'asan', name:'아산', englishName:'ASAN', province:'충청남도', regionType:'business-core', regionGroup:'chungcheong', status:'planned', headline:'산업단지와 생활권 소비가 연결되는 성장 도시', keywords:['산업단지','성장 도시','직장인 소비','생활 서비스'], insights:['산업 배후 수요','신규 상권 성장','직장인 생활 동선'], x:32, y:36, accent:CHUNGCHEONG }),
  createCity({ id:'gongju', name:'공주', englishName:'GONGJU', province:'충청남도', regionType:'tourism-core', regionGroup:'chungcheong', status:'planned', headline:'역사문화 자산과 로컬 관광 브랜딩을 관찰할 수 있는 도시', keywords:['역사문화','로컬 관광','지역 서사','문화 브랜드'], insights:['문화 자산 번역','지역 서사 활용','관광 콘텐츠 설계'], x:36, y:45, accent:CHUNGCHEONG }),

  createCity({ id:'gwangju', name:'광주', englishName:'GWANGJU', province:'광주광역시', regionType:'metropolitan', regionGroup:'honam', status:'open', headline:'지역문화와 소비 흐름을 함께 읽을 수 있는 문화 비즈니스 도시', keywords:['지역문화','소비 흐름','문화 콘텐츠','도심 상권'], insights:['문화 기반 경험','지역 소비 맥락','공감 콘텐츠'], x:26, y:69, accent:HONAM }),
  createCity({ id:'jeonju', name:'전주', englishName:'JEONJU', province:'전북특별자치도', regionType:'tourism-core', regionGroup:'honam', status:'open', headline:'로컬 브랜딩과 문화 자산이 강한 대표 관광·상권 도시', keywords:['로컬 브랜딩','문화 자산','골목 콘텐츠','지역 서사'], insights:['지역 자산 상품화','골목 경험 설계','로컬 브랜드 확장'], x:32, y:56, accent:HONAM }),
  createCity({ id:'gunsan', name:'군산', englishName:'GUNSAN', province:'전북특별자치도', regionType:'tourism-core', regionGroup:'honam', status:'planned', headline:'근대문화와 항구도시 콘텐츠를 비즈니스로 읽을 수 있는 도시', keywords:['근대문화','항구도시','공간 재생','도시 콘텐츠'], insights:['근대 자산 재해석','항구 서사 활용','공간 콘텐츠화'], x:25, y:52, accent:HONAM }),
  createCity({ id:'mokpo', name:'목포', englishName:'MOKPO', province:'전라남도', regionType:'tourism-core', regionGroup:'honam', status:'coming-soon', headline:'항구도시와 근대문화, 로컬 콘텐츠를 관찰할 수 있는 도시', keywords:['항구도시','근대문화','로컬 콘텐츠','도시 재생'], insights:['항구 서사 브랜딩','문화 공간 재생','로컬 체류 경험'], x:18, y:77, accent:HONAM, image:'/assets/images/tours/korea/mokpo-business-tour.webp' }),
  createCity({ id:'yeosu', name:'여수', englishName:'YEOSU', province:'전라남도', regionType:'tourism-core', regionGroup:'honam', status:'coming-soon', headline:'바다 관광과 야간경제, 로컬 소비 흐름을 볼 수 있는 도시', keywords:['해양 관광','야간경제','로컬 소비','체류 경험'], insights:['시간대별 소비','해안 상권 흐름','야간 콘텐츠'], x:43, y:79, accent:HONAM, image:'/assets/images/tours/korea/yeosu-business-tour.webp' }),
  createCity({ id:'suncheon', name:'순천', englishName:'SUNCHEON', province:'전라남도', regionType:'tourism-core', regionGroup:'honam', status:'planned', headline:'생태관광과 지역 상권의 연결을 관찰할 수 있는 도시', keywords:['생태관광','지역 상권','지속가능성','체류 콘텐츠'], insights:['자연 자산 활용','생태와 소비 연결','지속가능한 경험'], x:38, y:74, accent:HONAM }),

  createCity({ id:'busan', name:'부산', englishName:'BUSAN', province:'부산광역시', regionType:'metropolitan', regionGroup:'yeongnam', status:'open', headline:'관광 상권과 로컬 상권을 함께 관찰할 수 있는 해양 비즈니스 도시', keywords:['관광 상권','로컬 상권','해양도시','체류 콘텐츠'], insights:['관광·생활 고객 비교','해양 콘텐츠','도시 체류 설계'], x:83, y:72, accent:YEONGNAM, image:'/assets/images/tours/korea/busan-business-tour.webp' }),
  createCity({ id:'daegu', name:'대구', englishName:'DAEGU', province:'대구광역시', regionType:'metropolitan', regionGroup:'yeongnam', status:'open', headline:'지역 기반 자영업과 생활 상권의 밀도를 볼 수 있는 도시', keywords:['자영업','생활 상권','지역 브랜드','단골 고객'], insights:['밀집 상권 경쟁','단골 관계','생활형 브랜드'], x:69, y:56, accent:YEONGNAM }),
  createCity({ id:'ulsan', name:'울산', englishName:'ULSAN', province:'울산광역시', regionType:'metropolitan', regionGroup:'yeongnam', status:'coming-soon', headline:'산업도시의 브랜드 전환과 지역 소비를 관찰할 수 있는 도시', keywords:['산업도시','브랜드 전환','직장인 소비','생활권'], insights:['산업 이미지 전환','배후 소비 수요','생활권 브랜드'], x:84, y:63, accent:YEONGNAM }),
  createCity({ id:'pohang', name:'포항', englishName:'POHANG', province:'경상북도', regionType:'business-core', regionGroup:'yeongnam', status:'coming-soon', headline:'산업도시와 해양 관광이 만나는 경북 동해안 도시', keywords:['산업도시','해양 관광','도시 전환','지역 상권'], insights:['산업과 관광 연결','해안 콘텐츠','도시 이미지 변화'], x:79, y:51, accent:YEONGNAM }),
  createCity({ id:'gyeongju', name:'경주', englishName:'GYEONGJU', province:'경상북도', regionType:'tourism-core', regionGroup:'yeongnam', status:'planned', headline:'역사문화 자산과 관광 브랜딩의 교과서 같은 도시', keywords:['역사문화','관광 브랜딩','문화 자산','체류 경험'], insights:['유산의 현대화','관광 브랜드 설계','문화 체류 경험'], x:77, y:59, accent:YEONGNAM, image:'/assets/images/tours/korea/gyeongju-business-tour.webp' }),
  createCity({ id:'andong', name:'안동', englishName:'ANDONG', province:'경상북도', regionType:'tourism-core', regionGroup:'yeongnam', status:'planned', headline:'전통문화와 지역 브랜드, 콘텐츠 관광을 볼 수 있는 도시', keywords:['전통문화','지역 브랜드','콘텐츠 관광','지역 서사'], insights:['전통의 현대적 번역','지역 브랜드 구축','문화 콘텐츠화'], x:67, y:43, accent:YEONGNAM }),
  createCity({ id:'gumi', name:'구미', englishName:'GUMI', province:'경상북도', regionType:'business-core', regionGroup:'yeongnam', status:'planned', headline:'산업단지와 지역 생활상권의 구조를 관찰할 수 있는 도시', keywords:['산업단지','생활 상권','직장인 소비','배후 수요'], insights:['산업 배후 상권','직장인 동선','생활 서비스 구조'], x:59, y:51, accent:YEONGNAM }),
  createCity({ id:'changwon', name:'창원', englishName:'CHANGWON', province:'경상남도', regionType:'business-core', regionGroup:'yeongnam', status:'coming-soon', headline:'산업도시와 생활권 상권이 결합된 경남 대표 도시', keywords:['산업도시','생활권','계획도시','직장인 소비'], insights:['계획도시 동선','산업 배후 소비','생활 상권 구조'], x:69, y:70, accent:YEONGNAM }),
  createCity({ id:'jinju', name:'진주', englishName:'JINJU', province:'경상남도', regionType:'provincial-core', regionGroup:'yeongnam', status:'planned', headline:'교육, 역사, 로컬 상권이 함께 움직이는 서부경남 중심 도시', keywords:['교육 도시','역사문화','로컬 상권','지역 고객'], insights:['교육 수요','역사 자산 활용','서부경남 중심성'], x:55, y:72, accent:YEONGNAM }),
  createCity({ id:'tongyeong', name:'통영', englishName:'TONGYEONG', province:'경상남도', regionType:'tourism-core', regionGroup:'yeongnam', status:'planned', headline:'바다, 예술, 로컬 관광 콘텐츠가 강한 남해안 도시', keywords:['예술 도시','해양 관광','로컬 콘텐츠','체류 경험'], insights:['예술 자산 활용','해양 브랜드','소도시 체류 설계'], x:61, y:80, accent:YEONGNAM }),

  createCity({ id:'jeju', name:'제주', englishName:'JEJU', province:'제주특별자치도', regionType:'metropolitan', regionGroup:'jeju', status:'open', headline:'관광, 로컬 브랜드, 라이프스타일 비즈니스가 결합된 대표 도시', keywords:['로컬 브랜드','라이프스타일','관광 소비','지역 콘텐츠'], insights:['섬 지역 브랜드','라이프스타일 경험','관광·생활 균형'], x:31, y:93, accent:JEJU }),
  createCity({ id:'seogwipo', name:'서귀포', englishName:'SEOGWIPO', province:'제주특별자치도', regionType:'tourism-core', regionGroup:'jeju', status:'planned', headline:'제주 남부 관광과 자연 기반 로컬 비즈니스를 관찰할 수 있는 도시', keywords:['자연 기반','남부 관광','로컬 비즈니스','체류 콘텐츠'], insights:['자연 자산 활용','소규모 브랜드','장기 체류 경험'], x:35, y:97, accent:JEJU })
];

export const defaultRegionalCityId = 'seoul';

export const cityStatusLabels = {
  open: '1차 오픈',
  'coming-soon': '준비 중',
  planned: '확장 후보'
};

export const regionGroupLabels = {
  capital: '수도권', gangwon: '강원권', chungcheong: '충청권',
  honam: '호남권', yeongnam: '영남권', jeju: '제주권'
};
