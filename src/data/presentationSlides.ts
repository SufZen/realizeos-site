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
    // ===== BLOCK 1: OPENING (1-6) =====
    { // 1 — welcome (improved copy + illustration)
      id: 'welcome',
      layout: 'split',
      block: 'opening',
      illustration: 'HeroAgentNetwork',
      titleKey: 'pres.welcome.title',
      bodyKeys: ['pres.welcome.hook'],
      speakerNotes: 'Open with "Your AI Team Is Ready". Pause. Then: "One engine that remembers..." Let it land.',
    },
    { // 2 — stat-hook (user benefits only, no price)
      id: 'stat-hook',
      layout: 'stat-grid',
      block: 'opening',
      items: [
        { titleKey: 'pres.stats.models', descKey: 'pres.stats.modelsLabel' },
        { titleKey: 'pres.stats.channels', descKey: 'pres.stats.channelsLabel' },
        { titleKey: 'pres.stats.saved', descKey: 'pres.stats.savedLabel' },
        { titleKey: 'pres.stats.tools', descKey: 'pres.stats.toolsLabel' },
        { titleKey: 'pres.stats.agents', descKey: 'pres.stats.agentsLabel' },
      ],
      speakerNotes: 'Pattern interrupt — user benefits only, no price yet.',
    },
    { // 3 — agenda (improved copy + illustration)
      id: 'agenda',
      layout: 'split',
      block: 'opening',
      illustration: 'HeroAgentNetwork',
      titleKey: 'pres.agenda.title',
      listKeys: [
        'pres.agenda.items.0',
        'pres.agenda.items.1',
        'pres.agenda.items.2',
        'pres.agenda.items.3',
        'pres.agenda.items.4',
      ],
      speakerNotes: '1-hour presentation + 30 min Q&A. Build anticipation with punchy items.',
    },
    { // 4 — who-is-this-for (+ illustration)
      id: 'who-is-this-for',
      layout: 'split',
      block: 'opening',
      illustration: 'UseCaseConsulting',
      titleKey: 'webinar.presentation.whoIsThisFor',
      subtitleKey: 'pres.engagement.raiseHand',
      listKeys: [
        'webinar.presentation.whoIsThisForItems.0',
        'webinar.presentation.whoIsThisForItems.1',
        'webinar.presentation.whoIsThisForItems.2',
        'webinar.presentation.whoIsThisForItems.3',
      ],
      speakerNotes: 'Engagement moment. Ask people to react in chat.',
    },
    { // 5 — founder-story (founder image via FounderPhotoFrame)
      id: 'founder-story',
      layout: 'split',
      block: 'opening',
      illustration: 'FounderPhotoFrame',
      titleKey: 'founder.title',
      bodyKeys: ['pres.founder.short'],
      speakerNotes: 'Personal story. Credibility. Keep it brief.',
    },
    { // 6 — founder-why
      id: 'founder-why',
      layout: 'quote',
      block: 'opening',
      titleKey: 'pres.founder.punchline',
      speakerNotes: 'Emotional punchline. Pause after this.',
    },

    // ===== BLOCK 2: PROBLEM (7-12) =====
    { // 7 — problem-intro
      id: 'problem-intro',
      layout: 'illustration',
      block: 'problem',
      illustration: 'PainFragmented',
      titleKey: 'painPoints.header.title',
      subtitleKey: 'painPoints.header.subtitle',
      speakerNotes: 'Big visual sets the mood.',
    },
    { // 8 — pain-friction
      id: 'pain-friction',
      layout: 'split',
      block: 'problem',
      illustration: 'PainFragmented',
      titleKey: 'painPoints.items.layers.title',
      bodyKeys: ['pres.pain.friction'],
      speakerNotes: 'The Friction Trap. Ask: "Who has experienced this?"',
    },
    { // 9 — pain-paralysis
      id: 'pain-paralysis',
      layout: 'split',
      block: 'problem',
      illustration: 'PainLostContext',
      titleKey: 'painPoints.items.clock.title',
      bodyKeys: ['pres.pain.paralysis'],
      speakerNotes: 'Execution Paralysis.',
    },
    { // 10 — pain-bottleneck
      id: 'pain-bottleneck',
      layout: 'split',
      block: 'problem',
      illustration: 'PainNoCoordination',
      titleKey: 'painPoints.items.users.title',
      bodyKeys: ['pres.pain.bottleneck'],
      speakerNotes: 'Middleware Madness. You ARE the bottleneck.',
    },
    { // 11 — pain-stat (+ title)
      id: 'pain-stat',
      layout: 'stat-grid',
      block: 'problem',
      titleKey: 'pres.pain.statTitle',
      items: [
        { titleKey: 'pres.pain.stat1num', descKey: 'pres.pain.stat1label' },
        { titleKey: 'pres.pain.stat2num', descKey: 'pres.pain.stat2label' },
      ],
      speakerNotes: 'Data validates the pain. Let numbers sink in.',
    },
    { // 12 — transition (improved copy)
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
      speakerNotes: '"Same operator. Different reality." This is the pivot. Let the contrast land.',
    },

    // ===== BLOCK 3: SOLUTION (13-22) =====
    { // 13 — solution-intro
      id: 'solution-intro',
      layout: 'illustration',
      block: 'solution',
      illustration: 'HeroAgentNetwork',
      titleKey: 'features.header.title',
      subtitleKey: 'features.header.subtitle',
      speakerNotes: 'Visual transition to solution.',
    },
    { // 14 — feature-routing
      id: 'feature-routing',
      layout: 'split',
      block: 'solution',
      illustration: 'FeatureMultiLLM',
      titleKey: 'features.routing.title',
      bodyKeys: ['pres.feature.routing'],
      speakerNotes: 'Multi-LLM Routing.',
    },
    { // 15 — feature-assembly
      id: 'feature-assembly',
      layout: 'split',
      block: 'solution',
      illustration: 'FeaturePromptAssembly',
      titleKey: 'features.assembly.title',
      bodyKeys: ['pres.feature.assembly'],
      speakerNotes: 'Dynamic Identity Assembly. Digital clone.',
    },
    { // 16 — feature-execution
      id: 'feature-execution',
      layout: 'split',
      block: 'solution',
      illustration: 'FeatureSkills',
      titleKey: 'features.execution.title',
      bodyKeys: ['pres.feature.execution'],
      speakerNotes: 'Multi-Step Execution.',
    },
    { // 17 — feature-retrieval
      id: 'feature-retrieval',
      layout: 'split',
      block: 'solution',
      illustration: 'FeatureKBSearch',
      titleKey: 'features.retrieval.title',
      bodyKeys: ['pres.feature.retrieval'],
      speakerNotes: 'Hybrid Knowledge Retrieval.',
    },
    { // 18 — feature-pipelines
      id: 'feature-pipelines',
      layout: 'split',
      block: 'solution',
      illustration: 'FeatureCreativePipeline',
      titleKey: 'features.pipelines.title',
      bodyKeys: ['pres.feature.pipelines'],
      speakerNotes: 'Production Pipelines.',
    },
    { // 19 — feature-evolution
      id: 'feature-evolution',
      layout: 'split',
      block: 'solution',
      illustration: 'FeatureSelfEvolution',
      titleKey: 'features.evolution.title',
      bodyKeys: ['pres.feature.evolution'],
      speakerNotes: 'Continuous Evolution.',
    },
    { // 20 — feature-multichannel (DEMO STOP — Telegram bots)
      id: 'feature-multichannel',
      layout: 'split',
      block: 'solution',
      illustration: 'FeatureMultiChannel',
      titleKey: 'features.multichannel.title',
      bodyKeys: ['pres.feature.multichannel'],
      subtitleKey: 'pres.feature.multichannelSubtitle',
      speakerNotes: 'STOP HERE FOR LIVE DEMO. Show Telegram bot in action. Screen share the bot receiving a message and agents coordinating a response.',
    },
    { // 21 — feature-security
      id: 'feature-security',
      layout: 'split',
      block: 'solution',
      illustration: 'FeatureSecurity',
      titleKey: 'features.security.title',
      bodyKeys: ['pres.feature.security'],
      speakerNotes: 'Enterprise Security.',
    },
    { // 22 — fabric-system (feature-card for better HE text layout)
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
      speakerNotes: 'FABRIC system. 6 directories = 1 intelligence.',
    },

    // ===== BLOCK 4: SOCIAL PROOF + DEMO (23-26) =====
    { // 23 — case study (Architecture Firm — anonymized)
      id: 'case-arch',
      layout: 'quote',
      block: 'demo',
      titleKey: 'caseStudies.items.boa.quote',
      subtitleKey: 'pres.case.archName',
      customData: { metric: 'caseStudies.items.boa.metric' },
      speakerNotes: 'Architecture firm case study. 40 hrs/week saved.',
    },
    { // 24 — case-realization
      id: 'case-realization',
      layout: 'quote',
      block: 'demo',
      titleKey: 'caseStudies.items.realization.quote',
      subtitleKey: 'caseStudies.items.realization.title',
      customData: { metric: 'caseStudies.items.realization.metric' },
      speakerNotes: 'Realization Group. 5 ventures, 1 operator.',
    },
    { // 25 — demo-intro
      id: 'demo-intro',
      layout: 'demo',
      block: 'demo',
      illustration: 'ProductMockup',
      titleKey: 'webinar.presentation.liveDemo',
      subtitleKey: 'pres.demo.intro',
      speakerNotes: 'START SCREEN SHARE.',
    },
    { // 26 — demo-placeholder
      id: 'demo-placeholder',
      layout: 'demo',
      block: 'demo',
      titleKey: 'demoVideo.header.title',
      subtitleKey: 'demoVideo.header.subtitle',
      speakerNotes: 'Continue demo.',
    },

    // ===== BLOCK 5: WHAT YOU GET (27-32) =====
    { // 27 — mid-cta
      id: 'mid-cta',
      layout: 'title',
      block: 'lite',
      titleKey: 'pres.midCta.title',
      subtitleKey: 'pres.midCta.subtitle',
      speakerNotes: 'Mid-presentation CTA. Some people are ready NOW.',
    },
    { // 28 — lite-intro (improved copy)
      id: 'lite-intro',
      layout: 'title',
      block: 'lite',
      titleKey: 'pres.liteIntro.title',
      subtitleKey: 'pres.liteIntro.subtitle',
      speakerNotes: 'Lite package intro. Sell the transformation, not the box.',
    },
    { // 29 — lite-vault (improved copy + illustration)
      id: 'lite-vault',
      layout: 'split',
      block: 'lite',
      illustration: 'PackageLite',
      titleKey: 'webinar.presentation.whatYouGet',
      items: [
        { titleKey: 'pres.lite.vault.title', descKey: 'pres.lite.vault.desc' },
        { titleKey: 'pres.lite.agents.title', descKey: 'pres.lite.agents.desc' },
        { titleKey: 'pres.lite.brand.title', descKey: 'pres.lite.brand.desc' },
        { titleKey: 'pres.lite.skills.title', descKey: 'pres.lite.skills.desc' },
      ],
      speakerNotes: 'Lite deliverables: vault, agents, venture templates, workflows.',
    },
    { // 30 — lite-more (improved copy + illustration)
      id: 'lite-more',
      layout: 'split',
      block: 'lite',
      illustration: 'TierLite',
      items: [
        { titleKey: 'pres.lite.methods.title', descKey: 'pres.lite.methods.desc' },
        { titleKey: 'pres.lite.claude.title', descKey: 'pres.lite.claude.desc' },
        { titleKey: 'pres.lite.guide.title', descKey: 'pres.lite.guide.desc' },
      ],
      speakerNotes: 'More Lite: shared methods, CLAUDE.md, setup guide.',
    },
    { // 31 — how-it-works (improved copy + visual)
      id: 'how-it-works',
      layout: 'split',
      block: 'lite',
      illustration: 'ProductMockup',
      titleKey: 'howItWorks.header.title',
      listKeys: [
        'pres.steps.items.0',
        'pres.steps.items.1',
        'pres.steps.items.2',
        'pres.steps.items.3',
        'pres.steps.items.4',
      ],
      speakerNotes: '5-step deployment. Emphasize speed.',
    },
    { // 32 — how-it-works-visual
      id: 'how-it-works-visual',
      layout: 'illustration',
      block: 'lite',
      illustration: 'ProductMockup',
      titleKey: 'pres.howItWorksVisual.title',
      speakerNotes: 'From click to output in under 1 hour.',
    },

    // ===== BLOCK 6: USE CASES (33-37) =====
    { // 33 — usecases-intro
      id: 'usecases-intro',
      layout: 'title',
      block: 'usecases',
      titleKey: 'webinar.useCases.sectionTitle',
      subtitleKey: 'webinar.useCases.sectionSubtitle',
      speakerNotes: 'Generalized use cases.',
    },
    { // 34 — usecase-knowledge (improved copy)
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
    { // 35 — usecase-content
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
      speakerNotes: 'Content & Communication.',
    },
    { // 36 — usecase-research
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
      speakerNotes: 'Research & Analysis.',
    },
    { // 37 — usecase-multiventure (improved copy)
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
      speakerNotes: 'Multi-Venture. This is how WE run 5 businesses.',
    },

    // ===== BLOCK 7: PRICING (38-43) =====
    { // 38 — pricing-intro (+ illustration + guarantee)
      id: 'pricing-intro',
      layout: 'illustration',
      block: 'pricing',
      illustration: 'ComparisonRealizeIcon',
      titleKey: 'pricing.header.title',
      subtitleKey: 'pres.pricing.urgency',
      bodyKeys: ['pres.pricing.guarantee'],
      speakerNotes: 'Pricing section. Emphasize launch pricing, March 31 deadline, and 14-day guarantee.',
    },
    { // 39 — pricing-comparison
      id: 'pricing-comparison',
      layout: 'pricing-card',
      block: 'pricing',
      titleKey: 'comparison.header.title',
      subtitleKey: 'comparison.header.subtitle',
      speakerNotes: 'The Unfair Advantage. Hiring vs. tools vs. RealizeOS.',
    },
    { // 40 — pricing-tiers (+ guarantee)
      id: 'pricing-tiers',
      layout: 'pricing-card',
      block: 'pricing',
      titleKey: 'pricing.header.title',
      subtitleKey: 'pres.pricing.guarantee',
      customData: { showTiers: 'true' },
      speakerNotes: 'Show all three tiers. Mention 14-day money-back guarantee.',
    },
    { // 41 — exclusive-promo
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
      speakerNotes: 'EXCLUSIVE OFFER. Code: LAUNCH20OFF. Apply at checkout. 14-day money-back guarantee.',
    },
    { // 42 — scarcity (+ title + guarantee subtitle)
      id: 'scarcity',
      layout: 'stat-grid',
      block: 'pricing',
      titleKey: 'pres.scarcity.title',
      subtitleKey: 'pres.pricing.guarantee',
      items: [
        { titleKey: 'pres.scarcity.spotsNum', descKey: 'pres.scarcity.spotsLabel' },
        { titleKey: 'pres.scarcity.discountNum', descKey: 'pres.scarcity.discountLabel' },
        { titleKey: 'pres.scarcity.expiresNum', descKey: 'pres.scarcity.expiresLabel' },
      ],
      speakerNotes: 'Pure urgency. 10 spots, 20% off, expires tonight.',
    },
    { // 43 — action-cta (promo at checkout + guarantee)
      id: 'action-cta',
      layout: 'title',
      block: 'pricing',
      titleKey: 'pres.actionCta.title',
      subtitleKey: 'pres.actionCta.subtitle',
      bodyKeys: ['pres.pricing.guarantee'],
      speakerNotes: 'Use code LAUNCH20OFF at checkout. 14-day money-back guarantee, no questions asked.',
    },

    // ===== BLOCK 8: CLOSING + Q&A (44-49) =====
    { // 44 — closing-cta (+ illustration)
      id: 'closing-cta',
      layout: 'split',
      block: 'closing',
      illustration: 'HeroAgentNetwork',
      titleKey: 'finalCta.title2',
      subtitleKey: 'pricing.header.promoBadge',
      speakerNotes: 'Main CTA. Launch Promotion ends March 31st.',
    },
    { // 45 — next-steps (+ visual)
      id: 'next-steps',
      layout: 'split',
      block: 'closing',
      illustration: 'ProductMockup',
      titleKey: 'webinar.presentation.nextSteps',
      listKeys: [
        'webinar.presentation.nextStepsItems.0',
        'webinar.presentation.nextStepsItems.1',
        'webinar.presentation.nextStepsItems.2',
        'webinar.presentation.nextStepsItems.3',
      ],
      speakerNotes: 'Exact next steps. Make it feel easy.',
    },
    { // 46 — purchase-links (prices change April 1st + guarantee)
      id: 'purchase-links',
      layout: 'pricing-card',
      block: 'closing',
      titleKey: 'pres.purchaseTitle',
      subtitleKey: 'pres.pricing.guarantee',
      customData: { showTiers: 'true' },
      speakerNotes: 'Final pricing. Prices increase April 1st. 14-day money-back guarantee.',
    },
    { // 47 — thank-you (+ illustration)
      id: 'thank-you',
      layout: 'illustration',
      block: 'closing',
      illustration: 'HeroAgentNetwork',
      titleKey: 'webinar.presentation.thankYou',
      subtitleKey: 'webinar.presentation.thankYouSubtitle',
      speakerNotes: 'Thank everyone. Transition to Q&A.',
    },
    { // 48 — qa-start
      id: 'qa-start',
      layout: 'qa',
      block: 'qa',
      titleKey: 'webinar.presentation.questionsTitle',
      subtitleKey: 'webinar.presentation.questionsSubtitle',
      speakerNotes: 'Open the floor. 30 minutes reserved.',
    },
    { // 49 — qa-contact (email: info@realizeos.ai, no Meet link)
      id: 'qa-contact',
      layout: 'qa',
      block: 'qa',
      titleKey: 'webinar.presentation.thankYou',
      subtitleKey: 'webinar.presentation.contactInfo',
      speakerNotes: 'Final slide. Email: info@realizeos.ai.',
    },
  ];
}
