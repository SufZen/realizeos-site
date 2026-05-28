import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from '@/pages/Home';
import { LegalLayout } from '@/components/layout/LegalLayout';
import { TermsAndConditions } from '@/pages/TermsAndConditions';
import { PrivacyPolicy } from '@/pages/PrivacyPolicy';
import { Accessibility } from '@/pages/Accessibility';
import { CookieBanner } from '@/components/shared/CookieBanner';

const WebinarPresentation = lazy(() => import('@/pages/WebinarPresentation'));
const WebinarBooking = lazy(() => import('@/pages/WebinarBooking'));
const BrandWizardPage = lazy(() => import('@/pages/BrandWizardPage'));
const DesignSystemPage = lazy(() => import('@/pages/DesignSystemPage'));
const GuideHub = lazy(() => import('@/pages/GuideHub'));
const GuideSectionPage = lazy(() => import('@/pages/GuideSectionPage'));

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wizard" element={<BrandWizardPage />} />
        <Route path="/design" element={<DesignSystemPage />} />
        <Route path="/guide" element={<GuideHub />} />
        <Route path="/guide/:sectionId" element={<GuideSectionPage />} />
        <Route path="/webinar/presentation" element={<WebinarPresentation />} />
        <Route path="/webinar/booking" element={<WebinarBooking />} />
        <Route path="/webinar/booking/full" element={<WebinarBooking tier="full" />} />
        {/* Retired routes → redirect */}
        <Route path="/webinar/booking/setup" element={<Navigate to="/#pricing" replace />} />
        <Route path="/webinar/booking/lite" element={<Navigate to="/webinar/booking/full" replace />} />
        {/* Short aliases — shareable URLs */}
        <Route path="/pres" element={<Navigate to="/webinar/presentation" replace />} />
        <Route path="/book" element={<Navigate to="/webinar/booking" replace />} />
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
