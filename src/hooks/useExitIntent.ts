import { useState, useEffect, useCallback } from 'react';

export function useExitIntent() {
  const [triggered, setTriggered] = useState(false);
  const [visible, setVisible] = useState(false);

  const dismiss = useCallback(() => {
    setVisible(false);
    sessionStorage.setItem('exitPopupDismissed', 'true');
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem('exitPopupDismissed')) return;

    const handleMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0 && !triggered) {
        setTriggered(true);
        setVisible(true);
      }
    };

    document.addEventListener('mouseout', handleMouseOut);
    return () => document.removeEventListener('mouseout', handleMouseOut);
  }, [triggered]);

  return { visible, dismiss };
}
