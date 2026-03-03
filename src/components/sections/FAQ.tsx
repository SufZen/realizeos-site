import { Section } from '@/components/layout/Section';
import { SectionHeader } from '@/components/layout/SectionHeader';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { faqItems } from '@/data/faq';
import { trackEvent } from '@/lib/analytics';

export function FAQ() {
  return (
    <Section id="faq">
      <SectionHeader title="Frequently Asked Questions" />
      <div className="mx-auto max-w-2xl">
        <Accordion type="single" collapsible>
          {faqItems.map((item, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger
                className="text-left text-sm font-medium"
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
