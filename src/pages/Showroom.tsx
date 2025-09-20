import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Footer from "@/components/ui/footer";
import { ArrowRight } from "lucide-react";

import furnitureImage1 from "@/assets/showroom/table.jpg";
import furnitureImage2 from "@/assets/showroom/bathroom.jpg";
import furnitureImage3 from "@/assets/showroom/computer.jpg";
import furnitureImage4 from "@/assets/showroom/sofa.jpg";

const projects = [
  { 
    image: furnitureImage1, 
    title: "Projekt 1", 
    category: "För Professionella", 
    text:  <p>"Vi hjälper arkitekter och designers att skapa exklusiva miljöer med läder och skräddarsydda möbler."</p>
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
    text: <p>"Vi hjälper arkitekter och designers att skapa exklusiva miljöer med läder och skräddarsydda möbler."</p>
  },
  { 
    image: furnitureImage4, 
    title: "Projekt 4", 
    category: "Kontorsmiljö", 
    text: <p>"Vi hjälper arkitekter och designers att skapa exklusiva miljöer med läder och skräddarsydda möbler."</p>
  },
];

const Showroom = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 text-center">
        <h1 className="font-playfair text-6xl md:text-7xl font-bold mb-4">Showroom</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Utforska våra projekt och hur vi förvandlar rum med läder och möbler.
        </p>
      </section>

      {/* Alternating Grid */}
      <section className="py-16 px-4 max-w-7xl mx-auto grid gap-12">
        {projects.map((project, index) => (
          <div 
            key={index} 
            className={`grid md:grid-cols-2 gap-6 items-center ${
              index % 2 === 1 ? "md:grid-flow-dense" : ""
            }`}
          >
            {/* Text */}
            <div className={`flex flex-col justify-center ${index % 2 === 1 ? "md:order-last" : ""}`}>

  
              <p className="text-lg text-muted-foreground italic leading-relaxed mb-6">{project.text}</p>

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
  );
};

export default Showroom;
