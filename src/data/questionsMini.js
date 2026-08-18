import { getMiniImagePath } from './miniImages'

/**
 * MINI 버전 12문항
 * - situation: 상황/질문 (화면 상단 핑크색)
 * - text: 추가 질문 (있을 때만 표시)
 * - image: public/images/mini/01.jpg ~ 12.jpg 자동 연결
 */
const MINI_QUESTIONS_RAW = [
  {
    id: 1, type: 'M',
    situation: '장난감 상자에서 블록과 로봇을 발견했어요!',
    text: '나는 무엇을 하고 싶을까요?',
    imagePrompt: '귀여운 2D 동화풍. 어린이가 블록을 조립해 작은 로봇을 만드는 장면.',
    choices: [
      { score: 5, emoji: '🧱', label: '블록으로 로봇 만들기' },
      { score: 2, emoji: '🎨', label: '그림 그리기' },
      { score: 2, emoji: '🔍', label: '곤충 찾아보기' },
      { score: 2, emoji: '👫', label: '친구와 놀기' },
    ],
  },
  {
    id: 2, type: 'M',
    situation: '놀이 시간이에요!',
    text: '나는 무엇을 하고 싶을까요?',
    imagePrompt: '귀여운 2D 동화풍. 어린이가 놀이터에서 활동적인 놀이를 하는 장면.',
    choices: [
      { score: 5, emoji: '🛝', label: '미끄럼틀 타기' },
      { score: 2, emoji: '⚽', label: '공놀이 하기' },
      { score: 2, emoji: '🎨', label: '그림 그리기' },
      { score: 2, emoji: '📖', label: '책 읽기' },
    ],
  },
  {
    id: 3, type: 'M',
    situation: '장난감 자동차가 움직이지 않아요.',
    text: '나는 어떻게 할까요?',
    imagePrompt: '귀여운 2D 동화풍. 어린이가 장난감 자동차를 고치는 장면.',
    choices: [
      { score: 5, emoji: '🔧', label: '직접 고쳐보기' },
      { score: 2, emoji: '👩', label: '어른에게 부탁하기' },
      { score: 2, emoji: '🎮', label: '다른 장난감 가져오기' },
      { score: 2, emoji: '😴', label: '그냥 쉬기' },
    ],
  },
  {
    id: 4, type: 'M',
    situation: '새로운 물건을 발견했어요!',
    text: '나는 무엇을 하고 싶을까요?',
    imagePrompt: '귀여운 2D 동화풍. 어린이가 작은 드론을 신기하게 바라보는 장면.',
    choices: [
      { score: 5, emoji: '🤖', label: '어떻게 움직이는지 알아보기' },
      { score: 2, emoji: '🎨', label: '그림으로 그리기' },
      { score: 2, emoji: '👫', label: '친구에게 보여주기' },
      { score: 2, emoji: '📦', label: '상자에 넣어두기' },
    ],
  },
  {
    id: 5, type: 'Q',
    situation: '공원에서 이상한 것을 발견했어요!',
    text: '나는 무엇을 하고 싶을까요?',
    imagePrompt: '귀여운 2D 동화풍. 어린이가 돋보기로 곤충을 관찰하는 장면.',
    choices: [
      { score: 5, emoji: '🔍', label: '곤충 자세히 보기' },
      { score: 2, emoji: '🌸', label: '꽃 구경하기' },
      { score: 2, emoji: '🏃', label: '뛰어놀기' },
      { score: 2, emoji: '🍦', label: '간식 먹기' },
    ],
  },
  {
    id: 6, type: 'Q',
    situation: '"왜 그럴까?" 궁금한 일이 생겼어요.',
    text: '나는 어떻게 할까요?',
    imagePrompt: '귀여운 2D 동화풍. 어린이가 물음표와 함께 생각하는 장면.',
    choices: [
      { score: 5, emoji: '💡', label: '끝까지 알아보기' },
      { score: 2, emoji: '🤷', label: '그냥 넘어가기' },
      { score: 2, emoji: '🎨', label: '그림 그리기' },
      { score: 2, emoji: '🎮', label: '놀기' },
    ],
  },
  {
    id: 7, type: 'A',
    situation: '친구들과 함께 멋진 이야기를 만들어 볼까요?',
    text: '',
    imagePrompt: '귀여운 2D 동화풍. 어린이가 친구들과 함께 이야기를 만드는 장면.',
    choices: [
      { score: 5, emoji: '✏️', label: '이야기 그리기' },
      { score: 2, emoji: '📖', label: '책 읽기' },
      { score: 2, emoji: '🧱', label: '블록 쌓기' },
      { score: 2, emoji: '👫', label: '친구와 놀기' },
    ],
  },
  {
    id: 8, type: 'A',
    situation: '색연필과 스케치북 그리고 악기가 있어요.',
    text: '나는 무엇을 하고 싶을까요?',
    imagePrompt: '귀여운 2D 동화풍. 어린이가 스케치북에 그림을 그리거나 악기를 연주하는 장면.',
    choices: [
      { score: 5, emoji: '🎨', label: '그림 그리기' },
      { score: 4, emoji: '🎵', label: '음악 연주하기' },
      { score: 2, emoji: '📦', label: '정리하기' },
      { score: 2, emoji: '😴', label: '쉬기' },
    ],
  },
  {
    id: 9, type: 'H',
    situation: '친구가 속상해하고 있어요.',
    text: '나는 어떻게 할까요?',
    imagePrompt: '귀여운 2D 동화풍. 어린이가 친구를 위로하는 장면.',
    choices: [
      { score: 5, emoji: '🤗', label: '친구를 위로해요' },
      { score: 2, emoji: '🎮', label: '같이 놀자고 해요' },
      { score: 2, emoji: '👩‍🏫', label: '선생님께 말해요' },
      { score: 2, emoji: '👀', label: '조용히 지켜봐요' },
    ],
  },
  {
    id: 10, type: 'H',
    situation: '동생이 혼자 놀고 있어요.',
    text: '나는 어떻게 할까요?',
    imagePrompt: '귀여운 2D 동화풍. 어린이가 동생과 함께 놀아주는 장면.',
    choices: [
      { score: 5, emoji: '🧸', label: '함께 놀아줘요' },
      { score: 2, emoji: '📱', label: '혼자 놀아요' },
      { score: 2, emoji: '🎨', label: '그림을 그려요' },
      { score: 2, emoji: '🏃', label: '밖에 나가요' },
    ],
  },
  {
    id: 11, type: 'L',
    situation: '친구들과 놀이를 시작하려고 해요.',
    text: '나는 어떤 역할을 할까요?',
    imagePrompt: '귀여운 2D 동화풍. 어린이가 친구들 앞에서 앞장서는 장면.',
    choices: [
      { score: 5, emoji: '🌟', label: '앞장서서 이끌어요' },
      { score: 2, emoji: '👫', label: '친구를 따라가요' },
      { score: 2, emoji: '👀', label: '지켜보며 생각해요' },
      { score: 2, emoji: '🎨', label: '그림을 그려요' },
    ],
  },
  {
    id: 12, type: 'P',
    situation: '장난감을 정리할 시간이 됐어요.',
    text: '나는 어떻게 할까요?',
    imagePrompt: '귀여운 2D 동화풍. 어린이가 장난감을 깔끔하게 정리하는 장면.',
    choices: [
      { score: 5, emoji: '📦', label: '깔끔하게 정리해요' },
      { score: 2, emoji: '🏃', label: '빨리 나가고 싶어요' },
      { score: 2, emoji: '🎮', label: '조금 더 놀고 싶어요' },
      { score: 2, emoji: '🎨', label: '그림을 그려요' },
    ],
  },
]

export const questionsMini = MINI_QUESTIONS_RAW.map((q) => ({
  ...q,
  image: getMiniImagePath(q.id),
}))
