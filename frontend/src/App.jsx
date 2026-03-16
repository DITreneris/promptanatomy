import { Routes, Route, Navigate } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import SeoHead from './components/SeoHead'
import HomePage from './pages/HomePage'
import SuccessPage from './pages/SuccessPage'
import CancelPage from './pages/CancelPage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'

export default function App() {
  return (
    <>
      <SeoHead />
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
      <Analytics />
    </>
  )
}
