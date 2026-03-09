import { Section } from '@/components/layout/Section';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll';
import { PackageLite } from '@/components/illustrations/PackageLite';
import { PackageFull } from '@/components/illustrations/PackageFull';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

export function Delivery() {
  const { t } = useTranslation();

  const cols = [
    {
      edition: t('delivery.models.lite.edition'),
      emotionalPromise: t('delivery.models.lite.emotionalPromise'),
      items: (t('delivery.models.lite.items', { returnObjects: true }) as Array<{ title: string; description: string }>),
    },
    {
      featured: true,
      edition: t('delivery.models.full.edition'),
      emotionalPromise: t('delivery.models.full.emotionalPromise'),
      includesNote: t('delivery.models.full.includesNote'),
      items: (t('delivery.models.full.items', { returnObjects: true }) as Array<{ title: string; description: string }>),
    }
  ];

  return (
    <Section id="delivery">
      <SectionHeader
        title={t('delivery.header.title')}
        subtitle={t('delivery.header.subtitle')}
      />
      <div className="grid gap-6 md:grid-cols-2">
        {cols.map((col, i) => (
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
              <p className="mb-6 text-base text-muted-foreground">{col.emotionalPromise}</p>

              {col.includesNote && (
                <p className="mb-4 text-sm font-medium text-brand-yellow">{col.includesNote}</p>
              )}

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="technical-specs" className="border-none">
                  <AccordionTrigger className="justify-start gap-2 py-2 text-sm font-semibold text-brand-yellow hover:no-underline">
                    View Technical Details
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pt-4">
                      {col.items.map((item) => (
                        <div key={item.title}>
                          <strong className="text-sm">{item.title}</strong>
                          <p className="mt-0.5 text-sm text-muted-foreground">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </AnimateOnScroll>
        ))}
      </div>
      <AnimateOnScroll delay={0.3}>
        <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-muted-foreground">
          {t('delivery.note')}
        </p>
      </AnimateOnScroll>
    </Section>
  );
}
