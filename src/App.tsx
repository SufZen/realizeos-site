import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '@/pages/Home';
import { LegalLayout } from '@/components/layout/LegalLayout';
import { TermsAndConditions } from '@/pages/TermsAndConditions';
import { PrivacyPolicy } from '@/pages/PrivacyPolicy';
import { Accessibility } from '@/pages/Accessibility';
import { CookieBanner } from '@/components/shared/CookieBanner';

// Webinar pages (src/pages/WebinarPresentation.tsx, WebinarBooking.tsx) are kept
// in the repo but hidden for now; their routes redirect home. Registration for the
// October 2026 webinar lives on realization.world/webinar.
const BrandWizardPage = lazy(() => import('@/pages/BrandWizardPage'));
const DesignSystemPage = lazy(() => import('@/pages/DesignSystemPage'));
const GuideHub = lazy(() => import('@/pages/GuideHub'));
const GuideSectionPage = lazy(() => import('@/pages/GuideSectionPage'));
const Workshops = lazy(() => import('@/pages/Workshops'));

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/workshops" element={<Workshops />} />
        <Route path="/wizard" element={<BrandWizardPage />} />
        <Route path="/design" element={<DesignSystemPage />} />
        <Route path="/guide" element={<GuideHub />} />
        <Route path="/guide/:sectionId" element={<GuideSectionPage />} />
        {/* Retired or hidden routes → redirect */}
        <Route path="/bootcamp" element={<Navigate to="/workshops" replace />} />
        <Route path="/webinar/*" element={<Navigate to="/" replace />} />
        {/* Legacy static HTML pages — deleted, redirect to React routes */}
        <Route path="/guide.html" element={<Navigate to="/guide" replace />} />
        <Route path="/guide-full.html" element={<Navigate to="/guide" replace />} />
        <Route path="/guide-lite.html" element={<Navigate to="/guide" replace />} />
        <Route path="/setup.html" element={<Navigate to="/#pricing" replace />} />
        <Route path="/thank-you.html" element={<Navigate to="/" replace />} />
        <Route path="/venture-worksheet.html" element={<Navigate to="/wizard" replace />} />
        {/* Short aliases — shareable URLs */}
        <Route path="/pres" element={<Navigate to="/" replace />} />
        <Route path="/book" element={<Navigate to="/#pricing" replace />} />
        <Route path="/event" element={<Navigate to="/workshops" replace />} />
        <Route path="/brand-wizard" element={<Navigate to="/wizard" replace />} />
        <Route element={<LegalLayout />}>
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/accessibility" element={<Accessibility />} />
        </Route>
      </Routes>
      <CookieBanner />
    </>
  );
}
