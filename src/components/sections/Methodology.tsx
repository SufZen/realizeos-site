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

export function Methodology() {
    const { t } = useTranslation();

    const pillars = [
        {
            icon: '◇',
            title: t('methodology.pillars.space.title'),
            promise: t('methodology.pillars.space.promise'),
            technical: t('methodology.pillars.space.technical'),
        },
        {
            icon: '◈',
            title: t('methodology.pillars.business.title'),
            promise: t('methodology.pillars.business.promise'),
            technical: t('methodology.pillars.business.technical'),
        },
        {
            icon: '◆',
            title: t('methodology.pillars.story.title'),
            promise: t('methodology.pillars.story.promise'),
            technical: t('methodology.pillars.story.technical'),
        },
    ] as const;

    return (
        <Section id="methodology">
            <SectionHeader
                title={t('methodology.header.title')}
                subtitle={t('methodology.header.subtitle')}
            />

            <div className="mt-12 grid gap-6 md:grid-cols-3">
                {pillars.map((pillar, i) => (
                    <AnimateOnScroll key={pillar.title} delay={i * 0.1}>
                        <GlowCard className="flex h-full flex-col text-center">
                            {/* Icon */}
                            <div className="mb-4 text-4xl text-brand-yellow">
                                {pillar.icon}
                            </div>

                            {/* Title */}
                            <h3 className="mb-3 text-xl font-bold text-foreground">
                                {pillar.title}
                            </h3>

                            {/* Emotional promise */}
                            <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                                {pillar.promise}
                            </p>

                            {/* Technical accordion */}
                            <Accordion type="single" collapsible>
                                <AccordionItem value="tech" className="border-white/5">
                                    <AccordionTrigger className="justify-center pt-2 pb-2 text-xs text-muted-foreground hover:text-brand-yellow">
                                        Under the Hood
                                    </AccordionTrigger>
                                    <AccordionContent className="text-start text-xs leading-relaxed text-muted-foreground/80">
                                        {pillar.technical}
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </GlowCard>
                    </AnimateOnScroll>
                ))}
            </div>

            {/* Connecting visual — three dots with lines */}
            <div className="mx-auto mt-10 flex max-w-xs items-center justify-center gap-0">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-brand-yellow/20" />
                <div className="mx-2 h-2 w-2 rotate-45 bg-brand-yellow/30" />
                <div className="h-px flex-1 bg-gradient-to-r from-brand-yellow/20 via-brand-yellow/30 to-brand-yellow/20" />
                <div className="mx-2 h-2 w-2 rotate-45 bg-brand-yellow/40" />
                <div className="h-px flex-1 bg-gradient-to-r from-brand-yellow/20 via-brand-yellow/30 to-brand-yellow/20" />
                <div className="mx-2 h-2 w-2 rotate-45 bg-brand-yellow/30" />
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-brand-yellow/20" />
            </div>

            <p className="mx-auto mt-6 max-w-lg text-center text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: t('methodology.footer') }} />
        </Section>
    );
}
