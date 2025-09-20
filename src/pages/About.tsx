import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Footer from "@/components/ui/footer";
import { Badge } from "@/components/ui/badge";
import { Heart, Award, Users, Clock, Mail, Phone, MapPin } from "lucide-react";
import heroImage from "@/assets/hero-leather-workshop.jpg";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Passion",
      description: "Varje projekt genomsyras av vår kärlek för hantverk och kvalitet"
    },
    {
      icon: Award,
      title: "Tradition",
      description: "Tekniker som överförts genom generationer och förfinats över tid"
    },
    {
      icon: Users,
      title: "Gemenskap",
      description: "Vi bygger långvariga relationer med våra kunder och partners"
    }
  ];

  const milestones = [
      {
        year: "1985",
        title: "Sadelmakeriet grundas",
        description: "Första sadelmakeriet öppnas med fokus på kvalitet och hantverk"
      },
    {
      year: "1995",
      title: "Expansion",
      description: "Utökning till möbler och inredningsartiklar för kommersiella miljöer"
    },
    {
      year: "2005",
      title: "Nästa generation",
      description: "Familjeföretaget överlämnas och moderniseras samtidigt som traditionen bevaras"
    },
    {
      year: "2015",
      title: "Digital närvaro",
      description: "Lansering av webbshop och online-kurser för att nå fler kunder"
    },
    {
      year: "2024",
      title: "Idag",
      description: "En etablerad aktör inom läderhantverk med moderna metoder och traditionella värden"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20" style={{ backgroundColor: "var(--background)" }}>
      
        <div className="absolute inset-0 bg-gradient-hero"></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-white/20 var(--text) border-white">Vår berättelse</Badge>
          <h1 className="font-logo text-5xl md:text-8xl mb-6 leading-tight text-logo-text">
            Läderhantverket
            <br />

          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed var(--text)">
            Sedan 1985 har vi dedikerat oss åt att bevara och utveckla den traditionella 
            konsten att arbeta med läder. Vår resa började som en dröm och har vuxit 
            till en livslång passion.
          </p>
        </div>
      </section>

      {/* Story Section */}
            <section className="py-20" style={{ backgroundColor: "var(--background)" }}>
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-playfair text-4xl font-bold text-primary mb-6">
                Sadelmakaren berättar 
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Min kärlek för läderhantverk började redan som ung när jag fick möta 
                  en traditionell sadelmakare i min hemtrakt. Fascination för hur råa 
                  material kunde förvandlas till funktionella och vackra föremål 
                  väckte en passion som skulle komma att forma mitt liv.
                </p>
                <p>
                  Efter flera år som lärling och sedan som gesäll, öppnade jag mitt 
                  första eget sadelmakeri 1985. Redan från början var målet att 
                  kombinera traditionella tekniker med modern design och funktionalitet.
                </p>
                <p>
                  Idag fortsätter denna tradition genom att vi inte bara skapar 
                  unika produkter, utan också delar vår kunskap genom kurser och 
                  workshops. Varje elev, varje kund som lämnar vår verkstad bär 
                  med sig en del av denna passion vidare.
                </p>
              </div>
              <div className="mt-8">
              <p className="font-playfair text-xl text-primary italic">
                "Hantverk handlar inte bara om teknik - det handlar om att sätta sin själ i varje stygn."
              </p>
              <p className="text-muted-foreground mt-2">— Lars, Grundare av Sadelmakeriet</p>
              </div>
            </div>
            <div className="space-y-6">
             {/* <Card className="leather-card p-6">
                <h3 className="font-playfair text-xl font-semibold mb-4">Vårt hantverk i siffror</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="font-bold text-3xl text-primary">40+</div>
                    <div className="text-sm text-muted-foreground">År av erfarenhet</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-3xl text-primary">2000+</div>
                    <div className="text-sm text-muted-foreground">Nöjda kunder</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-3xl text-primary">500+</div>
                    <div className="text-sm text-muted-foreground">Kursdeltagare</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-3xl text-primary">100+</div>
                    <div className="text-sm text-muted-foreground">Projekt årligen</div>
                  </div>
                </div>*/}
           
             {/* <Card className="leather-card p-6">
                <h3 className="font-playfair text-xl font-semibold mb-4">Kontakta oss</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-primary mr-3" />
                    <span>Hantverkargatan 42, Stockholm</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-primary mr-3" />
                    <span>+46 XXX XX XX XX</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-primary mr-3" />
                    <span>info@sadelmakeriet.se</span>
                  </div>
                </div>
              </Card> */}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section 
      <section className="py-20 bg-gradient-warm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-primary mb-4">
              Våra Värderingar
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              De principer som driver oss framåt och formar varje aspekt av vårt arbete
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="leather-card p-8 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-playfair text-xl font-semibold mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section> */}

    <Footer/>
    </div>
  );
};

export default About;