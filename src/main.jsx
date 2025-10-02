import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './shadcn.css'
import './styles/integra.css'
import App from './App.tsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
