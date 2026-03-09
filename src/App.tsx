import { useState } from 'react';
import { Navbar } from '@/components/sections/Navbar';
import { Hero } from '@/components/sections/Hero';
import { PainPoints } from '@/components/sections/PainPoints';
import { DemoVideo } from '@/components/sections/DemoVideo';
import { FabricSystem } from '@/components/sections/FabricSystem';
import { Features } from '@/components/sections/Features';
import { UseCases } from '@/components/sections/UseCases';
import { Pricing } from '@/components/sections/Pricing';
import { Comparison } from '@/components/sections/Comparison';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { Delivery } from '@/components/sections/Delivery';
import { Testimonials } from '@/components/sections/Testimonials';
import { FAQ } from '@/components/sections/FAQ';
import { Founder } from '@/components/sections/Founder';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { Footer } from '@/components/sections/Footer';
import { ExitIntentPopup } from '@/components/shared/ExitIntentPopup';
import { MobileStickyBar } from '@/components/shared/MobileStickyBar';
import { BrandWizard } from '@/components/wizard/BrandWizard';

export default function App() {
  const [wizardOpen, setWizardOpen] = useState(false);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Founder />
        <PainPoints />
        <DemoVideo />
        <FabricSystem />
        <Features />
        <UseCases />
        <Pricing />
        <Comparison />
        <HowItWorks onOpenWizard={() => setWizardOpen(true)} />
        <Delivery />
        <Testimonials />
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
