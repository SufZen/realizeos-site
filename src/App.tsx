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

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/webinar/presentation" element={<WebinarPresentation />} />
        <Route path="/webinar/booking" element={<WebinarBooking />} />
        <Route path="/webinar/booking/setup" element={<WebinarBooking tier="setup" />} />
        <Route path="/webinar/booking/lite" element={<WebinarBooking tier="lite" />} />
        <Route path="/webinar/booking/full" element={<WebinarBooking tier="full" />} />
        {/* Short aliases — shareable URLs */}
        <Route path="/pres" element={<Navigate to="/webinar/presentation" replace />} />
        <Route path="/book" element={<Navigate to="/webinar/booking" replace />} />
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
