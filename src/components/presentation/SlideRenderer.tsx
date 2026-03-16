import { useTranslation } from 'react-i18next';
import type { Slide } from '@/data/presentationSlides';
import { usePricing } from '@/data/pricing';
import {
  HeroAgentNetwork, FabricDiagram, FeatureMultiLLM, FeaturePromptAssembly,
  FeatureSkills, FeatureKBSearch, FeatureCreativePipeline, FeatureSelfEvolution,
  FeatureMultiChannel, FeatureSecurity, PainFragmented, PainLostContext,
  PainNoCoordination, UseCaseConsulting, UseCaseAgency, UseCaseMultiVenture,
  UseCaseSaaS, ProductMockup, FounderPhotoFrame, TierLite, TierFull, TierSetup,
  ComparisonTeamIcon, ComparisonToolsIcon, ComparisonRealizeIcon, PackageLite
} from '@/components/illustrations';

// Note: dangerouslySetInnerHTML is used only for i18n translation strings from
// our own translation.json files (developer-controlled, trusted content).
// Some translation keys contain <br> tags for line breaks.

const illustrationMap: Record<string, React.ComponentType<{ className?: string }>> = {
  HeroAgentNetwork, FabricDiagram, FeatureMultiLLM, FeaturePromptAssembly,
  FeatureSkills, FeatureKBSearch, FeatureCreativePipeline, FeatureSelfEvolution,
  FeatureMultiChannel, FeatureSecurity, PainFragmented, PainLostContext,
  PainNoCoordination, UseCaseConsulting, UseCaseAgency, UseCaseMultiVenture,
  UseCaseSaaS, ProductMockup, FounderPhotoFrame, TierLite, TierFull, TierSetup,
  ComparisonTeamIcon, ComparisonToolsIcon, ComparisonRealizeIcon, PackageLite,
};

function getIllustration(name?: string) {
  if (!name) return null;
  return illustrationMap[name] || null;
}

// Convert \n in i18n strings to <br> for slide readability
function nl2br(text: string): string {
  return text.replace(/\n/g, '<br/>');
}

interface SlideRendererProps {
  slide: Slide;
}

function TitleSlide({ slide }: SlideRendererProps) {
  const { t } = useTranslation();
  return (
    <div className="flex h-full flex-col items-center justify-center px-8 text-center md:px-16">
      <h1
        className="text-gradient-yellow text-glow-yellow text-4xl font-bold leading-tight md:text-6xl lg:text-7xl"
        dangerouslySetInnerHTML={{ __html: slide.titleKey ? t(slide.titleKey) : '' }}
      />
      {slide.subtitleKey && (
        <p className="mt-6 max-w-3xl text-lg text-muted-foreground md:text-2xl" dangerouslySetInnerHTML={{ __html: nl2br(t(slide.subtitleKey)) }} />
      )}
      {slide.bodyKeys?.map((key) => (
        <p key={key} className="mt-4 max-w-2xl text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: nl2br(t(key)) }} />
      ))}
    </div>
  );
}

function TitleBodySlide({ slide }: SlideRendererProps) {
  const { t } = useTranslation();
  return (
    <div className="flex h-full flex-col justify-center px-8 md:px-16 lg:px-24">
      <h2
        className="text-gradient-yellow mb-4 text-3xl font-bold md:text-5xl"
        dangerouslySetInnerHTML={{ __html: slide.titleKey ? t(slide.titleKey) : '' }}
      />
      {slide.subtitleKey && (
        <p className="mb-4 text-base text-muted-foreground md:text-lg">
          {t(slide.subtitleKey)}
        </p>
      )}
      {slide.bodyKeys?.map((key) => (
        <p key={key} className="mb-4 max-w-4xl text-base text-muted-foreground md:text-xl" dangerouslySetInnerHTML={{ __html: nl2br(t(key)) }} />
      ))}
      {slide.customData?.promoCode && (
        <div className="animated-border glow-yellow my-4 inline-block rounded-xl px-8 py-3">
          <span className="font-mono text-3xl font-bold tracking-widest text-brand-yellow md:text-5xl">
            {t(slide.customData.promoCode)}
          </span>
        </div>
      )}
      {slide.items && slide.items.length > 0 && (
        <ul className="mt-4 max-w-3xl space-y-2">
          {slide.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-base text-foreground md:text-lg">
              <span className="mt-1 text-brand-yellow">&#10003;</span>
              <span>{item.titleKey ? t(item.titleKey) : item.title}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ListSlide({ slide }: SlideRendererProps) {
  const { t } = useTranslation();
  return (
    <div className="flex h-full flex-col justify-center px-8 md:px-16 lg:px-24">
      {slide.titleKey && (
        <h2 className="text-gradient-yellow mb-4 text-3xl font-bold md:text-5xl">
          {t(slide.titleKey)}
        </h2>
      )}
      {slide.subtitleKey && (
        <p className="mb-6 text-base italic text-muted-foreground md:text-lg">
          {t(slide.subtitleKey)}
        </p>
      )}
      <ul className="max-w-3xl space-y-4">
        {slide.listKeys?.map((key, i) => (
          <li key={key} className="flex items-start gap-4 text-lg text-foreground md:text-xl">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-yellow/20 font-mono text-sm font-bold text-brand-yellow">
              {i + 1}
            </span>
            <span
              className="pt-0.5"
              dangerouslySetInnerHTML={{ __html: t(key) }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

function FeatureCardSlide({ slide }: SlideRendererProps) {
  const { t } = useTranslation();
  return (
    <div className="flex h-full flex-col justify-center px-8 md:px-16">
      {slide.titleKey && (
        <h2 className="text-gradient-yellow mb-8 text-center text-3xl font-bold md:text-5xl">
          {t(slide.titleKey)}
        </h2>
      )}
      {slide.subtitleKey && (
        <p className="mx-auto mb-8 max-w-2xl text-center text-base text-muted-foreground">
          {t(slide.subtitleKey)}
        </p>
      )}
      <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {slide.items?.map((item, i) => (
          <div key={i} className="glass-card rounded-xl p-5">
            <h3 className="mb-2 text-sm font-bold text-brand-yellow">
              {item.titleKey ? t(item.titleKey) : item.title}
            </h3>
            {(item.descKey || item.desc) && (
              <p className="text-xs text-muted-foreground">
                {item.descKey ? t(item.descKey) : item.desc}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function QuoteSlide({ slide }: SlideRendererProps) {
  const { t } = useTranslation();
  const metricKey = slide.customData?.metric;
  return (
    <div className="flex h-full flex-col items-center justify-center px-8 text-center md:px-16">
      {metricKey && (
        <p className="mb-4 font-mono text-2xl font-bold text-brand-yellow md:text-4xl">
          {t(metricKey)}
        </p>
      )}
      <blockquote className="max-w-4xl text-lg italic text-foreground md:text-2xl lg:text-3xl">
        &ldquo;{slide.titleKey ? t(slide.titleKey) : ''}&rdquo;
      </blockquote>
      {slide.subtitleKey && (
        <p className="mt-6 text-base font-semibold text-brand-yellow md:text-lg">
          — {t(slide.subtitleKey)}
        </p>
      )}
    </div>
  );
}

function PricingCardSlide({ slide }: SlideRendererProps) {
  const { t } = useTranslation();
  const { tiers } = usePricing();
  const showTiers = slide.customData?.showTiers === 'true';

  return (
    <div className="flex h-full flex-col justify-center px-8 md:px-16">
      <h2 className="text-gradient-yellow mb-8 text-center text-3xl font-bold md:text-5xl">
        {slide.titleKey ? t(slide.titleKey) : ''}
      </h2>
      {slide.subtitleKey && (
        <p className="mx-auto mb-8 max-w-2xl text-center text-base text-muted-foreground">
          {t(slide.subtitleKey)}
        </p>
      )}
      {showTiers && (
        <div className="mx-auto grid max-w-4xl gap-4 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.trackId}
              className={`glass-card flex flex-col items-center rounded-xl p-6 text-center ${
                tier.featured ? 'ring-2 ring-brand-yellow' : ''
              }`}
            >
              <h3 className="mb-2 text-lg font-bold">{tier.name}</h3>
              <div className="mb-2">
                {tier.originalPrice && (
                  <span className="me-2 text-sm text-muted-foreground line-through">
                    ${tier.originalPrice}
                  </span>
                )}
                <span className="text-3xl font-bold text-brand-yellow">${tier.price}</span>
              </div>
              <p className="text-xs text-muted-foreground">{tier.period}</p>
              {tier.featured && (
                <span className="mt-2 rounded-full bg-brand-yellow/20 px-3 py-0.5 text-xs font-semibold text-brand-yellow">
                  {tier.badge}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
      {!showTiers && (
        <div className="mx-auto grid max-w-5xl gap-4 lg:grid-cols-3">
          {['traditional', 'tools', 'realize'].map((col) => (
            <div
              key={col}
              className={`glass-card flex flex-col rounded-xl p-6 ${
                col === 'realize' ? 'ring-2 ring-brand-yellow' : ''
              }`}
            >
              <h3 className="mb-2 text-lg font-bold">
                {t(`comparison.columns.${col}.header`)}
              </h3>
              <p className="mb-4 text-2xl font-bold text-brand-yellow">
                {t(`comparison.columns.${col}.price`)}
                <span className="text-sm text-muted-foreground">
                  {t(`comparison.columns.${col}.priceSuffix`)}
                </span>
              </p>
              <ul className="space-y-2">
                {(t(`comparison.columns.${col}.items`, { returnObjects: true }) as string[]).map(
                  (item: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <span className={`mt-0.5 ${col === 'realize' ? 'text-brand-yellow' : 'text-muted-foreground'}`}>
                        {col === 'realize' ? '\u2713' : '\u2014'}
                      </span>
                      {item}
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function DemoSlide({ slide }: SlideRendererProps) {
  const { t } = useTranslation();
  const Illust = getIllustration(slide.illustration);
  return (
    <div className="flex h-full flex-col items-center justify-center px-8 text-center md:px-16">
      {Illust ? (
        <div className="illustration-glow mb-6">
          <Illust className="h-64 w-64 md:h-80 md:w-80" />
        </div>
      ) : (
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-brand-yellow/20">
          <span className="text-4xl">{'\u25B6'}</span>
        </div>
      )}
      <h2 className="text-gradient-yellow text-glow-yellow text-4xl font-bold md:text-6xl">
        {slide.titleKey ? t(slide.titleKey) : ''}
      </h2>
      {slide.subtitleKey && (
        <p className="mt-4 text-lg text-muted-foreground md:text-xl">
          {t(slide.subtitleKey)}
        </p>
      )}
    </div>
  );
}

function QASlide({ slide }: SlideRendererProps) {
  const { t } = useTranslation();
  const meetLink = slide.customData?.meetLink ? t(slide.customData.meetLink) : undefined;
  return (
    <div className="flex h-full flex-col items-center justify-center px-8 text-center md:px-16">
      <h2 className="text-gradient-yellow text-glow-yellow mb-6 text-4xl font-bold md:text-6xl">
        {slide.titleKey ? t(slide.titleKey) : ''}
      </h2>
      {slide.subtitleKey && (
        <p className="text-lg text-muted-foreground md:text-2xl">
          {t(slide.subtitleKey)}
        </p>
      )}
      {meetLink && (
        <p className="mt-6 font-mono text-sm text-brand-yellow/70">{meetLink}</p>
      )}
    </div>
  );
}

function StatSlide({ slide }: SlideRendererProps) {
  const { t } = useTranslation();
  return (
    <div className="flex h-full flex-col items-center justify-center px-8 text-center md:px-16">
      <p className="font-mono text-6xl font-bold text-brand-yellow md:text-8xl">
        {slide.titleKey ? t(slide.titleKey) : ''}
      </p>
      {slide.subtitleKey && (
        <p className="mt-4 text-lg text-muted-foreground md:text-2xl">
          {t(slide.subtitleKey)}
        </p>
      )}
    </div>
  );
}

function SplitSlide({ slide }: SlideRendererProps) {
  const { t } = useTranslation();
  const Illust = getIllustration(slide.illustration);
  const isRTL = typeof document !== 'undefined' && document.documentElement.dir === 'rtl';

  return (
    <div className={`flex h-full items-center gap-8 px-8 md:px-16 ${isRTL ? 'flex-row-reverse' : 'flex-row'} max-md:flex-col max-md:justify-center`}>
      {/* Text side - 60% */}
      <div className="flex w-full flex-col justify-center md:w-3/5">
        {slide.titleKey && (
          <h2
            className="text-gradient-yellow mb-4 text-3xl font-bold md:text-5xl"
            dangerouslySetInnerHTML={{ __html: t(slide.titleKey) }}
          />
        )}
        {slide.subtitleKey && (
          <p className="mb-4 text-base text-muted-foreground md:text-lg">
            {t(slide.subtitleKey)}
          </p>
        )}
        {slide.bodyKeys?.map((key) => (
          <p key={key} className="mb-3 max-w-2xl text-base text-muted-foreground md:text-lg" dangerouslySetInnerHTML={{ __html: nl2br(t(key)) }} />
        ))}
        {slide.listKeys && slide.listKeys.length > 0 && (
          <ul className="mt-2 space-y-2">
            {slide.listKeys.map((key, i) => (
              <li key={key} className="flex items-start gap-3 text-base text-foreground">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-yellow/20 font-mono text-xs font-bold text-brand-yellow">
                  {i + 1}
                </span>
                <span dangerouslySetInnerHTML={{ __html: t(key) }} />
              </li>
            ))}
          </ul>
        )}
        {slide.items && slide.items.length > 0 && (
          <ul className="mt-2 space-y-2">
            {slide.items.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-base text-foreground">
                <span className="mt-1 text-brand-yellow">&#10003;</span>
                <span>{item.titleKey ? t(item.titleKey) : item.title}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Illustration side - 40% */}
      {Illust && (
        <div className="flex w-full items-center justify-center md:w-2/5">
          <div className="illustration-glow">
            <Illust className="h-48 w-48 md:h-64 md:w-64 lg:h-80 lg:w-80" />
          </div>
        </div>
      )}
    </div>
  );
}

function StatGridSlide({ slide }: SlideRendererProps) {
  const { t } = useTranslation();
  const count = slide.items?.length || 2;
  const gridClass = count <= 2
    ? 'flex flex-wrap justify-center gap-12 md:gap-20'
    : count === 3
      ? 'grid grid-cols-3 gap-6'
      : 'grid grid-cols-2 gap-6 lg:grid-cols-4';
  return (
    <div className="dot-grid flex h-full flex-col items-center justify-center px-8 md:px-16">
      {slide.titleKey && (
        <h2 className="text-gradient-yellow mb-10 text-center text-3xl font-bold md:text-5xl">
          {t(slide.titleKey)}
        </h2>
      )}
      <div className={`w-full max-w-4xl ${gridClass}`}>
        {slide.items?.map((item, i) => (
          <div key={i} className="flex flex-col items-center text-center">
            <span className="font-mono text-5xl font-bold text-brand-yellow md:text-6xl lg:text-7xl">
              {item.titleKey ? t(item.titleKey) : item.title}
            </span>
            <span className="mt-2 text-sm text-muted-foreground md:text-base">
              {item.descKey ? t(item.descKey) : item.desc}
            </span>
          </div>
        ))}
      </div>
      {slide.subtitleKey && (
        <p className="mt-8 max-w-2xl text-center text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: nl2br(t(slide.subtitleKey)) }} />
      )}
    </div>
  );
}

function IllustrationSlide({ slide }: SlideRendererProps) {
  const { t } = useTranslation();
  const Illust = getIllustration(slide.illustration);
  return (
    <div className="flex h-full flex-col items-center justify-center px-8 text-center md:px-16">
      {Illust && (
        <div className="illustration-glow mb-8">
          <Illust className="h-48 w-48 md:h-64 md:w-64 lg:h-72 lg:w-72" />
        </div>
      )}
      {slide.titleKey && (
        <h2
          className="text-gradient-yellow text-glow-yellow text-3xl font-bold md:text-5xl lg:text-6xl"
          dangerouslySetInnerHTML={{ __html: t(slide.titleKey) }}
        />
      )}
      {slide.subtitleKey && (
        <p className="mt-4 max-w-3xl text-base text-muted-foreground md:text-xl" dangerouslySetInnerHTML={{ __html: nl2br(t(slide.subtitleKey)) }} />
      )}
      {slide.bodyKeys?.map((key) => (
        <p key={key} className="mt-4 max-w-2xl text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: nl2br(t(key)) }} />
      ))}
    </div>
  );
}

function BeforeAfterSlide({ slide }: SlideRendererProps) {
  const { t } = useTranslation();
  const BeforeIllust = getIllustration(slide.customData?.beforeIllustration);
  const AfterIllust = getIllustration(slide.customData?.afterIllustration);

  const beforeItems = slide.customData?.beforeItems?.split(',') || [];
  const afterItems = slide.customData?.afterItems?.split(',') || [];

  return (
    <div className="flex h-full flex-col items-center justify-center px-8 md:px-16">
      {slide.titleKey && (
        <h2 className="text-gradient-yellow mb-8 text-center text-3xl font-bold md:text-5xl">
          {t(slide.titleKey)}
        </h2>
      )}
      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
        {/* Before panel */}
        <div className="glass-card rounded-xl border border-destructive/20 p-6">
          {BeforeIllust && (
            <div className="mb-4 flex justify-center opacity-60">
              <BeforeIllust className="h-16 w-16" />
            </div>
          )}
          <h3 className="mb-3 text-center text-lg font-bold text-destructive">
            {slide.customData?.beforeTitle ? t(slide.customData.beforeTitle) : ''}
          </h3>
          <ul className="space-y-2">
            {beforeItems.map((key, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-0.5 text-destructive">{'\u2717'}</span>
                {t(key.trim())}
              </li>
            ))}
          </ul>
        </div>
        {/* After panel */}
        <div className="glass-card rounded-xl border border-brand-yellow/30 p-6">
          {AfterIllust && (
            <div className="mb-4 flex justify-center">
              <AfterIllust className="h-16 w-16" />
            </div>
          )}
          <h3 className="mb-3 text-center text-lg font-bold text-brand-yellow">
            {slide.customData?.afterTitle ? t(slide.customData.afterTitle) : ''}
          </h3>
          <ul className="space-y-2">
            {afterItems.map((key, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                <span className="mt-0.5 text-brand-yellow">{'\u2713'}</span>
                {t(key.trim())}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

const layoutMap: Record<string, React.ComponentType<SlideRendererProps>> = {
  title: TitleSlide,
  'title-body': TitleBodySlide,
  'two-column': TitleBodySlide,
  list: ListSlide,
  'feature-card': FeatureCardSlide,
  'pricing-card': PricingCardSlide,
  quote: QuoteSlide,
  stat: StatSlide,
  demo: DemoSlide,
  qa: QASlide,
  // New visual layouts
  split: SplitSlide,
  'stat-grid': StatGridSlide,
  illustration: IllustrationSlide,
  'before-after': BeforeAfterSlide,
};

export function SlideRenderer({ slide }: SlideRendererProps) {
  const Component = layoutMap[slide.layout] || TitleSlide;
  return <Component slide={slide} />;
}
