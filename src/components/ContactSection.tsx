import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, Phone, Calendar, Instagram, ArrowRight } from "lucide-react";

// ─────────────────────────────────────────────
// 👇 Byt till `false` för att gå tillbaka till kontaktkorten
const FULL_CONTACT_PAGE = true;
// ─────────────────────────────────────────────

interface ContactSectionProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export const ContactSection = ({ 
  title = "Har du några frågor?", 
  subtitle = "Tveka inte att höra av dig - jag hjälper gärna till med råd och konsultation.",
  className = ""
}: ContactSectionProps) => {
  return (
    <section className={`py-16 px-4 ${className}`} style={{ backgroundColor: "var(--background)" }}>
      <div className="max-w-4xl mx-auto text-center">

        {/* Rubrik */}
        <h2 className="font-logo text-4xl md:text-5xl mb-4 text-logo-text">
          {title}
        </h2>
        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
          {subtitle}
        </p>

        {FULL_CONTACT_PAGE ? (
          // ── Enkel kontaktsida ─────────────────────────────────
          <div className="flex flex-col items-center gap-6">
            <a href="mailto:info@remsnidare.se">
              <Button size="lg" className="w-64 text-lg">
                <Mail className="mr-2 h-5 w-5" />
                info@remsnidare.se
              </Button>
            </a>
            <a href="https://www.instagram.com/j_remsnidare/" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="w-64 text-lg">
                <Instagram className="mr-2 h-5 w-5" />
                @j_remsnidare
              </Button>
            </a>
            <p className="text-sm text-muted-foreground mt-2">
              Telefon (endast SMS): <a href="sms:+46736877708" className="text-primary hover:underline">073-6877708</a>
            </p>
            <div className="mt-4 p-4 rounded-lg bg-secondary/30">
              <p className="text-sm text-foreground">
                <strong>Öppettider:</strong> Måndag-Fredag 09:00-17:00 | 
                <strong className="ml-2">Helger:</strong> Efter överenskommelse
              </p>
            </div>
          </div>
          // ─────────────────────────────────────────────────────
        ) : (
          // ── Ursprungliga kontaktkorten ────────────────────────
          <>
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              {/* E-post */}
              <Card className="p-6 bg-beige-100 hover:shadow-elegant transition-all duration-300 hover:bg-beige-800 hover:text-beige-900">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg mb-2 text-foreground">E-post</h3>
                    <a href="mailto:info@remsnidare.se" className="text-primary hover:underline transition-colors">
                      info@remsnidare.se
                    </a>
                  </div>
                </div>
              </Card>

              {/* Telefon */}
              <Card className="p-6 bg-beige-100 hover:shadow-elegant transition-all duration-300 hover:bg-beige-800 hover:text-beige-900">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg mb-2 text-foreground">Telefon (Endast SMS)</h3>
                    <a href="tel:+073-6877708 (OBS! Endast SMS)" className="text-primary hover:underline transition-colors">
                      073-6877708
                    </a>
                  </div>
                </div>
              </Card>

              {/* Konsultation */}
              <Card className="p-6 bg-beige-100 hover:shadow-elegant transition-all duration-300 hover:bg-beige-800 hover:text-beige-900">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg mb-2 text-foreground">Konsultation</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Boka en personlig rådgivning
                    </p>
                  </div>
                </div>
              </Card>

              {/* Instagram */}
              <Card className="p-6 bg-beige-100 hover:shadow-elegant transition-all duration-300 hover:bg-beige-800 hover:text-beige-900">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Instagram className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg mb-2 text-foreground">Instagram</h3>
                    <a href="https://www.instagram.com/j_remsnidare/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline transition-colors">
                      @j_remsnidare
                    </a>
                  </div>
                </div>
              </Card>
            </div>

            {/* Öppettider info */}
            <div className="mt-8 p-4 rounded-lg bg-secondary/30">
              <p className="text-sm text-foreground">
                <strong>Öppettider:</strong> Måndag-Fredag 09:00-17:00 | 
                <strong className="ml-2">Helger:</strong> Efter överenskommelse
              </p>
            </div>
          </>
          // ─────────────────────────────────────────────────────
        )}

      </div>
    </section>
  );
};
