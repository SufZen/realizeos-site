import { Section } from '@/components/layout/Section';
import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll';
import { FounderPhotoFrame } from '@/components/illustrations/FounderPhotoFrame';
import { Separator } from '@/components/ui/separator';
import { LINKS } from '@/lib/constants';

export function Founder() {
  return (
    <Section id="founder">
      <AnimateOnScroll>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-gradient-yellow mb-6 text-3xl font-bold md:text-4xl">
            Built from Real Operations
          </h2>
          <p className="text-muted-foreground">
            RealizeOS isn't a concept or a demo. It was extracted from a production system running{' '}
            <strong className="text-foreground">
              4 AI bots across 3 business ventures
            </strong>{' '}
            — processing real messages, managing real brand voices, executing real workflows, every
            day.
          </p>
          <p className="mt-4 text-muted-foreground">
            I built this because I needed it. Managing multiple ventures with disconnected AI tools
            was unsustainable. So I built a coordinated system — and now you can use the same engine
            for your own operations.
          </p>
          <FounderPhotoFrame className="mx-auto mb-4 h-24 w-24" />
          <Separator className="mx-auto my-6 w-16" />
          <div>
            <strong>Asaf Eyzenkot</strong>
            <div className="text-sm text-muted-foreground">
              Founder,{' '}
              <a
                href={LINKS.realization}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-yellow hover:underline"
              >
                Realization
              </a>
            </div>
            <div className="mt-2 flex items-center justify-center gap-4 text-sm">
              <a
                href={LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-brand-yellow"
              >
                LinkedIn
              </a>
              <a
                href={LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-brand-yellow"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </AnimateOnScroll>
    </Section>
  );
}
