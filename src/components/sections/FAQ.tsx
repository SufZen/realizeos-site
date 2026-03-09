import { Section } from '@/components/layout/Section';
import { SectionHeader } from '@/components/layout/SectionHeader';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useTranslation } from 'react-i18next';
import { trackEvent } from '@/lib/analytics';

export function FAQ() {
  const { t } = useTranslation();
  const faqList: { question: string, answer: string }[] = t('faq.items', { returnObjects: true }) as { question: string, answer: string }[];

  return (
    <Section id="faq">
      <SectionHeader title={t('faq.title')} />
      <div className="mx-auto max-w-2xl">
        <Accordion type="single" collapsible>
          {faqList.map((item, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger
                className="text-start text-sm font-medium"
                onClick={() =>
                  trackEvent('faq_open', {
                    question: item.question.substring(0, 50),
                  })
                }
              >
                {item.question}
              </AccordionTrigger>
              <AccordionContent>
                <div
                  className="prose prose-sm prose-invert max-w-none text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: item.answer }}
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}
