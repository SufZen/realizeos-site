import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { MobileStickyBar } from '@/components/shared/MobileStickyBar';

export function LegalLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary-foreground flex flex-col">
      <Navbar />
      <main className="flex-1 pt-32 pb-16">
        <div className="container max-w-4xl mx-auto px-4 md:px-6">
          <Outlet />
        </div>
      </main>
      <Footer />
      <MobileStickyBar />
    </div>
  );
}
