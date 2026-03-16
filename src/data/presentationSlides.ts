export type SlideLayout =
  | 'title'
  | 'title-body'
  | 'two-column'
  | 'list'
  | 'feature-card'
  | 'pricing-card'
  | 'quote'
  | 'stat'
  | 'demo'
  | 'qa';

export interface SlideItem {
  titleKey?: string;
  descKey?: string;
  title?: string;
  desc?: string;
}

export interface Slide {
  id: string;
  layout: SlideLayout;
  block: string;
  titleKey?: string;
  subtitleKey?: string;
  bodyKeys?: string[];
  listKeys?: string[];
  items?: SlideItem[];
  speakerNotes?: string;
  customData?: Record<string, string>;
}

export function getSlides(): Slide[] {
  return [
    // ===== OPENING BLOCK (slides 1-5) =====
    {
      id: 'welcome',
      layout: 'title',
      block: 'opening',
      titleKey: 'hero.title_highlight',
      subtitleKey: 'hero.tagline',
      speakerNotes: 'Welcome everyone. Introduce yourself and the Realization Group.',
    },
    {
      id: 'agenda',
      layout: 'list',
      block: 'opening',
      titleKey: 'webinar.presentation.agenda',
      listKeys: [
        'painPoints.header.title',
        'features.header.title',
        'webinar.presentation.liveDemo',
        'delivery.models.lite.edition',
        'webinar.useCases.sectionTitle',
        'pricing.header.title',
      ],
      speakerNotes: 'Walk through what we will cover today. ~1 hour presentation + 30 min Q&A.',
    },
    {
      id: 'who-is-this-for',
      layout: 'list',
      block: 'opening',
      titleKey: 'webinar.presentation.whoIsThisFor',
      listKeys: [
        'webinar.presentation.whoIsThisForItems.0',
        'webinar.presentation.whoIsThisForItems.1',
        'webinar.presentation.whoIsThisForItems.2',
        'webinar.presentation.whoIsThisForItems.3',
      ],
      speakerNotes: 'Identify the audience. Ask people to raise hands / react in chat.',
    },
    {
      id: 'founder-story',
      layout: 'title-body',
      block: 'opening',
      titleKey: 'founder.title',
      bodyKeys: ['founder.p1'],
      speakerNotes: 'Personal story. Why you built this. Credibility through production use.',
    },
    {
      id: 'founder-why',
      layout: 'quote',
      block: 'opening',
      titleKey: 'founder.p2',
      speakerNotes: 'Emotional hook. The alternative was breaking down. This is real, not theoretical.',
    },

    // ===== PROBLEM BLOCK (slides 6-10) =====
    {
      id: 'problem-intro',
      layout: 'title',
      block: 'problem',
      titleKey: 'painPoints.header.title',
      subtitleKey: 'painPoints.header.subtitle',
      speakerNotes: 'Transition to the problem. Paint the picture of current AI tool chaos.',
    },
    {
      id: 'pain-friction',
      layout: 'title-body',
      block: 'problem',
      titleKey: 'painPoints.items.layers.title',
      bodyKeys: ['painPoints.items.layers.description'],
      speakerNotes: 'The Friction Trap. Ideas die in handoffs. Ask: "Who has experienced this?"',
    },
    {
      id: 'pain-paralysis',
      layout: 'title-body',
      block: 'problem',
      titleKey: 'painPoints.items.clock.title',
      bodyKeys: ['painPoints.items.clock.description'],
      speakerNotes: 'Execution Paralysis. The sheer volume of details paralyzes decision-making.',
    },
    {
      id: 'pain-bottleneck',
      layout: 'title-body',
      block: 'problem',
      titleKey: 'painPoints.items.users.title',
      bodyKeys: ['painPoints.items.users.description'],
      speakerNotes: 'Middleware Madness. You became the bottleneck. 2 AM duct-taping AI outputs.',
    },
    {
      id: 'problem-transition',
      layout: 'quote',
      block: 'problem',
      titleKey: 'painPoints.transition',
      speakerNotes: 'Transition slide. From problem to solution. "You shouldn\'t feel this way."',
    },

    // ===== SOLUTION BLOCK (slides 11-19) =====
    {
      id: 'solution-intro',
      layout: 'title',
      block: 'solution',
      titleKey: 'features.header.title',
      subtitleKey: 'features.header.subtitle',
      speakerNotes: 'Introduce RealizeOS as the solution. Not a toy, not a wrapper — a complete engine.',
    },
    {
      id: 'feature-routing',
      layout: 'title-body',
      block: 'solution',
      titleKey: 'features.routing.title',
      bodyKeys: ['features.routing.promise'],
      speakerNotes: 'Multi-LLM Routing. 4 providers, 20+ models, 4 strategies. Demo this live.',
    },
    {
      id: 'feature-assembly',
      layout: 'title-body',
      block: 'solution',
      titleKey: 'features.assembly.title',
      bodyKeys: ['features.assembly.promise'],
      speakerNotes: 'Dynamic Identity Assembly. Multi-layer prompt assembly. Your digital clone.',
    },
    {
      id: 'feature-execution',
      layout: 'title-body',
      block: 'solution',
      titleKey: 'features.execution.title',
      bodyKeys: ['features.execution.promise'],
      speakerNotes: 'Multi-Step Execution. Workflow engine, 7 node types, YAML pipelines.',
    },
    {
      id: 'feature-retrieval',
      layout: 'title-body',
      block: 'solution',
      titleKey: 'features.retrieval.title',
      bodyKeys: ['features.retrieval.promise'],
      speakerNotes: 'Hybrid Knowledge Retrieval. FTS5 + vector. Finds intent, not just keywords.',
    },
    {
      id: 'feature-pipelines',
      layout: 'title-body',
      block: 'solution',
      titleKey: 'features.pipelines.title',
      bodyKeys: ['features.pipelines.promise'],
      speakerNotes: 'Production Pipelines. Rigid phases for real architecture work.',
    },
    {
      id: 'feature-evolution',
      layout: 'title-body',
      block: 'solution',
      titleKey: 'features.evolution.title',
      bodyKeys: ['features.evolution.promise'],
      speakerNotes: 'Continuous Evolution. Gets smarter with every interaction. 5 evolution types.',
    },
    {
      id: 'feature-multichannel',
      layout: 'title-body',
      block: 'solution',
      titleKey: 'features.multichannel.title',
      bodyKeys: ['features.multichannel.promise'],
      speakerNotes: 'Multi-Channel Gateway. WhatsApp, Web, Webhooks, Scheduler. One brain, every channel.',
    },
    {
      id: 'feature-security',
      layout: 'title-body',
      block: 'solution',
      titleKey: 'features.security.title',
      bodyKeys: ['features.security.promise'],
      speakerNotes: 'Enterprise Security. RBAC, encrypted vault, audit logging. Data stays yours.',
    },

    // ===== FABRIC SYSTEM (slide 20) =====
    {
      id: 'fabric-system',
      layout: 'feature-card',
      block: 'solution',
      titleKey: 'fabricSystem.header.title',
      subtitleKey: 'fabricSystem.header.subtitle',
      items: [
        { titleKey: 'fabricSystem.items.F.title', descKey: 'fabricSystem.items.F.description' },
        { titleKey: 'fabricSystem.items.A.title', descKey: 'fabricSystem.items.A.description' },
        { titleKey: 'fabricSystem.items.B.title', descKey: 'fabricSystem.items.B.description' },
        { titleKey: 'fabricSystem.items.R.title', descKey: 'fabricSystem.items.R.description' },
        { titleKey: 'fabricSystem.items.I.title', descKey: 'fabricSystem.items.I.description' },
        { titleKey: 'fabricSystem.items.C.title', descKey: 'fabricSystem.items.C.description' },
      ],
      speakerNotes: 'The FABRIC system. 6 directories = 1 coherent intelligence. Key differentiator.',
    },

    // ===== DEMO BLOCK (slides 21-22) =====
    {
      id: 'demo-intro',
      layout: 'demo',
      block: 'demo',
      titleKey: 'webinar.presentation.liveDemo',
      subtitleKey: 'webinar.presentation.liveDemoSubtitle',
      speakerNotes: 'START SCREEN SHARE. Show the actual system. Walk through a real workflow.',
    },
    {
      id: 'demo-placeholder',
      layout: 'demo',
      block: 'demo',
      titleKey: 'demoVideo.header.title',
      subtitleKey: 'demoVideo.header.subtitle',
      speakerNotes: 'Continue live demo. Show: agent conversation, knowledge retrieval, brand voice output.',
    },

    // ===== LITE PACKAGE BLOCK (slides 23-27) =====
    {
      id: 'lite-intro',
      layout: 'title',
      block: 'lite',
      titleKey: 'delivery.models.lite.edition',
      subtitleKey: 'delivery.models.lite.emotionalPromise',
      speakerNotes: 'What you actually get with Lite. From scattered chaos to single source of truth.',
    },
    {
      id: 'lite-vault',
      layout: 'feature-card',
      block: 'lite',
      titleKey: 'webinar.presentation.whatYouGet',
      items: [
        { titleKey: 'delivery.models.lite.items.0.title', descKey: 'delivery.models.lite.items.0.description' },
        { titleKey: 'delivery.models.lite.items.1.title', descKey: 'delivery.models.lite.items.1.description' },
        { titleKey: 'delivery.models.lite.items.2.title', descKey: 'delivery.models.lite.items.2.description' },
        { titleKey: 'delivery.models.lite.items.3.title', descKey: 'delivery.models.lite.items.3.description' },
      ],
      speakerNotes: 'Walk through the Lite deliverables: vault, agents, brand templates, workflows.',
    },
    {
      id: 'lite-more',
      layout: 'feature-card',
      block: 'lite',
      items: [
        { titleKey: 'delivery.models.lite.items.4.title', descKey: 'delivery.models.lite.items.4.description' },
        { titleKey: 'delivery.models.lite.items.5.title', descKey: 'delivery.models.lite.items.5.description' },
        { titleKey: 'delivery.models.lite.items.6.title', descKey: 'delivery.models.lite.items.6.description' },
      ],
      speakerNotes: 'More Lite deliverables: shared methods, CLAUDE.md protocol, setup guide.',
    },
    {
      id: 'how-it-works',
      layout: 'list',
      block: 'lite',
      titleKey: 'howItWorks.header.title',
      listKeys: [
        'howItWorks.steps.0.title',
        'howItWorks.steps.1.title',
        'howItWorks.steps.2.title',
        'howItWorks.steps.3.title',
        'howItWorks.steps.4.title',
      ],
      speakerNotes: '5-step deployment process. Emphasize speed: running within the hour.',
    },

    // ===== USE CASES BLOCK (slides 28-32) =====
    {
      id: 'usecases-intro',
      layout: 'title',
      block: 'usecases',
      titleKey: 'webinar.useCases.sectionTitle',
      subtitleKey: 'webinar.useCases.sectionSubtitle',
      speakerNotes: 'Generalized use cases. Not niche-specific. Any industry can use this.',
    },
    {
      id: 'usecase-knowledge',
      layout: 'title-body',
      block: 'usecases',
      titleKey: 'webinar.useCases.knowledge.title',
      bodyKeys: ['webinar.useCases.knowledge.description'],
      items: [
        { titleKey: 'webinar.useCases.knowledge.items.0' },
        { titleKey: 'webinar.useCases.knowledge.items.1' },
        { titleKey: 'webinar.useCases.knowledge.items.2' },
        { titleKey: 'webinar.useCases.knowledge.items.3' },
      ],
      speakerNotes: 'Knowledge & Operations. Vault, compliance, playbooks, institutional memory.',
    },
    {
      id: 'usecase-content',
      layout: 'title-body',
      block: 'usecases',
      titleKey: 'webinar.useCases.content.title',
      bodyKeys: ['webinar.useCases.content.description'],
      items: [
        { titleKey: 'webinar.useCases.content.items.0' },
        { titleKey: 'webinar.useCases.content.items.1' },
        { titleKey: 'webinar.useCases.content.items.2' },
        { titleKey: 'webinar.useCases.content.items.3' },
      ],
      speakerNotes: 'Content & Communication. Brand-consistent output across channels.',
    },
    {
      id: 'usecase-research',
      layout: 'title-body',
      block: 'usecases',
      titleKey: 'webinar.useCases.research.title',
      bodyKeys: ['webinar.useCases.research.description'],
      items: [
        { titleKey: 'webinar.useCases.research.items.0' },
        { titleKey: 'webinar.useCases.research.items.1' },
        { titleKey: 'webinar.useCases.research.items.2' },
        { titleKey: 'webinar.useCases.research.items.3' },
      ],
      speakerNotes: 'Research & Analysis. Market trends, financial docs, executive summaries.',
    },
    {
      id: 'usecase-multiventure',
      layout: 'title-body',
      block: 'usecases',
      titleKey: 'webinar.useCases.multiVenture.title',
      bodyKeys: ['webinar.useCases.multiVenture.description'],
      items: [
        { titleKey: 'webinar.useCases.multiVenture.items.0' },
        { titleKey: 'webinar.useCases.multiVenture.items.1' },
        { titleKey: 'webinar.useCases.multiVenture.items.2' },
        { titleKey: 'webinar.useCases.multiVenture.items.3' },
      ],
      speakerNotes: 'Multi-Venture Management. One control room, multiple businesses.',
    },

    // ===== PRICING BLOCK (slides 33-37) =====
    {
      id: 'pricing-intro',
      layout: 'title',
      block: 'pricing',
      titleKey: 'pricing.header.title',
      subtitleKey: 'pricing.header.promoBadge',
      speakerNotes: 'Pricing section. Emphasize launch promotion and the March 31 deadline.',
    },
    {
      id: 'pricing-comparison',
      layout: 'pricing-card',
      block: 'pricing',
      titleKey: 'comparison.header.title',
      subtitleKey: 'comparison.header.subtitle',
      speakerNotes: 'The Unfair Advantage comparison. Hiring team vs. individual tools vs. RealizeOS.',
    },
    {
      id: 'pricing-tiers',
      layout: 'pricing-card',
      block: 'pricing',
      titleKey: 'pricing.header.title',
      customData: { showTiers: 'true' },
      speakerNotes: 'Show all three tiers: Lite $79, Full $249, Setup $499. Launch prices.',
    },
    {
      id: 'exclusive-promo',
      layout: 'title-body',
      block: 'pricing',
      titleKey: 'webinar.presentation.exclusivePromo.title',
      subtitleKey: 'webinar.presentation.exclusivePromo.subtitle',
      bodyKeys: ['webinar.presentation.exclusivePromo.codeLabel'],
      items: [
        { titleKey: 'webinar.presentation.exclusivePromo.details.0' },
        { titleKey: 'webinar.presentation.exclusivePromo.details.1' },
        { titleKey: 'webinar.presentation.exclusivePromo.details.2' },
        { titleKey: 'webinar.presentation.exclusivePromo.details.3' },
      ],
      customData: { promoCode: 'webinar.presentation.exclusivePromo.code' },
      speakerNotes: 'EXCLUSIVE OFFER. 20% off Full & Setup for first 10 webinar guests. Code: LAUNCH20OFF. Expires TONIGHT at midnight. Create urgency — drop the code in chat NOW.',
    },
    {
      id: 'case-study-1',
      layout: 'quote',
      block: 'pricing',
      titleKey: 'caseStudies.items.boa.quote',
      subtitleKey: 'caseStudies.items.boa.title',
      customData: { metric: 'caseStudies.items.boa.metric' },
      speakerNotes: 'BOA Architects case study. 40 hrs/week saved. Real production result.',
    },
    {
      id: 'case-study-2',
      layout: 'quote',
      block: 'pricing',
      titleKey: 'caseStudies.items.realization.quote',
      subtitleKey: 'caseStudies.items.realization.title',
      customData: { metric: 'caseStudies.items.realization.metric' },
      speakerNotes: 'Realization Group case study. 5 ventures, 1 operator. The system the founder uses daily.',
    },

    // ===== CLOSING BLOCK (slides 38-41) =====
    {
      id: 'closing-cta',
      layout: 'title',
      block: 'closing',
      titleKey: 'finalCta.title2',
      subtitleKey: 'pricing.header.promoBadge',
      speakerNotes: 'Main CTA. Launch Promotion ends March 31st. Time to act.',
    },
    {
      id: 'next-steps',
      layout: 'list',
      block: 'closing',
      titleKey: 'webinar.presentation.nextSteps',
      listKeys: [
        'webinar.presentation.nextStepsItems.0',
        'webinar.presentation.nextStepsItems.1',
        'webinar.presentation.nextStepsItems.2',
        'webinar.presentation.nextStepsItems.3',
      ],
      speakerNotes: 'Walk through the exact next steps. Make it feel easy and immediate.',
    },
    {
      id: 'purchase-links',
      layout: 'pricing-card',
      block: 'closing',
      titleKey: 'webinar.presentation.purchaseNow',
      customData: { showTiers: 'true' },
      speakerNotes: 'Show purchase links. Drop them in the chat. Help people buy right now.',
    },
    {
      id: 'thank-you',
      layout: 'title',
      block: 'closing',
      titleKey: 'webinar.presentation.thankYou',
      subtitleKey: 'webinar.presentation.thankYouSubtitle',
      speakerNotes: 'Thank everyone. Transition to Q&A.',
    },

    // ===== Q&A BLOCK (slides 42-43) =====
    {
      id: 'qa-start',
      layout: 'qa',
      block: 'qa',
      titleKey: 'webinar.presentation.questionsTitle',
      subtitleKey: 'webinar.presentation.questionsSubtitle',
      speakerNotes: 'Open the floor for questions. 30 minutes reserved.',
    },
    {
      id: 'qa-contact',
      layout: 'qa',
      block: 'qa',
      titleKey: 'webinar.presentation.thankYou',
      subtitleKey: 'webinar.presentation.contactInfo',
      customData: { meetLink: 'webinar.presentation.meetLink' },
      speakerNotes: 'Final slide. Contact info, Google Meet link for follow-ups. Thank you.',
    },
  ];
}
