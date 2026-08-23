import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import BigDataQuiz from './components/BigDataQuiz.jsx'
import './styles/global.css'
import './styles/printableResult.css'

const params = new URLSearchParams(window.location.search)
const showBigDataQuiz =
  window.location.pathname.replace(/\/+$/, '') === '/bigdata-quiz' ||
  params.get('quiz') === 'bigdata'

function Root() {
  const [quizOpen, setQuizOpen] = useState(showBigDataQuiz)

  if (quizOpen) {
    return (
      <BigDataQuiz
        onExit={showBigDataQuiz ? undefined : () => setQuizOpen(false)}
      />
    )
  }

  return <App onOpenBigDataQuiz={() => setQuizOpen(true)} />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
