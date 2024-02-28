import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { Toaster } from 'sonner'
import { Routers } from './routes'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Routers />
    <Toaster />
  </React.StrictMode>,
)
