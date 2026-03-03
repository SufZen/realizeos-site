import { Section } from '@/components/layout/Section';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll';
import { ProductMockup } from '@/components/illustrations';

export function DemoVideo() {
  return (
    <Section id="demo">
      <SectionHeader
        title="See It in Action"
        subtitle="Watch how RealizeOS turns a single message into coordinated agent work — from your knowledge base, in your brand voice."
      />
      <AnimateOnScroll>
        <div className="glass-card glow-yellow mx-auto max-w-3xl rounded-2xl">
          <ProductMockup className="w-full rounded-xl" />
          <div className="flex flex-col items-center pb-4 pt-2">
            <p className="text-muted-foreground">Demo video coming soon</p>
            <span className="mt-1 text-sm text-muted-foreground/60">3 min walkthrough</span>
          </div>
        </div>
      </AnimateOnScroll>
    </Section>
  );
}
