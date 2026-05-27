import { Button } from '@/components/ui/button';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useTranslation } from 'react-i18next';

export function MobileStickyBar() {
  const scrollY = useScrollPosition();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { t } = useTranslation();

  if (!isMobile) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/90 px-4 py-3 backdrop-blur-lg transition-transform duration-300"
      style={{ transform: scrollY < 400 ? 'translateY(100%)' : 'translateY(0)' }}
    >
      <Button asChild className="w-full" size="sm">
        <a href="#pricing">{t('nav.getStarted', 'Get Started')}</a>
      </Button>
    </div>
  );
}
