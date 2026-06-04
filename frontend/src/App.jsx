import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { capturePosthogPageview, isPosthogEnabled } from './analytics/posthog'
import SeoHead from './components/SeoHead'
import XPixel from './components/XPixel'
import HomePage from './pages/HomePage'

const SuccessPage = lazy(() => import('./pages/SuccessPage'))
const CancelPage = lazy(() => import('./pages/CancelPage'))
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'))
const TermsPage = lazy(() => import('./pages/TermsPage'))

/**
 * Vercel Web Analytics: pass route + path from React Router so each SPA navigation
 * records a pageview. Plain <Analytics /> relies on the injected script's auto history
 * hook, which can miss navigations after stack upgrades (React 19 / Vite 8). Passing
 * route sets disableAutoTrack in the SDK and drives pageview() from location changes.
 */
export default function App() {
  const location = useLocation()
  const pathname = location.pathname

  useEffect(() => {
    if (!isPosthogEnabled()) return
    capturePosthogPageview()
  }, [pathname, location.search])

  return (
    <>
      <SeoHead />
      <XPixel />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage forceLocale="en" />} />
          <Route path="/lt" element={<HomePage forceLocale="lt" />} />
          <Route path="/en" element={<HomePage forceLocale="en" />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/cancel" element={<CancelPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <Analytics route={pathname} path={pathname} />
    </>
  )
}
