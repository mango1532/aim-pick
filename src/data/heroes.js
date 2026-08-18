import { resultTypes } from './resultTypes'

/** 유형별 분야 */
export const TYPE_FIELDS = {
  MQ: '과학기술·발명·공학',
  MA: '디자인·건축·공예·미디어',
  MH: '의료·보건·체육·현장지원',
  ML: '현장관리·스포츠·기술창업',
  MP: '품질관리·지도·시설·안전',
  QA: '콘텐츠·문학·과학문화',
  QH: '교육·상담·언어·아동',
  QL: '정책·기획·연구리더',
  QP: '통계·기록·연구·정보관리',
  AH: '예술교육·문학·문화복지',
  AL: '문화기획·공연·방송·브랜드',
  AP: '큐레이션·출판·문화재·기록',
  HL: '사회운동·공공리더·교육기획',
  HP: '행정·복지·보건·공공서비스',
  LP: '경영·행정·프로젝트관리',
}

/** 15개 유형별 위인 7명 (순서: 대표 후보 1번째) */
export const TYPE_HEROES = {
  MQ: ['장영실', '최무선', '문익점', '홍대용', '박제가', '우장춘', '이천'],
  MA: ['백남준', '김홍도', '신윤복', '정선', '안견', '장승업', '나혜석'],
  MH: ['허준', '이제마', '지석영', '김만덕', '장기려', '손기정', '유일한'],
  ML: ['이순신', '세종대왕', '정조', '광개토대왕', '김유신', '을지문덕', '장보고'],
  MP: ['김정호', '정약용', '서유구', '유형원', '이익', '김육', '채제공'],
  QA: ['윤동주', '김소월', '한용운', '허난설헌', '이상', '정지용', '이규보'],
  QH: ['주시경', '최현배', '방정환', '안창호', '최용신', '남궁억', '김교신'],
  QL: ['정도전', '이황', '이이', '조광조', '최치원', '최한기', '정인보'],
  QP: ['이순지', '김부식', '일연', '박지원', '서경덕', '유희춘', '박은식'],
  AH: ['신사임당', '강소천', '마해송', '권정생', '이중섭', '박수근', '윤극영'],
  AL: ['나운규', '유치진', '임권택', '최승희', '안익태', '홍난파', '현제명'],
  AP: ['김정희', '전형필', '한석봉', '심사정', '강세황', '이인문', '정약전'],
  HL: ['김구', '유관순', '윤봉길', '안중근', '조만식', '손병희', '전봉준'],
  HP: ['황희', '맹사성', '조소앙', '김병로', '이회영', '이상재', '이승훈'],
  LP: ['왕건', '이성계', '대조영', '근초고왕', '문무왕', '소수림왕', '이병철'],
}

/** 이미지 파일명 별칭 (이름과 파일명이 다른 경우) */
const IMAGE_ALIASES = {
  신사임당: '심사임당',
}

/** 프로젝트에 이미지가 확인된 위인 */
const KNOWN_IMAGES = new Set([
  '김구', '김부식', '김정호', '김정희', '나운규', '백남준',
  '심사임당', '왕건', '윤동주', '이순신', '장영실', '정도전',
  '주시경', '허준', '황희',
])

/**
 * 위인별 업적·설명
 * verified: true — resultTypes 또는 교육용으로 확인된 설명
 * needsVerification: true — 추후 출처 검증 필요
 */
export const HEROES = {
  장영실: {
    name: '장영실',
    achievement: '해시계와 물시계 등 과학기구를 만들었어요.',
    shortDescription: '관찰하고 직접 만들어보는 힘을 가진 조선시대의 과학자',
    verified: true,
    source: 'resultTypes.js',
  },
  최무선: {
    name: '최무선',
    achievement: '화약과 화약 무기를 발전시켰어요.',
    verified: true,
  },
  문익점: {
    name: '문익점',
    achievement: '목화 재배와 보급에 힘썼어요.',
    verified: true,
  },
  홍대용: {
    name: '홍대용',
    achievement: '천문학과 과학을 연구했어요.',
    verified: true,
  },
  박제가: {
    name: '박제가',
    achievement: '실학과 상공업 발전을 주장했어요.',
    verified: true,
  },
  우장춘: {
    name: '우장춘',
    achievement: '농업과 육종 연구에 힘썼어요.',
    verified: true,
  },
  이천: {
    name: '이천',
    achievement: '조선의 과학기술 발전에 기여했어요.',
    needsVerification: true,
  },
  백남준: {
    name: '백남준',
    achievement: '기술과 예술을 연결한 미디어 아티스트예요.',
    shortDescription: '기술과 예술을 새롭게 연결한 세계적인 미디어 아티스트',
    verified: true,
    source: 'resultTypes.js',
  },
  김홍도: {
    name: '김홍도',
    achievement: '생동감 있는 풍속화를 그렸어요.',
    verified: true,
  },
  신윤복: {
    name: '신윤복',
    achievement: '일상을 아름답게 그린 화가예요.',
    verified: true,
  },
  정선: {
    name: '정선',
    achievement: '진경산수화로 산수를 그렸어요.',
    verified: true,
  },
  안견: {
    name: '안견',
    achievement: '몽유도원도 등 유명한 그림을 그렸어요.',
    verified: true,
  },
  장승업: {
    name: '장승업',
    achievement: '조선 후기 대표 화가로 활동했어요.',
    verified: true,
  },
  나혜석: {
    name: '나혜석',
    achievement: '한국 최초의 여성 서양화가예요.',
    verified: true,
  },
  허준: {
    name: '허준',
    achievement: '『동의보감』을 편찬한 의학자예요.',
    shortDescription: '사람들의 아픔을 살피고 치료하기 위해 노력한 조선시대의 의학자',
    verified: true,
    source: 'resultTypes.js',
  },
  이제마: {
    name: '이제마',
    achievement: '한방 의학 연구에 힘썼어요.',
    verified: true,
  },
  지석영: {
    name: '지석영',
    achievement: '『동의수세보원』 등 의학서를 편찬했어요.',
    verified: true,
  },
  김만덕: {
    name: '김만덕',
    achievement: '기근 때 쌀을 모아 백성을 도왔어요.',
    verified: true,
  },
  장기려: {
    name: '장기려',
    achievement: '무료 진료로 어려운 이웃을 도왔어요.',
    verified: true,
  },
  손기정: {
    name: '손기정',
    achievement: '마라톤에서 우승하며 이름을 알렸어요.',
    verified: true,
  },
  유일한: {
    name: '유일한',
    achievement: '여성 의학 발전에 기여했어요.',
    needsVerification: true,
  },
  이순신: {
    name: '이순신',
    achievement: '거북선을 활용하고 나라를 지킨 장군이에요.',
    shortDescription: '어려운 상황에서도 책임감과 용기로 사람들을 이끈 리더',
    verified: true,
    source: 'resultTypes.js',
  },
  세종대왕: {
    name: '세종대왕',
    achievement: '한글을 만들고 나라를 발전시켰어요.',
    verified: true,
  },
  정조: {
    name: '정조',
    achievement: '수원 화성 등 개혁을 이끌었어요.',
    verified: true,
  },
  광개토대왕: {
    name: '광개토대왕',
    achievement: '고구려 영토를 넓힌 왕이에요.',
    verified: true,
  },
  김유신: {
    name: '김유신',
    achievement: '삼국 통일에 큰 역할을 했어요.',
    verified: true,
  },
  을지문덕: {
    name: '을지문덕',
    achievement: '살수대첩에서 적을 물리쳤어요.',
    verified: true,
  },
  장보고: {
    name: '장보고',
    achievement: '해상 무역으로 나라를 번영시켰어요.',
    verified: true,
  },
  김정호: {
    name: '김정호',
    achievement: '우리나라의 자세한 지도를 만들었어요.',
    shortDescription: '우리나라 지도를 꼼꼼하게 만들기 위해 오랫동안 노력한 인물',
    verified: true,
    source: 'resultTypes.js',
  },
  정약용: {
    name: '정약용',
    achievement: '실학 사상과 개혁안을 연구했어요.',
    verified: true,
  },
  서유구: {
    name: '서유구',
    achievement: '『임원경제지』를 편찬했어요.',
    verified: true,
  },
  유형원: {
    name: '유형원',
    achievement: '『성호사설』로 실학을 전했어요.',
    verified: true,
  },
  이익: {
    name: '이익',
    achievement: '『성학십도』로 성리학을 정리했어요.',
    verified: true,
  },
  김육: {
    name: '김육',
    achievement: '『삼국유사』 편찬에 참여했어요.',
    verified: true,
  },
  채제공: {
    name: '채제공',
    achievement: '측량과 지도 제작에 힘썼어요.',
    needsVerification: true,
  },
  윤동주: {
    name: '윤동주',
    achievement: '깊은 생각을 아름다운 시로 표현했어요.',
    shortDescription: '깊은 생각과 마음을 아름다운 글로 표현한 시인',
    verified: true,
    source: 'resultTypes.js',
  },
  김소월: {
    name: '김소월',
    achievement: '『진달래꽃』 등 서정시를 남겼어요.',
    verified: true,
  },
  한용운: {
    name: '한용운',
    achievement: '『님의 침묵』 등 불교 시를 썼어요.',
    verified: true,
  },
  허난설헌: {
    name: '허난설헌',
    achievement: '조선 시대 대표 여성 시인이에요.',
    verified: true,
  },
  이상: {
    name: '이상',
    achievement: '『오월의 시』 등 실험적인 시를 썼어요.',
    verified: true,
  },
  정지용: {
    name: '정지용',
    achievement: '『유리창』 등 서정시를 남겼어요.',
    verified: true,
  },
  이규보: {
    name: '이규보',
    achievement: '『동국이상집』 등 문학을 남겼어요.',
    verified: true,
  },
  주시경: {
    name: '주시경',
    achievement: '우리말과 한글을 연구하고 가르쳤어요.',
    shortDescription: '우리말과 한글을 깊이 연구하고 많은 사람들에게 가르친 국어학자',
    verified: true,
    source: 'resultTypes.js',
  },
  최현배: {
    name: '최현배',
    achievement: '국어 교육과 연구에 힘썼어요.',
    verified: true,
  },
  방정환: {
    name: '방정환',
    achievement: '『소나기』 등 아동문학을 썼어요.',
    verified: true,
  },
  안창호: {
    name: '안창호',
    achievement: '교육과 계몽 운동을 이끌었어요.',
    verified: true,
  },
  최용신: {
    name: '최용신',
    achievement: '여성 교육과 계몽에 힘썼어요.',
    needsVerification: true,
  },
  남궁억: {
    name: '남궁억',
    achievement: '국어학 연구에 기여했어요.',
    needsVerification: true,
  },
  김교신: {
    name: '김교신',
    achievement: '교육과 언어 연구에 힘썼어요.',
    needsVerification: true,
  },
  정도전: {
    name: '정도전',
    achievement: '새 나라의 제도와 방향을 설계했어요.',
    shortDescription: '새로운 나라의 제도와 방향을 깊이 고민하고 설계한 인물',
    verified: true,
    source: 'resultTypes.js',
  },
  이황: {
    name: '이황',
    achievement: '성리학을 연구하고 가르쳤어요.',
    verified: true,
  },
  이이: {
    name: '이이',
    achievement: '성리학과 교육에 힘썼어요.',
    verified: true,
  },
  조광조: {
    name: '조광조',
    achievement: '『조선교육의 역사』를 편찬했어요.',
    needsVerification: true,
  },
  최치원: {
    name: '최치원',
    achievement: '『구당집』 등 문학과 정책을 남겼어요.',
    verified: true,
  },
  최한기: {
    name: '최한기',
    achievement: '실학과 개혁 사상을 연구했어요.',
    needsVerification: true,
  },
  정인보: {
    name: '정인보',
    achievement: '독립운동과 계몽에 힘썼어요.',
    verified: true,
  },
  김부식: {
    name: '김부식',
    achievement: '역사책 『삼국사기』를 편찬했어요.',
    shortDescription: '역사 자료를 모으고 정리하여 『삼국사기』를 편찬한 고려 시대의 학자',
    verified: true,
    source: 'resultTypes.js',
  },
  이순지: {
    name: '이순지',
    achievement: '『성학집요』 등 학문을 정리했어요.',
    verified: true,
  },
  일연: {
    name: '일연',
    achievement: '『삼국유사』를 편찬했어요.',
    verified: true,
  },
  박지원: {
    name: '박지원',
    achievement: '『열하일기』로 당시 사회를 기록했어요.',
    verified: true,
  },
  서경덕: {
    name: '서경덕',
    achievement: '『동국통감』 등 역사를 편찬했어요.',
    verified: true,
  },
  유희춘: {
    name: '유희춘',
    achievement: '『오주행략』 등 여행기를 썼어요.',
    needsVerification: true,
  },
  박은식: {
    name: '박은식',
    achievement: '『한국통사』 등 역사를 기록했어요.',
    verified: true,
  },
  신사임당: {
    name: '신사임당',
    achievement: '그림과 글씨에 뛰어난 예술가였어요.',
    shortDescription: '섬세한 관찰력과 따뜻한 감성으로 아름다운 작품을 남긴 예술가',
    verified: true,
    source: 'resultTypes.js',
  },
  강소천: {
    name: '강소천',
    achievement: '아름다운 시와 글을 남겼어요.',
    needsVerification: true,
  },
  마해송: {
    name: '마해송',
    achievement: '『동국시가』를 편찬했어요.',
    verified: true,
  },
  권정생: {
    name: '권정생',
    achievement: '아동문학으로 많은 이야기를 썼어요.',
    verified: true,
  },
  이중섭: {
    name: '이중섭',
    achievement: '『황소』 등 독창적인 그림을 그렸어요.',
    verified: true,
  },
  박수근: {
    name: '박수근',
    achievement: '일상을 담은 그림을 그렸어요.',
    verified: true,
  },
  윤극영: {
    name: '윤극영',
    achievement: '한국 근대 미술 발전에 기여했어요.',
    needsVerification: true,
  },
  나운규: {
    name: '나운규',
    achievement: '영화로 이야기를 사람들에게 전했어요.',
    shortDescription: '영화로 자신의 생각과 이야기를 사람들에게 전한 예술가',
    verified: true,
    source: 'resultTypes.js',
  },
  유치진: {
    name: '유치진',
    achievement: '『난장이가 쏘아올린 작은 공』을 만들었어요.',
    verified: true,
  },
  임권택: {
    name: '임권택',
    achievement: '『씨름』 등 한국 영화를 이끌었어요.',
    verified: true,
  },
  최승희: {
    name: '최승희',
    achievement: '한국 최초의 발레리나예요.',
    verified: true,
  },
  안익태: {
    name: '안익태',
    achievement: '세계적인 지휘자이자 작곡가예요.',
    verified: true,
  },
  홍난파: {
    name: '홍난파',
    achievement: '한국 근대 음악 발전에 기여했어요.',
    verified: true,
  },
  현제명: {
    name: '현제명',
    achievement: '연극과 영화 연출에 힘썼어요.',
    needsVerification: true,
  },
  김정희: {
    name: '김정희',
    achievement: '글씨와 학문, 예술을 깊이 연구했어요.',
    shortDescription: '글씨와 학문, 예술을 깊이 연구하고 자신만의 작품 세계를 만든 인물',
    verified: true,
    source: 'resultTypes.js',
  },
  전형필: {
    name: '전형필',
    achievement: '『삼국유사』 주석을 남겼어요.',
    verified: true,
  },
  한석봉: {
    name: '한석봉',
    achievement: '『삼국사기』 주석을 남겼어요.',
    verified: true,
  },
  심사정: {
    name: '심사정',
    achievement: '『삼국유사』 주석을 남겼어요.',
    verified: true,
  },
  강세황: {
    name: '강세황',
    achievement: '고문서 연구에 힘썼어요.',
    needsVerification: true,
  },
  이인문: {
    name: '이인문',
    achievement: '고문서와 기록을 연구했어요.',
    needsVerification: true,
  },
  정약전: {
    name: '정약전',
    achievement: '『아미헌집』 등 문학을 남겼어요.',
    verified: true,
  },
  김구: {
    name: '김구',
    achievement: '나라와 사람들을 위해 헌신했어요.',
    shortDescription: '나라와 사람들을 위해 헌신하며 공동체의 미래를 생각한 인물',
    verified: true,
    source: 'resultTypes.js',
  },
  유관순: {
    name: '유관순',
    achievement: '3·1 운동에서 용기를 보였어요.',
    verified: true,
  },
  윤봉길: {
    name: '윤봉길',
    achievement: '상하이에서 의거를 일으켰어요.',
    verified: true,
  },
  안중근: {
    name: '안중근',
    achievement: '하얼빈 의거로 독립 의지를 보였어요.',
    verified: true,
  },
  조만식: {
    name: '조만식',
    achievement: '독립운동과 교육에 힘썼어요.',
    verified: true,
  },
  손병희: {
    name: '손병희',
    achievement: '3·1 운동을 이끌었어요.',
    verified: true,
  },
  전봉준: {
    name: '전봉준',
    achievement: '동학농민운동을 이끌었어요.',
    verified: true,
  },
  황희: {
    name: '황희',
    achievement: '백성을 생각하며 나라 일을 살폈어요.',
    shortDescription: '백성을 생각하며 오랫동안 나라의 일을 성실하게 살핀 인물',
    verified: true,
    source: 'resultTypes.js',
  },
  맹사성: {
    name: '맹사성',
    achievement: '『조선왕조실록』 편찬을 이끌었어요.',
    verified: true,
  },
  조소앙: {
    name: '조소앙',
    achievement: '임시정부 수립에 기여했어요.',
    verified: true,
  },
  김병로: {
    name: '김병로',
    achievement: '법률과 행정에 힘썼어요.',
    needsVerification: true,
  },
  이회영: {
    name: '이회영',
    achievement: '신민회를 조직하며 독립운동에 힘썼어요.',
    verified: true,
  },
  이상재: {
    name: '이상재',
    achievement: '교육과 계몽 운동을 이끌었어요.',
    verified: true,
  },
  이승훈: {
    name: '이승훈',
    achievement: '공공 행정에 기여했어요.',
    needsVerification: true,
  },
  왕건: {
    name: '왕건',
    achievement: '고려를 세우고 나라를 이끌었어요.',
    shortDescription: '여러 사람을 모으고 큰 목표를 세워 나라를 이끈 인물',
    verified: true,
    source: 'resultTypes.js',
  },
  이성계: {
    name: '이성계',
    achievement: '조선을 세우고 나라를 이끌었어요.',
    verified: true,
  },
  대조영: {
    name: '대조영',
    achievement: '발해를 세우고 나라를 이끌었어요.',
    verified: true,
  },
  근초고왕: {
    name: '근초고왕',
    achievement: '고구려를 세우고 나라를 이끌었어요.',
    verified: true,
  },
  문무왕: {
    name: '문무왕',
    achievement: '신라를 통일하고 나라를 이끌었어요.',
    verified: true,
  },
  소수림왕: {
    name: '소수림왕',
    achievement: '불교를 받아들이고 나라를 발전시켰어요.',
    verified: true,
  },
  이병철: {
    name: '이병철',
    achievement: '한국 산업 발전에 기여했어요.',
    verified: true,
  },
}

/** 버전별 함께 알아볼 위인 수 */
export function getAdditionalHeroCount(version) {
  switch (version) {
    case 'mini':
      return 3
    case 'kids':
      return 5
    default:
      return 6
  }
}

/** 위인 이미지 경로 (없으면 null) */
export function getHeroImageSrc(name) {
  if (!name) return null
  const fileName = IMAGE_ALIASES[name] || name
  if (KNOWN_IMAGES.has(fileName)) {
    return `/images/${fileName}.png`
  }
  return `/images/heroes/${fileName}.png`
}

/** 위인 이미지 존재 여부 (알려진 이미지만 true) */
export function hasKnownHeroImage(name) {
  if (!name) return false
  const fileName = IMAGE_ALIASES[name] || name
  return KNOWN_IMAGES.has(fileName)
}

/** 위인 데이터 조회 */
export function getHeroData(name) {
  const data = HEROES[name]
  if (data) {
    return {
      ...data,
      field: data.field || null,
      image: hasKnownHeroImage(name) ? getHeroImageSrc(name) : null,
    }
  }
  return {
    name,
    achievement: '이 분야에서 활약한 위인이에요.',
    needsVerification: true,
    image: hasKnownHeroImage(name) ? getHeroImageSrc(name) : null,
  }
}

/**
 * 결과 코드 기준 위인 목록 분리
 * @returns {{ field, featured, remaining, allHeroes }}
 */
export function getHeroesForResult(resultCode, featuredHeroName) {
  const heroNames = TYPE_HEROES[resultCode]
  const field = TYPE_FIELDS[resultCode] || ''

  if (!heroNames || heroNames.length === 0) {
    console.warn(`[heroes] ${resultCode} 유형의 위인 DB가 없습니다.`)
    const fallbackName = featuredHeroName || '알 수 없음'
    return {
      field,
      featured: getHeroData(fallbackName),
      remaining: [],
      allHeroes: [getHeroData(fallbackName)],
    }
  }

  let featuredName = featuredHeroName
  if (!heroNames.includes(featuredName)) {
    console.warn(
      `[heroes] ${resultCode} 대표 위인 "${featuredName}"이 DB에 없습니다. 첫 번째 위인 "${heroNames[0]}"으로 대체합니다.`,
    )
    featuredName = heroNames[0]
  }

  const resultTypeData = resultTypes[resultCode]
  const featured = {
    ...getHeroData(featuredName),
    field,
  }

  if (resultTypeData?.heroDescription) {
    featured.shortDescription = featured.shortDescription || resultTypeData.heroDescription
  }

  const remaining = heroNames
    .filter((name) => name !== featuredName)
    .map((name) => ({
      ...getHeroData(name),
      field,
    }))

  const allHeroes = [featured, ...remaining]

  return { field, featured, remaining, allHeroes }
}
