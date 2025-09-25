import { useState, useEffect } from 'react';

interface CookieConsent {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

const CONSENT_KEY = 'cookie-consent';
const CONSENT_VERSION = '1.0';

export const useCookieConsent = () => {
  const [hasConsented, setHasConsented] = useState<boolean | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [consent, setConsent] = useState<CookieConsent>({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false,
  });

  useEffect(() => {
    const savedConsent = localStorage.getItem(CONSENT_KEY);
    
    if (savedConsent) {
      try {
        const parsed = JSON.parse(savedConsent);
        if (parsed.version === CONSENT_VERSION) {
          setConsent(parsed.consent);
          setHasConsented(true);
          setShowBanner(false);
        } else {
          // Version changed, show banner again
          setShowBanner(true);
          setHasConsented(false);
        }
      } catch {
        // Invalid data, show banner
        setShowBanner(true);
        setHasConsented(false);
      }
    } else {
      // No consent found, show banner
      setShowBanner(true);
      setHasConsented(false);
    }
  }, []);

  const saveConsent = (newConsent: CookieConsent) => {
    const consentData = {
      version: CONSENT_VERSION,
      timestamp: new Date().toISOString(),
      consent: newConsent,
    };
    
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consentData));
    setConsent(newConsent);
    setHasConsented(true);
    setShowBanner(false);
  };

  const acceptAll = () => {
    saveConsent({
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    });
  };

  const acceptNecessaryOnly = () => {
    saveConsent({
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    });
  };

  const updateConsent = (newConsent: Partial<CookieConsent>) => {
    const updatedConsent = { ...consent, ...newConsent };
    saveConsent(updatedConsent);
  };

  return {
    hasConsented,
    showBanner,
    consent,
    acceptAll,
    acceptNecessaryOnly,
    updateConsent,
    setShowBanner,
  };
};