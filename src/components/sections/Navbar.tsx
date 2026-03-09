import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Logo } from '@/components/layout/Logo';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { useTranslation } from 'react-i18next';
import { NAV_ITEMS } from '@/lib/constants';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';

export function Navbar() {
  const scrollY = useScrollPosition();
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <nav
      className="glass fixed inset-x-0 top-0 z-50 transition-all duration-300"
      style={{
        borderBottom: `1px solid rgba(255,255,255,${scrollY > 50 ? 0.1 : 0.05})`,
      }}
    >
      <div className="mx-auto flex max-w-site items-center gap-4 justify-between px-5 py-3">
        <a href="#" className="flex items-center gap-0">
          <Logo />
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {t(`navItems.${item.label.toLowerCase()}`)}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3 ms-auto md:ms-0">
          <LanguageSwitcher />
          <Button asChild size="sm" className="hidden md:inline-flex">
            <a href="#pricing">{t('nav.getStarted')}</a>
          </Button>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">{t('nav.toggleMenu')}</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="glass w-64 border-border">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <div className="mt-8 flex flex-col gap-6">
                {NAV_ITEMS.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="text-lg font-medium text-foreground transition-colors hover:text-brand-yellow"
                  >
                    {t(`navItems.${item.label.toLowerCase()}`)}
                  </a>
                ))}
                <Button asChild className="mt-4">
                  <a href="#pricing" onClick={() => setOpen(false)}>
                    {t('nav.getStarted')}
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
