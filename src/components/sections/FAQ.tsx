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

const stripHtml = (html: string) => html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

export function FAQ() {
  const { t, i18n } = useTranslation();
  const faqList: { question: string, answer: string }[] = t('faq.items', { returnObjects: true }) as { question: string, answer: string }[];

  // FAQPage structured data for the English FAQ (the canonical, indexed version).
  const jsonLd = i18n.resolvedLanguage === 'en' && Array.isArray(faqList)
    ? JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqList.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: stripHtml(item.answer) },
        })),
      }).replace(/</g, String.fromCharCode(92) + 'u003c') // keep '</script>' out of the JSON
    : null;

  return (
    <Section id="faq">
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />}
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
                  className="prose prose-sm prose-invert max-w-none text-muted-foreground [&_a]:text-brand-yellow [&_a]:underline"
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
