/**
 * 아이엠픽 연령별 버전 설정
 * TEEN = 기존 48문항 (questions.js)
 */
export const VERSIONS = {
  mini: {
    id: 'mini',
    label: 'MINI',
    emoji: '🌱',
    title: '재미있는 진로놀이',
    subtitle: '그림을 보며 나에게 맞는 활동을 찾아봐요!',
    count: 12,
    duration: '약 3분',
    audience: '유아',
    mode: 'choice',
  },
  kids: {
    id: 'kids',
    label: 'KIDS',
    emoji: '🌈',
    title: '나의 진로 찾기',
    subtitle: '내가 좋아하는 것과 잘하는 것을 알아봐요!',
    count: 24,
    duration: '약 5분',
    audience: '초등학생',
    mode: 'scale',
  },
  teen: {
    id: 'teen',
    label: 'TEEN',
    emoji: '🚀',
    title: '나의 진로 자세히 알아보기',
    subtitle: '나의 성향을 더 자세히 알아보고 미래 직업을 찾아봐요!',
    count: 48,
    duration: '약 10분',
    audience: '중학생',
    mode: 'scale',
  },
}

export const VERSION_LIST = Object.values(VERSIONS)
