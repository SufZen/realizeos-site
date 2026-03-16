import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Section } from '@/components/layout/Section';
import { SectionHeader } from '@/components/layout/SectionHeader';
import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';

function AccessRequired() {
  const { t } = useTranslation();
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 items-center justify-center px-5 pt-24">
        <AnimateOnScroll>
          <div className="glass-card mx-auto max-w-md rounded-2xl p-8 text-center">
            <h2 className="mb-4 text-2xl font-bold">{t('webinar.booking.accessRequired')}</h2>
            <p className="mb-6 text-muted-foreground">{t('webinar.booking.accessMessage')}</p>
            <Button asChild size="lg">
              <a href="/#pricing">{t('webinar.booking.goToPricing')}</a>
            </Button>
          </div>
        </AnimateOnScroll>
      </main>
      <Footer />
    </div>
  );
}

function BookingContent() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const isSuccess = searchParams.get('token') === 'success';

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pt-24">
        {isSuccess && (
          <Section>
            <AnimateOnScroll>
              <div className="mx-auto max-w-2xl rounded-2xl border border-brand-yellow/20 bg-brand-yellow/5 p-8 text-center">
                <Badge className="mb-4 bg-brand-yellow text-primary-foreground">
                  {t('webinar.booking.successTitle')}
                </Badge>
                <p className="text-muted-foreground">{t('webinar.booking.successMessage')}</p>
              </div>
            </AnimateOnScroll>
          </Section>
        )}

        <Section>
          <SectionHeader
            title={t('webinar.booking.title')}
            subtitle={t('webinar.booking.subtitle')}
          />

          <AnimateOnScroll>
            <div className="mx-auto max-w-2xl">
              {/* Setup Call Booking */}
              <div className="glass-card mb-8 rounded-2xl p-8 text-center">
                <h3 className="mb-4 text-xl font-bold">{t('webinar.booking.setupCall')}</h3>
                <div className="flex min-h-[200px] items-center justify-center rounded-xl border border-border bg-muted/30 p-6">
                  <p className="text-sm text-muted-foreground">
                    {t('webinar.booking.calendarPlaceholder')}
                  </p>
                </div>
              </div>

              {/* Upcoming Webinars */}
              <div className="glass-card rounded-2xl p-8 text-center">
                <h3 className="mb-4 text-xl font-bold">{t('webinar.booking.upcoming')}</h3>
                <p className="mb-6 text-muted-foreground">
                  {t('webinar.booking.upcomingDescription')}
                </p>
                <Button asChild variant="outline" size="lg">
                  <a
                    href="https://meet.google.com/vcr-zgsw-xix"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('webinar.booking.joinWebinar')}
                  </a>
                </Button>
              </div>
            </div>
          </AnimateOnScroll>
        </Section>
      </main>
      <Footer />
    </div>
  );
}

export default function WebinarBooking() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const mode = searchParams.get('mode');
  const hasAccess = token === 'success' || mode === 'open';

  if (!hasAccess) {
    return <AccessRequired />;
  }

  return <BookingContent />;
}
