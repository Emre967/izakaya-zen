import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Hakkimizda from '@/pages/Hakkimizda'
import '@/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Hakkimizda />
  </StrictMode>,
)
