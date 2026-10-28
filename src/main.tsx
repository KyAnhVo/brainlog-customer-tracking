import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from '@/routeTree.gen'

import './index.css'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

const router = createRouter({ routeTree })

// This is what makes Link/navigate fully type-aware across your app:
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const theme = createTheme(
  {
    palette: { mode: 'light' },
    typography: {
      fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
      h1: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, letterSpacing: '-0.02em' },
      h2: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, letterSpacing: '-0.015em' },
      h3: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600, letterSpacing: '-0.01em' },
      h4: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600 },
      h5: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600 },
      h6: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600 },
      subtitle1: { fontFamily: '"Inter", sans-serif', fontWeight: 500 },
      subtitle2: { fontFamily: '"Inter", sans-serif', fontWeight: 500 },
      body1: { fontFamily: '"Inter", sans-serif', fontWeight: 400 },
      body2: { fontFamily: '"Inter", sans-serif', fontWeight: 400 },
      button: { fontFamily: '"Inter", sans-serif', fontWeight: 600, textTransform: 'none' },
      caption: { fontFamily: '"Inter", sans-serif', fontWeight: 500, letterSpacing: '0.02em' },
      overline: { fontFamily: '"Inter", sans-serif', fontWeight: 600, letterSpacing: '0.08em' },
    },
  }
)

async function enableMocking() {
  if (!import.meta.env.DEV) return
  const { worker } = await import('./mocks/browser')
  return worker.start({ onUnhandledRequest: 'bypass' })
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </StrictMode>,
  )
})
