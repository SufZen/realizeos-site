import { Section } from '@/components/layout/Section';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import {
  StepPurchaseIcon,
  StepAccessIcon,
  StepConfigureIcon,
  StepConversationIcon,
  StepBuildIcon,
} from '@/components/illustrations';

const stepIcons = [
  StepPurchaseIcon,
  StepAccessIcon,
  StepConfigureIcon,
  StepConversationIcon,
  StepBuildIcon,
] as const;

interface HowItWorksProps {
  onOpenWizard: () => void;
}

export function HowItWorks({ onOpenWizard }: HowItWorksProps) {
  const { t } = useTranslation();

  const steps = (t('howItWorks.steps', { returnObjects: true }) as Array<{
    title: string;
    description: string;
    time?: string;
  }>).map((step, index) => ({
    number: index + 1,
    ...step
  }));

  return (
    <Section id="how">
      <SectionHeader
        title={t('howItWorks.header.title')}
        subtitle={t('howItWorks.header.subtitle')}
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {steps.map((step, i) => (
          <AnimateOnScroll key={step.number} delay={i * 0.08}>
            <div className="glass-card flex h-full flex-col rounded-xl p-5 text-center">
              {(() => {
                const StepIcon = stepIcons[i];
                return StepIcon ? <StepIcon className="mx-auto mb-2 h-12 w-12" /> : null;
              })()}
              <span className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-brand-yellow/10 font-mono text-lg font-bold text-brand-yellow">
                {step.number}
              </span>
              <h3 className="mb-2 text-sm font-semibold">{step.title}</h3>
              <p className="flex-1 text-xs text-muted-foreground">{step.description}</p>
              {step.time && (
                <Badge variant="secondary" className="mx-auto mt-3 text-[10px]">
                  {step.time}
                </Badge>
              )}
              {i === 2 && (
                <Button
                  variant="outline"
                  size="sm"
                  className="mx-auto mt-3 border-brand-yellow/40 text-[10px] text-brand-yellow hover:bg-brand-yellow/10"
                  onClick={onOpenWizard}
                >
                  Launch Brand Wizard →
                </Button>
              )}
            </div>
          </AnimateOnScroll>
        ))}
      </div>
    </Section>
  );
}
