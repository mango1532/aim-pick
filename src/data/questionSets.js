import { questions as teenQuestions } from './questions'
import { questionsKids } from './questionsKids'
import { questionsMini } from './questionsMini'
import { VERSIONS } from './versions'

/** 버전 ID로 문항 목록 반환 */
export function getQuestionsByVersion(versionId) {
  switch (versionId) {
    case VERSIONS.mini.id:
      return questionsMini
    case VERSIONS.kids.id:
      return questionsKids
    case VERSIONS.teen.id:
      return teenQuestions
    default:
      return teenQuestions
  }
}
