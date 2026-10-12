import { StrictMode, Suspense } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@/components/theme/ThemeProvider'
import './index.css'
import i18n from './i18n'
import App from './App.tsx'
import { isLocalizedPage, splitLangPath } from '@/seo/lang'

const app = (
  <StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <ThemeProvider defaultTheme="dark">
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Suspense>
  </StrictMode>
)

// On pages that exist in every language (/, /workshops, /he, /pt/...) the URL decides the language.
const { lang, base } = splitLangPath(window.location.pathname)
const ready = isLocalizedPage(base)
  ? i18n.changeLanguage(lang)
  : new Promise<void>((resolve) => (i18n.isInitialized ? resolve() : i18n.on('initialized', () => resolve())))

const root = document.getElementById('root')!

// Start once translations are loaded, so the first render matches the prerendered HTML.
void Promise.resolve(ready).finally(() => {
  if (root.hasChildNodes()) {
    // Prerendered page (scripts/prerender.mjs): attach to the existing markup.
    hydrateRoot(root, app)
  } else {
    createRoot(root).render(app)
  }
})
