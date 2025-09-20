import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, Users, ShoppingBag, GraduationCap, Heart } from "lucide-react";
import saddleImage from "@/assets/saddle-closeup.jpg";
import Footer from "@/components/ui/footer";

const Landing = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
        <section className=" relative h-screen flex items-center justify-center bg-background py-20 relative pt-20 pb-16 text-center" style={{ backgroundColor: "var(--background)" }}>

          <div className="relative z-10 text-center px-4 max-w-4xl ">
           <h1 className="font-logo text-7xl md:text-8xl mb-6 leading-tight text-logo-text">
            Sadelmakeriet
          </h1>
            <p className="text-xl font-montserrat md:text-2xl mb-8 text-[hsl(var(--text))] max-w-2xl mx-auto leading-relaxed">
              Tradition och förnyelse. 
            </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center var(--background)">
            <Button size="lg" asChild className="bg-primary hover:bg-secondary/90">
              <Link to="/showroom">
                Inspiration <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
              <Link to="/Shop">
                Produkter <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
             <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
              <Link to="/Kurser">
                Kurser <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
    
        </div>
      </section>

        <Footer/>
    </div>
  );
};

export default Landing;