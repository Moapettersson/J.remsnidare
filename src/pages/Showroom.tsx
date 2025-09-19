import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, ArrowRight, Star } from "lucide-react";
import furnitureImage from "@/assets/leather-furniture.jpg";

const Showroom = () => {
  const projects = [
    {
      title: "Exklusiva kontorsmöbler",
      category: "Kommersiell inredning",
      description: "Skräddarsydda lädermöbler för moderna kontor och mötesrum",
      image: furnitureImage,
      features: ["Ergonomisk design", "Premium läder", "Anpassningsbara dimensioner"]
    },
    {
      title: "Restauranginteriör",
      category: "Hospitality design", 
      description: "Atmosfärsskapande läderbänkar och stolar för restaurangmiljöer",
      image: furnitureImage,
      features: ["Slitstarkt material", "Lätt underhåll", "Tidlös design"]
    },
    {
      title: "Hemmakontor & bibliotek",
      category: "Privat inredning",
      description: "Bekväma och eleganta lädermöbler för hemarbete och avkoppling",
      image: furnitureImage,
      features: ["Komfort", "Hållbarhet", "Personlig anpassning"]
    }
  ];

  const services = [
    "Skräddarsydda möbler",
    "Materialrådgivning", 
    "3D-visualisering",
    "Projektledning",
    "Installation & service",
    "Underhållsprogram"
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-warm">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <Badge className="mb-4 bg-primary/10 text-primary">För Professionella</Badge>
            <h1 className="font-playfair text-5xl md:text-6xl font-bold text-primary mb-6">
              Showroom för
              <br />
              <span className="text-foreground">Arkitekter & Designers</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Vi samarbetar med arkitekter och inredningsdesigners för att skapa 
              unika läderlösningar som höjer kvaliteten i kommersiella och privata miljöer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg">
                Boka konsultation <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline">
                Ladda ner katalog
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-primary mb-4">
              Utvalda Projekt
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Upptäck hur vårt hantverk förhöjer professionella miljöer
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="leather-card overflow-hidden group">
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary text-primary-foreground">
                      {project.category}
                    </Badge>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-playfair text-xl font-semibold mb-3">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="space-y-2 mb-4">
                    {project.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm">
                        <Star className="h-4 w-4 text-primary mr-2 fill-current" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  <Button variant="ghost" className="w-full">
                    Se mer <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-gradient-warm">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-playfair text-4xl font-bold text-primary mb-6">
                Professionella Tjänster
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Vi erbjuder kompletta lösningar från koncept till färdig installation. 
                Vårt team arbetar nära med arkitekter och designers för att förverkliga 
                visioner med högsta kvalitet.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {services.map((service, index) => (
                  <div key={index} className="flex items-center">
                    <Star className="h-5 w-5 text-primary mr-3 fill-current" />
                    <span>{service}</span>
                  </div>
                ))}
              </div>
            </div>
            <Card className="leather-card p-8">
              <h3 className="font-playfair text-2xl font-semibold mb-6">Kontakta Oss</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-primary mr-3" />
                  <span>arkitekt@laderhantverk.se</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-primary mr-3" />
                  <span>+46 XXX XX XX XX</span>
                </div>
              </div>
              <p className="text-muted-foreground mt-6 mb-4">
                Boka ett möte för att diskutera ditt projekt
              </p>
              <Button className="w-full">
                Boka konsultation
              </Button>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Showroom;