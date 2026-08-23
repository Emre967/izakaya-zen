import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Rezervasyon from '@/pages/Rezervasyon'
import '@/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Rezervasyon />
  </StrictMode>,
)
