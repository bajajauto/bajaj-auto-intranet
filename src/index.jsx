import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'

/*
 * The router sits outside App so that every provider inside it — the auth
 * context above all — can navigate. Sign-in is a redirect flow: Entra returns
 * the browser to a real URL, and something has to be able to route it onwards.
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
