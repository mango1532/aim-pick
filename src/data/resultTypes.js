/**
 * 15개 복합 진로유형 결과 데이터
 */
export const resultTypes = {
  MQ: {
    code: 'MQ',
    name: '뚝딱메이커·질문박사형',
    shortName: '호기심 발명가형',
    description: '만들기와 탐구가 함께 강한 학생',
    jobs: ['로봇공학자', '과학수사관', '기계공학자', '발명가'],
    hero: '장영실',
    heroDescription: '장영실은 관찰력과 발명 정신으로 사람들에게 필요한 과학기구를 만든 조선시대 과학자예요.',
    message: '너는 장영실처럼 궁금한 것을 직접 만들고 탐구하는 힘이 있어!',
    video: '/videos/MQ.mp4',
  },
  MA: {
    code: 'MA',
    name: '뚝딱메이커·상상아티스트형',
    shortName: '창의 만들기형',
    description: '손으로 만들고 표현하는 활동을 좋아하는 학생',
    jobs: ['제품디자이너', '건축가', '공예디자이너', '캐릭터모형 제작자'],
    hero: '백남준',
    heroDescription: '백남준은 기술과 예술을 새롭게 연결한 세계적인 미디어 아티스트예요.',
    message: '너는 백남준처럼 새로운 생각을 작품으로 표현하는 힘이 있어!',
    video: '/videos/MA.mp4',
  },
  MH: {
    code: 'MH',
    name: '뚝딱메이커·마음헬퍼형',
    shortName: '따뜻한 실습 도우미형',
    description: '실습을 통해 사람을 돕는 활동을 좋아하는 학생',
    jobs: ['물리치료사', '응급구조사', '스포츠지도자', '특수체육교사'],
    hero: '허준',
    heroDescription: '허준은 사람들의 아픔을 살피고 치료하기 위해 노력한 조선시대의 의학자예요.',
    message: '너는 허준처럼 다른 사람을 살피고 도와주는 따뜻한 힘이 있어!',
    video: '/videos/MH.mp4',
  },
  ML: {
    code: 'ML',
    name: '뚝딱메이커·도전리더형',
    shortName: '현장 해결 리더형',
    description: '현장에서 문제를 해결하고 이끄는 학생',
    jobs: ['스포츠감독', '기술창업가', '현장관리자', '건설프로젝트 매니저'],
    hero: '이순신',
    heroDescription: '이순신은 어려운 상황에서도 책임감과 용기로 사람들을 이끈 리더예요.',
    message: '너는 이순신처럼 현장에서 침착하게 이끄는 힘이 있어!',
    video: '/videos/ML.mp4',
  },
  MP: {
    code: 'MP',
    name: '뚝딱메이커·꼼꼼플래너형',
    shortName: '꼼꼼한 안전관리형',
    description: '정확하게 만들고 관리하는 활동을 좋아하는 학생',
    jobs: ['항공정비사', '안전관리자', '품질관리원', '시설관리 전문가'],
    hero: '김정호',
    heroDescription: '김정호는 우리나라 지도를 꼼꼼하게 만들기 위해 오랫동안 노력한 인물이에요.',
    message: '너는 김정호처럼 자세히 살피고 정확하게 완성하는 힘이 있어!',
    video: '/videos/MP.mp4',
  },
  QA: {
    code: 'QA',
    name: '질문박사·상상아티스트형',
    shortName: '상상 탐구 작가형',
    description: '탐구와 창의적 표현이 함께 강한 학생',
    jobs: ['과학콘텐츠 작가', '데이터시각화 전문가', '게임기획자', '과학일러스트레이터'],
    hero: '윤동주',
    heroDescription: '윤동주는 깊은 생각과 마음을 아름다운 글로 표현한 시인이에요.',
    message: '너는 윤동주처럼 깊이 생각하고 멋지게 표현하는 힘이 있어!',
    video: '/videos/QA.mp4',
  },
  QH: {
    code: 'QH',
    name: '질문박사·마음헬퍼형',
    shortName: '배움 도우미형',
    description: '사람을 이해하고 배움을 돕는 탐구형 학생',
    jobs: ['의사', '심리상담사', '교육연구원', '사회조사분석가'],
    hero: '주시경',
    heroDescription: '주시경은 우리말과 한글을 깊이 연구하고, 많은 사람들이 우리말을 바르게 배우도록 힘쓴 국어학자예요.',
    message: '너는 주시경처럼 궁금한 것을 깊이 탐구하고, 배운 것을 다른 사람에게 알려주는 힘이 있어!',
    video: '/videos/QH.mp4',
  },
  QL: {
    code: 'QL',
    name: '질문박사·도전리더형',
    shortName: '생각하는 전략가형',
    description: '깊이 생각하고 사회를 이끄는 학생',
    jobs: ['AI서비스기획자', '바이오창업가', '기술기획자', '특허전문가'],
    hero: '정도전',
    heroDescription: '정도전은 새로운 나라의 제도와 방향을 깊이 고민하고 설계한 인물이에요.',
    message: '너는 정도전처럼 크게 생각하고 미래를 설계하는 힘이 있어!',
    video: '/videos/QL.mp4',
  },
  QP: {
    code: 'QP',
    name: '질문박사·꼼꼼플래너형',
    shortName: '자료 정리 탐구형',
    description: '자료를 분석하고 체계화하는 학생',
    jobs: ['데이터분석가', '통계연구원', '정보보안전문가', '기상연구원'],
    hero: '김부식',
    heroDescription: '김부식은 역사 자료를 모으고 정리하여 『삼국사기』를 편찬한 고려 시대의 학자예요.',
    message: '너는 김부식처럼 자료를 차근차근 살피고, 중요한 내용을 정리하는 힘이 있어!',
    video: '/videos/QP.mp4',
  },
  AH: {
    code: 'AH',
    name: '상상아티스트·마음헬퍼형',
    shortName: '마음을 움직이는 표현가형',
    description: '표현을 통해 사람의 마음을 움직이는 학생',
    jobs: ['작가', '아동미술교사', '음악치료사', '콘텐츠 크리에이터'],
    hero: '신사임당',
    heroDescription: '신사임당은 섬세한 관찰력과 따뜻한 감성으로 아름다운 작품을 남긴 예술가예요.',
    message: '너는 신사임당처럼 따뜻한 마음을 아름답게 표현하는 힘이 있어!',
    video: '/videos/AH.mp4',
  },
  AL: {
    code: 'AL',
    name: '상상아티스트·도전리더형',
    shortName: '무대 위 기획자형',
    description: '창의적 아이디어를 사람들에게 전하는 학생',
    jobs: ['광고기획자', '공연기획자', '영화감독', '브랜드매니저'],
    hero: '나운규',
    heroDescription: '나운규는 영화로 자신의 생각과 이야기를 사람들에게 전한 예술가예요.',
    message: '너는 나운규처럼 창의적인 생각을 사람들에게 전하는 힘이 있어!',
    video: '/videos/AL.mp4',
  },
  AP: {
    code: 'AP',
    name: '상상아티스트·꼼꼼플래너형',
    shortName: '예술 기록가형',
    description: '예술과 기록·보존 감각이 함께 있는 학생',
    jobs: ['편집디자이너', '큐레이터', '기록물관리사', '문화재보존가'],
    hero: '김정희',
    heroDescription: '김정희는 글씨와 학문, 예술을 깊이 연구하고 자신만의 작품 세계를 만든 인물이에요.',
    message: '너는 김정희처럼 아름다움과 기록을 소중히 여기는 힘이 있어!',
    video: '/videos/AP.mp4',
  },
  HL: {
    code: 'HL',
    name: '마음헬퍼·도전리더형',
    shortName: '공동체 리더형',
    description: '사람을 돕고 공동체를 이끄는 학생',
    jobs: ['교사', '청소년지도사', '교육기획자', '사회적기업가'],
    hero: '김구',
    heroDescription: '김구는 나라와 사람들을 위해 헌신하며 공동체의 미래를 생각한 인물이에요.',
    message: '너는 김구처럼 사람들을 생각하고 함께 이끄는 힘이 있어!',
    video: '/videos/HL.mp4',
  },
  HP: {
    code: 'HP',
    name: '마음헬퍼·꼼꼼플래너형',
    shortName: '책임감 있는 공공도우미형',
    description: '책임감 있게 사람과 제도를 돕는 학생',
    jobs: ['공무원', '학교행정가', '사회복지공무원', '보건행정가'],
    hero: '황희',
    heroDescription: '황희는 백성을 생각하며 오랫동안 나라의 일을 성실하게 살핀 인물이에요.',
    message: '너는 황희처럼 책임감 있게 사람들을 돕는 힘이 있어!',
    video: '/videos/HP.mp4',
  },
  LP: {
    code: 'LP',
    name: '도전리더·꼼꼼플래너형',
    shortName: '목표 달성 운영자형',
    description: '목표를 세우고 조직을 운영하는 학생',
    jobs: ['경영컨설턴트', '회계사', '세무사', '행정관리자'],
    hero: '왕건',
    heroDescription: '왕건은 여러 사람을 모으고 큰 목표를 세워 나라를 이끈 인물이에요.',
    message: '너는 왕건처럼 목표를 세우고 사람들과 함께 이루는 힘이 있어!',
    video: '/videos/LP.mp4',
  },
}

/** 15개 유형 코드 목록 */
export const RESULT_CODES = Object.keys(resultTypes)

/**
 * 결과 유형별 영상 경로 반환
 * resultTypes.video 우선, 없으면 /videos/{code}.mp4 fallback
 */
export function getVideoSrc(resultData) {
  if (!resultData) return null
  if (resultData.video) return resultData.video
  if (resultData.code) return `/videos/${resultData.code}.mp4`
  return null
}

/** 기본 유형 정보 */
export const BASE_TYPES = {
  M: { label: '뚝딱메이커형', color: '#FF8A9A', emoji: '🔧' },
  Q: { label: '질문박사형', color: '#7DB7FF', emoji: '🔍' },
  A: { label: '상상아티스트형', color: '#FFD166', emoji: '🎨' },
  H: { label: '마음헬퍼형', color: '#8EDBC5', emoji: '💚' },
  L: { label: '도전리더형', color: '#C9A0FF', emoji: '⭐' },
  P: { label: '꼼꼼플래너형', color: '#FFB347', emoji: '📋' },
}
