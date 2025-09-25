import { useState } from 'react';
import { useCookieConsent } from '@/hooks/useCookieConsent';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Shield, Cookie, Settings, Check, X } from 'lucide-react';

export const CookieConsent = () => {
  const {
    showBanner,
    consent,
    acceptAll,
    acceptNecessaryOnly,
    updateConsent,
    setShowBanner,
  } = useCookieConsent();

  const [showDetails, setShowDetails] = useState(false);
  const [tempConsent, setTempConsent] = useState(consent);

  if (!showBanner) return null;

  const handleCustomSave = () => {
    updateConsent(tempConsent);
    setShowDetails(false);
  };

  return (
    <>
      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background/95 backdrop-blur-sm border-t border-border shadow-elegant">
        <Card className="max-w-4xl mx-auto p-6 leather-card">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex items-center gap-3">
              <Cookie className="h-6 w-6 text-primary flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-2">
                  Vi använder cookies
                </h3>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  Denna webbplats använder cookies för att förbättra din upplevelse. 
                  Vi använder nödvändiga cookies för grundfunktioner och kan använda 
                  analytiska cookies för att förstå hur du använder vår webbplats.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDetails(true)}
                className="whitespace-nowrap"
              >
                <Settings className="h-4 w-4 mr-2" />
                Anpassa
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={acceptNecessaryOnly}
                className="whitespace-nowrap"
              >
                <X className="h-4 w-4 mr-2" />
                Endast nödvändiga
              </Button>
              <Button
                size="sm"
                onClick={acceptAll}
                className="whitespace-nowrap bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Check className="h-4 w-4 mr-2" />
                Acceptera alla
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Detailed Settings Dialog */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Cookie-inställningar
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-foreground mb-2">
                Hantera dina cookie-preferenser
              </h4>
              <p className="text-sm text-foreground/80">
                Du kan välja vilka typer av cookies du vill tillåta. 
                Dina val kommer att sparas och respekteras vid framtida besök.
              </p>
            </div>

            {/* Necessary Cookies */}
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                <div className="flex-1">
                  <h5 className="font-medium text-foreground">
                    Nödvändiga cookies
                  </h5>
                  <p className="text-sm text-foreground/70 mt-1">
                    Dessa cookies är nödvändiga för webbplatsens grundfunktioner 
                    och kan inte avaktiveras.
                  </p>
                </div>
                <Switch checked={true} disabled className="ml-4" />
              </div>
            </div>

            {/* Analytics Cookies */}
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 rounded-lg bg-background">
                <div className="flex-1">
                  <h5 className="font-medium text-foreground">
                    Analytiska cookies
                  </h5>
                  <p className="text-sm text-foreground/70 mt-1">
                    Hjälper oss att förstå hur besökare interagerar med webbplatsen 
                    genom att samla in information anonymt.
                  </p>
                </div>
                <Switch
                  checked={tempConsent.analytics}
                  onCheckedChange={(checked) =>
                    setTempConsent({ ...tempConsent, analytics: checked })
                  }
                  className="ml-4"
                />
              </div>
            </div>

            {/* Marketing Cookies */}
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 rounded-lg bg-background">
                <div className="flex-1">
                  <h5 className="font-medium text-foreground">
                    Marknadsföringscookies
                  </h5>
                  <p className="text-sm text-foreground/70 mt-1">
                    Används för att visa relevanta annonser och mäta 
                    effektiviteten av marknadsföringskampanjer.
                  </p>
                </div>
                <Switch
                  checked={tempConsent.marketing}
                  onCheckedChange={(checked) =>
                    setTempConsent({ ...tempConsent, marketing: checked })
                  }
                  className="ml-4"
                />
              </div>
            </div>

            {/* Preferences Cookies */}
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 rounded-lg bg-background">
                <div className="flex-1">
                  <h5 className="font-medium text-foreground">
                    Preferenscookies
                  </h5>
                  <p className="text-sm text-foreground/70 mt-1">
                    Lagrar dina preferenser som språk, region och 
                    andra personliga inställningar.
                  </p>
                </div>
                <Switch
                  checked={tempConsent.preferences}
                  onCheckedChange={(checked) =>
                    setTempConsent({ ...tempConsent, preferences: checked })
                  }
                  className="ml-4"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                variant="outline"
                onClick={acceptNecessaryOnly}
                className="flex-1"
              >
                Endast nödvändiga
              </Button>
              <Button
                onClick={handleCustomSave}
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Spara inställningar
              </Button>
              <Button
                onClick={acceptAll}
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Acceptera alla
              </Button>
            </div>

            <div className="text-xs text-foreground/60 pt-4 border-t border-border">
              <p>
                För mer information om hur vi behandlar dina personuppgifter, 
                läs vår integritetspolicy. Du kan när som helst ändra dina 
                cookie-inställningar genom att klicka på cookie-ikonen i sidfoten.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};