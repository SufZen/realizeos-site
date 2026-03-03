import { Section } from '@/components/layout/Section';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll';
import { GlowCard } from '@/components/shared/GlowCard';
import { AvatarPlaceholder } from '@/components/illustrations/AvatarPlaceholder';
import { testimonials, testimonialsNote } from '@/data/testimonials';

export function Testimonials() {
  return (
    <Section id="testimonials">
      <SectionHeader title="What Early Users Say" />
      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <AnimateOnScroll key={t.authorName} delay={i * 0.1}>
            <GlowCard className="flex h-full flex-col">
              <p className="flex-1 text-sm italic text-muted-foreground">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="mt-4 flex items-center gap-3 border-t border-border pt-4">
                <AvatarPlaceholder initials={t.initials} size={40} className="h-10 w-10" />
                <div>
                  <div className="text-sm font-semibold">{t.authorName}</div>
                  <div className="text-xs text-muted-foreground">{t.authorRole}</div>
                </div>
              </div>
            </GlowCard>
          </AnimateOnScroll>
        ))}
      </div>
      <p className="mt-8 text-center text-sm text-muted-foreground">{testimonialsNote}</p>
    </Section>
  );
}
