import { Routes, Route } from 'react-router-dom';
import { Home } from '@/pages/Home';
import { LegalLayout } from '@/components/layout/LegalLayout';
import { TermsAndConditions } from '@/pages/TermsAndConditions';
import { PrivacyPolicy } from '@/pages/PrivacyPolicy';
import { Accessibility } from '@/pages/Accessibility';
import { CookieBanner } from '@/components/shared/CookieBanner';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
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
