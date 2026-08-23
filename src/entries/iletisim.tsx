import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Iletisim from '@/pages/Iletisim'
import '@/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Iletisim />
  </StrictMode>,
)
