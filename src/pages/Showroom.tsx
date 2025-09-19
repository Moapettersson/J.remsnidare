import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Carousel from "@/components/ui/carousel"; // OBS: kontrollera filnamn/case
import Footer from "@/components/ui/footer";
import { Mail, Phone, ArrowRight, Star } from "lucide-react";

import furnitureImage1 from "@/assets/showroom/table.jpg";
import furnitureImage2 from "@/assets/showroom/bathroom.jpg";
import furnitureImage3 from "@/assets/showroom/computer.jpg";
import furnitureImage4 from "@/assets/showroom/sofa.jpg";

const slides = [
  { src: furnitureImage1, title: "Exklusiva kontorsmöbler", subtitle: "Skräddarsydda lädermöbler" },
  { src: furnitureImage2, title: "Restauranginteriör", subtitle: "Läderbänkar & stolar" },
  { src: furnitureImage3, title: "Hemmakontor & bibliotek", subtitle: "Eleganta lädermöbler" },
  { src: furnitureImage4, title: "Hemmakontor & bibliotek", subtitle: "Eleganta lädermöbler" },
];

const projects = [
  {
    title: "Exklusiva kontorsmöbler",
    category: "Kommersiell inredning",
    description: "Skräddarsydda lädermöbler för moderna kontor och mötesrum",
    image: furnitureImage1,
    features: ["Ergonomisk design", "Premium läder", "Anpassningsbara dimensioner"]
  },
  {
    title: "Restauranginteriör",
    category: "Hospitality design",
    description: "Atmosfärsskapande läderbänkar och stolar för restaurangmiljöer",
    image: furnitureImage2,
    features: ["Slitstarkt material", "Lätt underhåll", "Tidlös design"]
  },
  {
    title: "Hemmakontor & bibliotek",
    category: "Privat inredning",
    description: "Bekväma och eleganta lädermöbler för hemarbete och avkoppling",
    image: furnitureImage3,
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

const Showroom = () => {
 return (
    <div className="min-h-screen">
      {/* Hero Section */}
     <section className="pt-20 pb-1" style={{ backgroundColor: "var(--background)" }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <Badge className="mb-4 bg-primary/10 text-primary">För Professionella</Badge>
            <h1 className="font-playfair text-5xl md:text-6xl font-bold text-primary mb-6">
              Showroom
              <br />
              <span className="text-foreground text-3xl">- Att inreda med läder</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Jag kan hjälpa arkitekter m.m med att förgylla hem och ofentliga lokaler oavsett om det gäller lindning, möbler eller väggar
            </p>
            <div className="flex flex-col sm:flex-row gap-1">
              <Button size="lg">
                Boka konsultation <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>


      {/* Utvalda Projekt + Carousel */}
      <section className="py-20" style={{ backgroundColor: "var(--background)" }}>
   
   
          <Carousel slides={slides} />
        
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
                  <span>arkitekt@sadelmakeriet.se</span>
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

      <Footer />

    </div>
  );
};

export default Showroom;
