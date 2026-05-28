import { useState, useEffect, lazy, Suspense } from 'react';
import { Navbar } from '@/components/sections/Navbar';
import { Hero } from '@/components/sections/Hero';
import { PainPoints } from '@/components/sections/PainPoints';
import { GithubDemo } from '@/components/sections/GithubDemo';
import { Footer } from '@/components/sections/Footer';
import { ExitIntentPopup } from '@/components/shared/ExitIntentPopup';
import { MobileStickyBar } from '@/components/shared/MobileStickyBar';
import { VentureWizardPopup } from '@/components/shared/VentureWizardPopup';

/* Below-the-fold sections — lazy-loaded for faster initial paint */
const FabricSystem = lazy(() => import('@/components/sections/FabricSystem').then(m => ({ default: m.FabricSystem })));
const Features = lazy(() => import('@/components/sections/Features').then(m => ({ default: m.Features })));
const Founder = lazy(() => import('@/components/sections/Founder').then(m => ({ default: m.Founder })));
const UseCases = lazy(() => import('@/components/sections/UseCases').then(m => ({ default: m.UseCases })));
const GetStarted = lazy(() => import('@/components/sections/GetStarted').then(m => ({ default: m.GetStarted })));
const CommunityDocs = lazy(() => import('@/components/sections/CommunityDocs').then(m => ({ default: m.CommunityDocs })));
const FAQ = lazy(() => import('@/components/sections/FAQ').then(m => ({ default: m.FAQ })));
const Roadmap = lazy(() => import('@/components/sections/Roadmap').then(m => ({ default: m.Roadmap })));
const FinalCTA = lazy(() => import('@/components/sections/FinalCTA').then(m => ({ default: m.FinalCTA })));
const BrandWizard = lazy(() => import('@/components/wizard/BrandWizard').then(m => ({ default: m.BrandWizard })));

export function Home() {
  const [wizardOpen, setWizardOpen] = useState(false);
  const [venturePopupOpen, setVenturePopupOpen] = useState(false);

  // Auto-open old wizard when /?openWizard=1 is used (fallback from AI wizard)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('openWizard') === '1') {
      setTimeout(() => setWizardOpen(true), 0);
      // Clean up URL
      window.history.replaceState({}, '', '/');
    }
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero onOpenVentureWizard={() => setVenturePopupOpen(true)} />
        <PainPoints />
        <GithubDemo />
        <Suspense>
          <FabricSystem />
          <Features />
          <Founder />
          <UseCases />
          <GetStarted />
          <CommunityDocs />
          <FAQ />
          <Roadmap />
          <FinalCTA onOpenVentureWizard={() => setVenturePopupOpen(true)} />
        </Suspense>
      </main>
      <Footer />
      <ExitIntentPopup />
      <MobileStickyBar />
      <VentureWizardPopup open={venturePopupOpen} onOpenChange={setVenturePopupOpen} />
      <Suspense>
        <BrandWizard open={wizardOpen} onOpenChange={setWizardOpen} />
      </Suspense>
    </>
  );
}
