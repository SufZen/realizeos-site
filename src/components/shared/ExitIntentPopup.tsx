import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useExitIntent } from '@/hooks/useExitIntent';
import { WEBHOOK_URL } from '@/lib/constants';
import { trackEvent } from '@/lib/analytics';
import { useState } from 'react';

export function ExitIntentPopup() {
  const { visible, dismiss } = useExitIntent();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');

    try {
      const resp = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source: 'exit-popup',
          timestamp: new Date().toISOString(),
        }),
      });
      if (resp.ok || resp.status === 0) {
        setStatus('success');
        trackEvent('email_capture', { source: 'exit-popup' });
      } else {
        throw new Error('Failed');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <Dialog open={visible} onOpenChange={(open) => !open && dismiss()}>
      <DialogContent className="glass border-border sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Before you go...</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Get the free <strong className="text-foreground">FABRIC Architecture Guide</strong> and
            see how coordinated AI agents can transform your operations.
          </DialogDescription>
        </DialogHeader>
        {status === 'success' ? (
          <p className="py-2 font-medium text-brand-yellow">Thanks! Check your inbox.</p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-2 flex gap-2">
            <Input
              type="email"
              placeholder="your@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={status === 'loading'}>
              {status === 'loading' ? 'Sending...' : 'Get the Free Guide'}
            </Button>
          </form>
        )}
        <p className="text-xs text-muted-foreground">
          No spam. Just the guide + occasional updates.
        </p>
      </DialogContent>
    </Dialog>
  );
}
