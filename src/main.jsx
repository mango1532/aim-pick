import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import BigDataQuiz from './components/BigDataQuiz.jsx'
import './styles/global.css'
import './styles/printableResult.css'

const params = new URLSearchParams(window.location.search)
const showBigDataQuiz =
  window.location.pathname.replace(/\/+$/, '') === '/bigdata-quiz' ||
  params.get('quiz') === 'bigdata'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {showBigDataQuiz ? <BigDataQuiz /> : <App />}
  </StrictMode>,
)
