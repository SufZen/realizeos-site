import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 border-t border-border p-4 shadow-xl backdrop-blur-sm">
      <div className="container max-w-site mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground text-center md:text-left">
          We use cookies to improve your experience and ensure compliance with European privacy laws. 
          By continuing to use our website, you agree to our <Link to="/privacy" className="text-primary hover:underline font-medium">Privacy Policy</Link>.
        </p>
        <button
          onClick={handleAccept}
          className="whitespace-nowrap rounded-md bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none"
        >
          Accept Cookies
        </button>
      </div>
    </div>
  );
}
