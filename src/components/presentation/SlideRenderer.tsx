import { useTranslation } from 'react-i18next';
import type { Slide } from '@/data/presentationSlides';
import { usePricing } from '@/data/pricing';

// Note: dangerouslySetInnerHTML is used only for i18n translation strings from
// our own translation.json files (developer-controlled, trusted content).
// Some translation keys contain <br> tags for line breaks.

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
        <p className="mt-6 max-w-3xl text-lg text-muted-foreground md:text-2xl">
          {t(slide.subtitleKey)}
        </p>
      )}
    </div>
  );
}

function TitleBodySlide({ slide }: SlideRendererProps) {
  const { t } = useTranslation();
  return (
    <div className="flex h-full flex-col justify-center px-8 md:px-16 lg:px-24">
      <h2
        className="text-gradient-yellow mb-6 text-3xl font-bold md:text-5xl"
        dangerouslySetInnerHTML={{ __html: slide.titleKey ? t(slide.titleKey) : '' }}
      />
      {slide.bodyKeys?.map((key) => (
        <p key={key} className="mb-4 max-w-4xl text-base text-muted-foreground md:text-xl">
          {t(key)}
        </p>
      ))}
      {slide.customData?.promoCode && (
        <div className="my-4 inline-block rounded-xl border-2 border-brand-yellow bg-brand-yellow/10 px-8 py-3">
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
        <h2 className="text-gradient-yellow mb-8 text-3xl font-bold md:text-5xl">
          {t(slide.titleKey)}
        </h2>
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
  return (
    <div className="flex h-full flex-col items-center justify-center px-8 text-center md:px-16">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-brand-yellow/20">
        <span className="text-4xl">{'\u25B6'}</span>
      </div>
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
};

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

export function SlideRenderer({ slide }: SlideRendererProps) {
  const Component = layoutMap[slide.layout] || TitleSlide;
  return <Component slide={slide} />;
}
