import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Footer from "@/components/ui/footer";
import { ArrowRight } from "lucide-react";
import furnitureImage1 from "@/assets/showroom/shaire.png";
import furnitureImage2 from "@/assets/showroom/lamp.png";
import furnitureImage4 from "@/assets/showroom/computer.jpg";
import furnitureImage3 from "@/assets/showroom/table.png";
import SEO from "@/components/SEO";

const projects = [
  { 
    image: furnitureImage1, 
    title: "Projekt 1", 
    category: "För Professionella", 
    text:  <p>"Elegant komfort i tidlös design."</p>
  },
  { 
    image: furnitureImage2, 
    title: "Projekt 2", 
    category: "Interiördesign", 
    text: <p>"Vi hjälper arkitekter och designers att skapa exklusiva miljöer med läder och skräddarsydda möbler."</p>
  },
  { 
    image: furnitureImage3, 
    title: "Projekt 3", 
    category: "Möbler & Läder", 
    text: <p>"Vi hjälper arkitekter och designers att skapa exklusiva miljöer med läder och skräddarsydda möbler"</p>
  },
  { 
    image: furnitureImage4, 
    title: "Projekt 4", 
    category: "Kontorsmiljö", 
    text: <p>"Tidlöst fokus"</p>
  },
];

const Showroom = () => {
  return (
    <>
      <SEO 
        title="Inspiration" 
        description="Utforska vårt showroom med exklusiva lädermöbler och inredningsprojekt. Inspiration för arkitekter, designers och hem."
        url="https://sadelmakeriet.se/showroom"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Inspirations ateljén | Sadelmakeriet",
          "description": "Utforska vårt showroom med exklusiva lädermöbler och inredningsprojekt.",
          "url": "https://sadelmakeriet.se/showroom"
        }}
      />
      <div className="min-h-screen bg-background">
      {/* Hero Section */}
    <section
      className="py-20 relative pt-20 pb-16 text-center"
      style={{ backgroundColor: "var(--background)" }}
    >
      {/* Rubrik */}
      <h1 className="font-logo text-5xl md:text-7xl mb-6 leading-tight text-logo-text">
        Inspirations ateljén
      </h1>

      {/* Text */}
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
       Läder i inredning, till hem och arbetsplats. Bara fantasin sätter gränserna. Hör av dig för att boka en konsultation så förvandlar vi din idé till verklighet.
      </p>

      {/* CEntrerad knapp */}
      {/* Två centrerade knappar */}
          <div className="flex justify-center mt-6 gap-4 ">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSd35Iup_nlptG-ODKW089-l7iT_y16tMiLd_c4xodFR5PKhBA/viewform?usp=header"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="hover:bg-beige-800 hover:text-beige-900" >
                Boka konsultation <ArrowRight className="ml-2 h-5 w-5 " />
              </Button>
            </a>

            <a
              href="https://tarnsjogarveri.com/leather/our-selection-of-leather/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="hover:bg-beige-800 hover:text-beige-900">
                Läder sortiment <ArrowRight className="ml-2 h-5 w-5 " />
              </Button>
            </a>
          </div>

    </section>

      {/* Alternating Grid */}
      <section className="py-5 px-4 max-w-7xl mx-auto grid gap-12"
      style={{ backgroundColor: "var(--background)" }}>
        {projects.map((project, index) => (
          <div 
            key={index} 
            className={`grid md:grid-cols-2 gap-6 items-center ${
              index % 2 === 1 ? "md:grid-flow-dense" : ""
            }`}
          >
            {/* Text */}
            <div className={`flex flex-col justify-center ${index % 2 === 1 ? "md:order-last" : ""}`}>

  
              <p className="text-2xl text-center text-muted-foreground italic leading-relaxed mb-">{project.text}</p>

            </div>

            {/* Image */}
            <div className="overflow-hidden rounded-xl shadow-lg">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        ))}
      </section>

      <Footer />
      </div>
    </>
  );
};

export default Showroom;
