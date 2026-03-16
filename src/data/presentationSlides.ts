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
  | 'qa'
  | 'split'
  | 'stat-grid'
  | 'illustration'
  | 'before-after';

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
  illustration?: string;
  speakerNotes?: string;
  customData?: Record<string, string>;
}

export function getSlides(): Slide[] {
  return [
    // ===== BLOCK 1: OPENING (1-6) — "Hook in 2 minutes" =====
    {
      id: 'welcome',
      layout: 'split',
      block: 'opening',
      illustration: 'HeroAgentNetwork',
      titleKey: 'hero.title_highlight',
      bodyKeys: ['pres.welcome.hook'],
      speakerNotes: 'Open with the hook question. Pause. Let it land. Then introduce yourself.',
    },
    {
      id: 'stat-hook',
      layout: 'stat-grid',
      block: 'opening',
      items: [
        { titleKey: 'pres.stats.models', descKey: 'pres.stats.modelsLabel' },
        { titleKey: 'pres.stats.channels', descKey: 'pres.stats.channelsLabel' },
        { titleKey: 'pres.stats.saved', descKey: 'pres.stats.savedLabel' },
        { titleKey: 'pres.stats.price', descKey: 'pres.stats.priceLabel' },
      ],
      speakerNotes: 'Pattern interrupt — big numbers create authority. Let them absorb the stats.',
    },
    {
      id: 'agenda',
      layout: 'list',
      block: 'opening',
      titleKey: 'webinar.presentation.agenda',
      listKeys: [
        'pres.agenda.items.0',
        'pres.agenda.items.1',
        'pres.agenda.items.2',
        'pres.agenda.items.3',
        'pres.agenda.items.4',
      ],
      speakerNotes: '1-hour presentation + 30 min Q&A. Walk through what we cover today.',
    },
    {
      id: 'who-is-this-for',
      layout: 'list',
      block: 'opening',
      titleKey: 'webinar.presentation.whoIsThisFor',
      subtitleKey: 'pres.engagement.raiseHand',
      listKeys: [
        'webinar.presentation.whoIsThisForItems.0',
        'webinar.presentation.whoIsThisForItems.1',
        'webinar.presentation.whoIsThisForItems.2',
        'webinar.presentation.whoIsThisForItems.3',
      ],
      speakerNotes: 'Engagement moment. Ask people to react in chat. Build connection.',
    },
    {
      id: 'founder-story',
      layout: 'split',
      block: 'opening',
      illustration: 'FounderPhotoFrame',
      titleKey: 'founder.title',
      bodyKeys: ['pres.founder.short'],
      speakerNotes: 'Personal story. Credibility through real production use. Keep it brief.',
    },
    {
      id: 'founder-why',
      layout: 'quote',
      block: 'opening',
      titleKey: 'pres.founder.punchline',
      speakerNotes: 'Emotional punchline. The alternative was breaking down. Pause after this.',
    },

    // ===== BLOCK 2: PROBLEM (7-12) — "Make them feel the pain" =====
    {
      id: 'problem-intro',
      layout: 'illustration',
      block: 'problem',
      illustration: 'PainFragmented',
      titleKey: 'painPoints.header.title',
      subtitleKey: 'painPoints.header.subtitle',
      speakerNotes: 'Big visual sets the mood. Let the fragmented tools image speak.',
    },
    {
      id: 'pain-friction',
      layout: 'split',
      block: 'problem',
      illustration: 'PainFragmented',
      titleKey: 'painPoints.items.layers.title',
      bodyKeys: ['pres.pain.friction'],
      speakerNotes: 'The Friction Trap. Ask: "Who has experienced this?" Wait for reactions.',
    },
    {
      id: 'pain-paralysis',
      layout: 'split',
      block: 'problem',
      illustration: 'PainLostContext',
      titleKey: 'painPoints.items.clock.title',
      bodyKeys: ['pres.pain.paralysis'],
      speakerNotes: 'Execution Paralysis. Volume of details paralyzes decision-making.',
    },
    {
      id: 'pain-bottleneck',
      layout: 'split',
      block: 'problem',
      illustration: 'PainNoCoordination',
      titleKey: 'painPoints.items.users.title',
      bodyKeys: ['pres.pain.bottleneck'],
      speakerNotes: 'Middleware Madness. You ARE the bottleneck. Copy-pasting at 2 AM.',
    },
    {
      id: 'pain-stat',
      layout: 'stat-grid',
      block: 'problem',
      items: [
        { titleKey: 'pres.pain.stat1num', descKey: 'pres.pain.stat1label' },
        { titleKey: 'pres.pain.stat2num', descKey: 'pres.pain.stat2label' },
      ],
      speakerNotes: 'Data validates the emotional pain. Let the numbers sink in.',
    },
    {
      id: 'transition',
      layout: 'before-after',
      block: 'problem',
      titleKey: 'pres.transition.title',
      customData: {
        beforeTitle: 'pres.transition.beforeTitle',
        beforeItems: 'pres.transition.beforeItems',
        beforeIllustration: 'PainFragmented',
        afterTitle: 'pres.transition.afterTitle',
        afterItems: 'pres.transition.afterItems',
        afterIllustration: 'HeroAgentNetwork',
      },
      speakerNotes: 'Before/After contrast. "This is what changes." Transition to solution.',
    },

    // ===== BLOCK 3: SOLUTION — Features (13-22) — "Show the machinery" =====
    {
      id: 'solution-intro',
      layout: 'illustration',
      block: 'solution',
      illustration: 'HeroAgentNetwork',
      titleKey: 'features.header.title',
      subtitleKey: 'features.header.subtitle',
      speakerNotes: 'Visual transition. The agent network diagram sets up "coordinated team."',
    },
    {
      id: 'feature-routing',
      layout: 'split',
      block: 'solution',
      illustration: 'FeatureMultiLLM',
      titleKey: 'features.routing.title',
      bodyKeys: ['pres.feature.routing'],
      speakerNotes: 'Multi-LLM Routing. 4 providers, 20+ models, 4 strategies. Will demo this live.',
    },
    {
      id: 'feature-assembly',
      layout: 'split',
      block: 'solution',
      illustration: 'FeaturePromptAssembly',
      titleKey: 'features.assembly.title',
      bodyKeys: ['pres.feature.assembly'],
      speakerNotes: 'Dynamic Identity Assembly. Your digital clone, not a chatbot.',
    },
    {
      id: 'feature-execution',
      layout: 'split',
      block: 'solution',
      illustration: 'FeatureSkills',
      titleKey: 'features.execution.title',
      bodyKeys: ['pres.feature.execution'],
      speakerNotes: 'Multi-Step Execution. One message triggers full workflow.',
    },
    {
      id: 'feature-retrieval',
      layout: 'split',
      block: 'solution',
      illustration: 'FeatureKBSearch',
      titleKey: 'features.retrieval.title',
      bodyKeys: ['pres.feature.retrieval'],
      speakerNotes: 'Hybrid Knowledge Retrieval. FTS5 + vector. Intent, not keywords.',
    },
    {
      id: 'feature-pipelines',
      layout: 'split',
      block: 'solution',
      illustration: 'FeatureCreativePipeline',
      titleKey: 'features.pipelines.title',
      bodyKeys: ['pres.feature.pipelines'],
      speakerNotes: 'Production Pipelines. Rigid phases for real architecture work.',
    },
    {
      id: 'feature-evolution',
      layout: 'split',
      block: 'solution',
      illustration: 'FeatureSelfEvolution',
      titleKey: 'features.evolution.title',
      bodyKeys: ['pres.feature.evolution'],
      speakerNotes: 'Continuous Evolution. Gets smarter. 5 types. Risk scoring. Rollback.',
    },
    {
      id: 'feature-multichannel',
      layout: 'split',
      block: 'solution',
      illustration: 'FeatureMultiChannel',
      titleKey: 'features.multichannel.title',
      bodyKeys: ['pres.feature.multichannel'],
      speakerNotes: 'Multi-Channel Gateway. One brain, every channel.',
    },
    {
      id: 'feature-security',
      layout: 'split',
      block: 'solution',
      illustration: 'FeatureSecurity',
      titleKey: 'features.security.title',
      bodyKeys: ['pres.feature.security'],
      speakerNotes: 'Enterprise Security. RBAC, vault, audit. Data stays yours.',
    },
    {
      id: 'fabric-system',
      layout: 'split',
      block: 'solution',
      illustration: 'FabricDiagram',
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
      speakerNotes: 'FABRIC system. 6 directories = 1 intelligence. Key differentiator.',
    },

    // ===== BLOCK 4: SOCIAL PROOF + DEMO (23-26) — "Peak of interest" =====
    {
      id: 'case-boa',
      layout: 'quote',
      block: 'demo',
      titleKey: 'caseStudies.items.boa.quote',
      subtitleKey: 'caseStudies.items.boa.title',
      customData: { metric: 'caseStudies.items.boa.metric' },
      speakerNotes: 'BOA Architects. 40 hrs/week saved. Social proof BEFORE demo.',
    },
    {
      id: 'case-realization',
      layout: 'quote',
      block: 'demo',
      titleKey: 'caseStudies.items.realization.quote',
      subtitleKey: 'caseStudies.items.realization.title',
      customData: { metric: 'caseStudies.items.realization.metric' },
      speakerNotes: 'Realization Group. 5 ventures, 1 operator. Your own proof.',
    },
    {
      id: 'demo-intro',
      layout: 'demo',
      block: 'demo',
      illustration: 'ProductMockup',
      titleKey: 'webinar.presentation.liveDemo',
      subtitleKey: 'pres.demo.intro',
      speakerNotes: 'START SCREEN SHARE. Show the actual system running in production.',
    },
    {
      id: 'demo-placeholder',
      layout: 'demo',
      block: 'demo',
      titleKey: 'demoVideo.header.title',
      subtitleKey: 'demoVideo.header.subtitle',
      speakerNotes: 'Continue demo. Show: agent conversation, knowledge retrieval, brand voice output.',
    },

    // ===== BLOCK 5: WHAT YOU GET (27-32) =====
    {
      id: 'mid-cta',
      layout: 'title',
      block: 'lite',
      titleKey: 'pres.midCta.title',
      subtitleKey: 'pres.midCta.subtitle',
      speakerNotes: 'Mid-presentation CTA. Drop links in chat. Some people are ready NOW.',
    },
    {
      id: 'lite-intro',
      layout: 'title',
      block: 'lite',
      titleKey: 'delivery.models.lite.edition',
      subtitleKey: 'delivery.models.lite.emotionalPromise',
      speakerNotes: 'What you actually get with Lite. Scattered chaos to single source of truth.',
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
      speakerNotes: 'Walk through Lite deliverables: vault, agents, brand templates, workflows.',
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
      speakerNotes: 'More Lite deliverables: shared methods, CLAUDE.md, setup guide.',
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
      speakerNotes: '5-step deployment. Emphasize speed: running within the hour.',
    },
    {
      id: 'how-it-works-visual',
      layout: 'illustration',
      block: 'lite',
      illustration: 'ProductMockup',
      titleKey: 'pres.howItWorksVisual.title',
      speakerNotes: 'Visual punctuation. From click to output in under 1 hour.',
    },

    // ===== BLOCK 6: USE CASES (33-37) — "See yourself in it" =====
    {
      id: 'usecases-intro',
      layout: 'title',
      block: 'usecases',
      titleKey: 'webinar.useCases.sectionTitle',
      subtitleKey: 'webinar.useCases.sectionSubtitle',
      speakerNotes: 'Generalized use cases. Any industry can use this.',
    },
    {
      id: 'usecase-knowledge',
      layout: 'split',
      block: 'usecases',
      illustration: 'UseCaseConsulting',
      titleKey: 'webinar.useCases.knowledge.title',
      bodyKeys: ['pres.usecase.knowledge'],
      items: [
        { titleKey: 'webinar.useCases.knowledge.items.0' },
        { titleKey: 'webinar.useCases.knowledge.items.1' },
      ],
      speakerNotes: 'Knowledge & Operations. Vault, compliance, playbooks.',
    },
    {
      id: 'usecase-content',
      layout: 'split',
      block: 'usecases',
      illustration: 'UseCaseAgency',
      titleKey: 'webinar.useCases.content.title',
      bodyKeys: ['pres.usecase.content'],
      items: [
        { titleKey: 'webinar.useCases.content.items.0' },
        { titleKey: 'webinar.useCases.content.items.1' },
      ],
      speakerNotes: 'Content & Communication. Brand-consistent output.',
    },
    {
      id: 'usecase-research',
      layout: 'split',
      block: 'usecases',
      illustration: 'UseCaseSaaS',
      titleKey: 'webinar.useCases.research.title',
      bodyKeys: ['pres.usecase.research'],
      items: [
        { titleKey: 'webinar.useCases.research.items.0' },
        { titleKey: 'webinar.useCases.research.items.1' },
      ],
      speakerNotes: 'Research & Analysis. Market trends, exec summaries.',
    },
    {
      id: 'usecase-multiventure',
      layout: 'split',
      block: 'usecases',
      illustration: 'UseCaseMultiVenture',
      titleKey: 'webinar.useCases.multiVenture.title',
      bodyKeys: ['pres.usecase.multiventure'],
      items: [
        { titleKey: 'webinar.useCases.multiVenture.items.0' },
        { titleKey: 'webinar.useCases.multiVenture.items.1' },
      ],
      speakerNotes: 'Multi-Venture. One control room, multiple businesses.',
    },

    // ===== BLOCK 7: PRICING (38-43) — "Make the decision easy" =====
    {
      id: 'pricing-intro',
      layout: 'title',
      block: 'pricing',
      titleKey: 'pricing.header.title',
      subtitleKey: 'pres.pricing.urgency',
      speakerNotes: 'Pricing section. Emphasize launch promotion and March 31 deadline.',
    },
    {
      id: 'pricing-comparison',
      layout: 'pricing-card',
      block: 'pricing',
      titleKey: 'comparison.header.title',
      subtitleKey: 'comparison.header.subtitle',
      speakerNotes: 'The Unfair Advantage. Hiring vs. tools vs. RealizeOS.',
    },
    {
      id: 'pricing-tiers',
      layout: 'pricing-card',
      block: 'pricing',
      titleKey: 'pricing.header.title',
      subtitleKey: 'pricing.header.promoBadge',
      customData: { showTiers: 'true' },
      speakerNotes: 'Show all three tiers. Lite $79, Full $249, Setup $499. Launch prices.',
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
      speakerNotes: 'EXCLUSIVE OFFER. Code: LAUNCH20OFF. Drop it in chat NOW. Create urgency.',
    },
    {
      id: 'scarcity',
      layout: 'stat-grid',
      block: 'pricing',
      items: [
        { titleKey: 'pres.scarcity.spotsNum', descKey: 'pres.scarcity.spotsLabel' },
        { titleKey: 'pres.scarcity.discountNum', descKey: 'pres.scarcity.discountLabel' },
        { titleKey: 'pres.scarcity.expiresNum', descKey: 'pres.scarcity.expiresLabel' },
      ],
      speakerNotes: 'Pure urgency. 10 spots, 20% off, expires tonight. Let numbers do the work.',
    },
    {
      id: 'action-cta',
      layout: 'title',
      block: 'pricing',
      titleKey: 'pres.actionCta.title',
      subtitleKey: 'pres.actionCta.subtitle',
      speakerNotes: 'Direct call to action. Tell them to type the code in chat RIGHT NOW.',
    },

    // ===== BLOCK 8: CLOSING + Q&A (44-49) =====
    {
      id: 'closing-cta',
      layout: 'title',
      block: 'closing',
      titleKey: 'finalCta.title2',
      subtitleKey: 'pricing.header.promoBadge',
      speakerNotes: 'Main CTA. Launch Promotion ends March 31st.',
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
      speakerNotes: 'Exact next steps. Make it feel easy and immediate.',
    },
    {
      id: 'purchase-links',
      layout: 'pricing-card',
      block: 'closing',
      titleKey: 'webinar.presentation.purchaseNow',
      customData: { showTiers: 'true' },
      speakerNotes: 'Show purchase links. Drop them in chat. Help people buy now.',
    },
    {
      id: 'thank-you',
      layout: 'title',
      block: 'closing',
      titleKey: 'webinar.presentation.thankYou',
      subtitleKey: 'webinar.presentation.thankYouSubtitle',
      speakerNotes: 'Thank everyone. Transition to Q&A.',
    },
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
      speakerNotes: 'Final slide. Contact info, Google Meet link.',
    },
  ];
}
