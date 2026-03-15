import { useTranslation } from 'react-i18next';
import { Section } from '@/components/layout/Section';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll';
import { GlowCard } from '@/components/shared/GlowCard';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

export function CaseStudies() {
    const { t } = useTranslation();

    const studies = [
        {
            title: t('caseStudies.items.boa.title'),
            industry: t('caseStudies.items.boa.industry'),
            metric: t('caseStudies.items.boa.metric'),
            quote: t('caseStudies.items.boa.quote'),
            technical: t('caseStudies.items.boa.technical'),
        },
        {
            title: t('caseStudies.items.burtucala.title'),
            industry: t('caseStudies.items.burtucala.industry'),
            metric: t('caseStudies.items.burtucala.metric'),
            quote: t('caseStudies.items.burtucala.quote'),
            technical: t('caseStudies.items.burtucala.technical'),
        },
        {
            title: t('caseStudies.items.realization.title'),
            industry: t('caseStudies.items.realization.industry'),
            metric: t('caseStudies.items.realization.metric'),
            quote: t('caseStudies.items.realization.quote'),
            technical: t('caseStudies.items.realization.technical'),
        },
    ];

    return (
        <Section id="case-studies">
            <SectionHeader
                title={t('caseStudies.header.title')}
                subtitle={t('caseStudies.header.subtitle')}
            />

            <div className="mt-12 grid gap-6 md:grid-cols-3">
                {studies.map((cs) => (
                    <AnimateOnScroll key={cs.title}>
                        <GlowCard className="flex h-full flex-col">
                            {/* Industry badge */}
                            <span className="mb-3 inline-block w-fit rounded-full border border-brand-yellow/20 bg-brand-yellow/5 px-3 py-1 text-xs font-medium text-brand-yellow">
                                {cs.industry}
                            </span>

                            {/* Title */}
                            <h3 className="mb-2 text-lg font-semibold text-foreground">
                                {cs.title}
                            </h3>

                            {/* Metric highlight */}
                            <div className="mb-4 text-2xl font-bold text-brand-yellow">
                                {cs.metric}
                            </div>

                            {/* Emotional quote */}
                            <blockquote className="mb-4 flex-1 border-s-2 border-brand-yellow/20 ps-4 text-sm italic text-muted-foreground">
                                &ldquo;{cs.quote}&rdquo;
                            </blockquote>

                            {/* Technical accordion */}
                            <Accordion type="single" collapsible>
                                <AccordionItem value="tech" className="border-border/50">
                                    <AccordionTrigger className="pt-2 pb-2 text-xs text-muted-foreground hover:text-brand-yellow">
                                        {t('caseStudies.howItWorks')}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-xs leading-relaxed text-muted-foreground/80">
                                        {cs.technical}
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </GlowCard>
                    </AnimateOnScroll>
                ))}
            </div>
        </Section>
    );
}
