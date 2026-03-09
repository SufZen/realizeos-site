import { Logo } from '@/components/layout/Logo';
import { LINKS } from '@/lib/constants';
import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto max-w-site px-5">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-center md:text-start">
            <Logo />
            <p className="mt-1 text-sm text-muted-foreground">
              {t('footer.partOf')}{' '}
              <a
                href={LINKS.realization}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-yellow hover:underline"
              >
                {t('footer.realization')}
              </a>{' '}
              {t('footer.ecosystem')}
            </p>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <a
              href={LINKS.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-brand-yellow"
            >
              {t('footer.links.telegram')}
            </a>
            <a
              href={`mailto:${LINKS.supportEmail}`}
              className="text-muted-foreground hover:text-brand-yellow"
            >
              {t('footer.links.support')}
            </a>
            <a href="#faq" className="text-muted-foreground hover:text-brand-yellow">
              {t('footer.links.faq')}
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} {t('footer.rights')}
        </div>
      </div>
    </footer>
  );
}
