import { Section } from '@/components/layout/Section';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll';
import { GlowCard } from '@/components/shared/GlowCard';
import { caseStudies } from '@/data/case-studies';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

export function CaseStudies() {
    return (
        <Section id="case-studies">
            <SectionHeader
                title="From the Ecosystem That Built It"
                subtitle="These aren't hypothetical scenarios — they are live operations running on the same engine you're about to deploy."
            />

            <div className="mt-12 grid gap-6 md:grid-cols-3">
                {caseStudies.map((cs) => (
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
                            <blockquote className="mb-4 flex-1 border-l-2 border-brand-yellow/20 pl-4 text-sm italic text-muted-foreground">
                                &ldquo;{cs.quote}&rdquo;
                            </blockquote>

                            {/* Technical accordion */}
                            <Accordion type="single" collapsible>
                                <AccordionItem value="tech" className="border-white/5">
                                    <AccordionTrigger className="pt-2 pb-2 text-xs text-muted-foreground hover:text-brand-yellow">
                                        How It Works Technically
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
