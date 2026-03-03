import { useState } from 'react';
import { Section } from '@/components/layout/Section';
import { AnimateOnScroll } from '@/components/shared/AnimateOnScroll';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { STRIPE_URLS, WEBHOOK_URL } from '@/lib/constants';
import { trackEvent } from '@/lib/analytics';

export function FinalCTA() {
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [challenge, setChallenge] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setFormState('loading');

    try {
      const resp = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name || 'Anonymous',
          email,
          challenge,
          source: 'email-form',
          timestamp: new Date().toISOString(),
        }),
      });
      if (resp.ok || resp.status === 0) {
        setFormState('success');
        trackEvent('email_capture', { source: 'email-form' });
      } else {
        throw new Error('Failed');
      }
    } catch {
      setFormState('error');
    }
  }

  return (
    <Section id="final-cta">
      <AnimateOnScroll>
        <div className="text-center">
          <h2 className="text-gradient-yellow text-3xl font-bold md:text-4xl">
            Start Building Your
            <br />
            AI Operations System
          </h2>
          <p className="mt-4 text-muted-foreground">
            One-time purchase. Complete ownership. No recurring fees.
          </p>
          <div className="mt-6">
            <Button
              asChild
              size="lg"
              onClick={() => trackEvent('cta_click', { cta_name: 'final-cta' })}
            >
              <a href={STRIPE_URLS.full}>Get RealizeOS</a>
            </Button>
          </div>
        </div>
      </AnimateOnScroll>

      <AnimateOnScroll delay={0.2}>
        <div className="mx-auto mt-16 max-w-lg">
          <div className="glass-card rounded-xl p-6 text-center">
            <h3 className="mb-2 text-lg font-semibold">Not ready yet?</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Start with the free Brand Discovery Worksheet — 10 questions that help you define your
              brand for any AI tool. Or get the FABRIC Architecture Guide:
            </p>

            {formState === 'success' ? (
              <p className="py-2 font-medium text-brand-yellow">
                Thanks! Check your inbox for the architecture guide.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <Input
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <Input
                  placeholder="What's your biggest AI operations challenge?"
                  value={challenge}
                  onChange={(e) => setChallenge(e.target.value)}
                />
                <Button type="submit" className="w-full" disabled={formState === 'loading'}>
                  {formState === 'loading' ? 'Sending...' : 'Get the Free Guide'}
                </Button>
              </form>
            )}

            {formState === 'error' && (
              <p className="mt-2 text-sm text-destructive">
                Something went wrong. Please try again or email us directly.
              </p>
            )}
          </div>
        </div>
      </AnimateOnScroll>
    </Section>
  );
}
