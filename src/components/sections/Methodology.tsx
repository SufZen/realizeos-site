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

const pillars = [
    {
        icon: '◇',
        title: 'Space',
        promise:
            'Every great venture begins with a space — physical or digital. We help you define the boundaries, the flow, and the structure of your operations so nothing is accidental.',
        technical:
            'The FABRIC Foundations layer maps your operational topology: team roles, tool integrations, communication flows, and knowledge repositories. This creates a spatial model that AI agents traverse to understand context and authority.',
    },
    {
        icon: '◈',
        title: 'Business',
        promise:
            'Strategy without execution is a slideshow. We translate your vision into coordinated AI operations that compound revenue, automate growth, and free you from the middleware.',
        technical:
            'The Agents and Routines layers encode your business logic: pricing models, compliance checks, market analysis workflows, client communication sequences, and vendor coordination. Each process becomes a repeatable, testable, improvable AI skill.',
    },
    {
        icon: '◆',
        title: 'Story',
        promise:
            'Your brand voice, your authority, your narrative — amplified across every channel without you writing a single draft. The system speaks as you, because it learned from you.',
        technical:
            'The Brand and Creations layers hold your voice identity (vocabulary, tone, formatting rules, examples). Every output — LinkedIn post, proposal, investor update — runs through a quality-assurance agent that enforces brand consistency before delivery.',
    },
] as const;

export function Methodology() {
    return (
        <Section id="methodology">
            <SectionHeader
                title="Space. Business. Story."
                subtitle="The Realization Framework — a proven methodology for building AI-powered ventures that feel human and perform like machines."
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
                                    <AccordionContent className="text-left text-xs leading-relaxed text-muted-foreground/80">
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

            <p className="mx-auto mt-6 max-w-lg text-center text-sm text-muted-foreground">
                Built from a decade of hands-on architecture, real estate, and venture work.
                <br />
                Now encoded into an AI engine you can deploy in days.
            </p>
        </Section>
    );
}
