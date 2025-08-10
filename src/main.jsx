import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './Router/Router'
import AuthProvider from './AuthProvider/AuthProvider'
import ThemeProvider from './ThemeProvider/ThemeProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router}>

        </RouterProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)
