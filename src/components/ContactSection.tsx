import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, Phone, Calendar, ArrowRight } from "lucide-react";

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
    <section className={`py-16 px-4 ${className}`}>
      <div className="max-w-4xl mx-auto text-center">
        {/* Rubrik */}
        <h2 className="font-logo text-4xl md:text-5xl mb-4 text-logo-text">
          {title}
        </h2>
        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
          {subtitle}
        </p>

        {/* Kontaktkort */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* E-post */}
          <Card className="p-6 leather-card hover:shadow-elegant transition-all duration-300">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-foreground">E-post</h3>
                <a 
                  href="mailto:info@sadelmakaren.se"
                  className="text-primary hover:underline transition-colors"
                >
                  info@sadelmakaren.se
                </a>
              </div>
            </div>
          </Card>

          {/* Telefon */}
          <Card className="p-6 leather-card hover:shadow-elegant transition-all duration-300">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-foreground">Telefon</h3>
                <a 
                  href="tel:+46701234567"
                  className="text-primary hover:underline transition-colors"
                >
                  070-123 45 67
                </a>
              </div>
            </div>
          </Card>

          {/* Konsultation */}
          <Card className="p-6 leather-card hover:shadow-elegant transition-all duration-300">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-foreground">Konsultation</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Boka en personlig rådgivning
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Boka konsultation-knapp */}
        <div className="flex justify-center">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSd35Iup_nlptG-ODKW089-l7iT_y16tMiLd_c4xodFR5PKhBA/viewform?usp=header"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button 
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-craft"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Boka kostnadsfri konsultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </a>
        </div>

        {/* Öppettider info */}
        <div className="mt-8 p-4 rounded-lg bg-secondary/30">
          <p className="text-sm text-muted-foreground">
            <strong>Öppettider:</strong> Måndag-Fredag 09:00-17:00 | 
            <strong className="ml-2">Helger:</strong> Efter överenskommelse
          </p>
        </div>
      </div>
    </section>
  );
};