import { Section } from '@/components/layout/Section';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll';
import { PackageLite } from '@/components/illustrations/PackageLite';
import { PackageFull } from '@/components/illustrations/PackageFull';
import { deliveryColumns, deliveryNote } from '@/data/delivery';
import { cn } from '@/lib/utils';

export function Delivery() {
  return (
    <Section id="delivery">
      <SectionHeader
        title="What You Actually Get"
        subtitle="No vaporware. No locked content. Here's exactly what arrives when you purchase."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {deliveryColumns.map((col, i) => (
          <AnimateOnScroll key={col.edition} delay={i * 0.15}>
            <div
              className={cn(
                'glass-card h-full rounded-xl p-6',
                col.featured && 'ring-1 ring-brand-yellow/20'
              )}
            >
              {col.featured ? (
                <PackageFull className="mx-auto mb-4 h-16 w-16" />
              ) : (
                <PackageLite className="mx-auto mb-4 h-16 w-16" />
              )}
              <h3 className="mb-4 text-xl font-bold">{col.edition}</h3>
              {col.includesNote && (
                <p className="mb-4 text-sm font-medium text-brand-yellow">{col.includesNote}</p>
              )}
              <div className="space-y-4">
                {col.items.map((item) => (
                  <div key={item.title}>
                    <strong className="text-sm">{item.title}</strong>
                    <p className="mt-0.5 text-sm text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimateOnScroll>
        ))}
      </div>
      <AnimateOnScroll delay={0.3}>
        <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-muted-foreground">
          {deliveryNote}
        </p>
      </AnimateOnScroll>
    </Section>
  );
}
