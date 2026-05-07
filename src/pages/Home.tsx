import { useState, useEffect } from 'react';
import { Navbar } from '@/components/sections/Navbar';
import { Hero } from '@/components/sections/Hero';
import { PainPoints } from '@/components/sections/PainPoints';
import { GithubDemo } from '@/components/sections/GithubDemo';
import { FabricSystem } from '@/components/sections/FabricSystem';
import { Features } from '@/components/sections/Features';
import { Founder } from '@/components/sections/Founder';
import { UseCases } from '@/components/sections/UseCases';
import { GetStarted } from '@/components/sections/GetStarted';
import { CommunityDocs } from '@/components/sections/CommunityDocs';
import { FAQ } from '@/components/sections/FAQ';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { Footer } from '@/components/sections/Footer';
import { ExitIntentPopup } from '@/components/shared/ExitIntentPopup';
import { MobileStickyBar } from '@/components/shared/MobileStickyBar';
import { BrandWizard } from '@/components/wizard/BrandWizard';

export function Home() {
  const [wizardOpen, setWizardOpen] = useState(false);

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
        <Hero />
        <PainPoints />
        <GithubDemo />
        <FabricSystem />
        <Features />
        <Founder />
        <UseCases />
        <GetStarted />
        <CommunityDocs />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <ExitIntentPopup />
      <MobileStickyBar />
      <BrandWizard open={wizardOpen} onOpenChange={setWizardOpen} />
    </>
  );
}
