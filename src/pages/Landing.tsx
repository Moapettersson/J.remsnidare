import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, Users, ShoppingBag, GraduationCap, Heart } from "lucide-react";
import saddleImage from "@/assets/saddle-closeup.jpg";

const Landing = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
        <section 
        className="relative h-screen flex items-center justify-center bg-background">

          <div className="relative z-10 text-center px-4 max-w-4xl ">
           <h1 className="font-montserrat text-5xl md:text-7xl mb-6 leading-tight">
            Sadelmakeriet
          </h1>
            <p className="text-xl font-montserrat md:text-2xl mb-8 text-[hsl(var(--text))] max-w-2xl mx-auto leading-relaxed">
              Tradition och förnyelse. 
            </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center var(--background)">
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
              <Link to="/showroom">
                Showroom <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
              <Link to="/Shop">
                Webbshop <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
             <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
              <Link to="/Courses">
                Kurser <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      {/*<section className="py-20 bg-gradient-warm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-6">
              Våra Tjänster
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Från professionella uppdrag till personliga projekt - vi erbjuder 
              kvalitetshantverk för alla behov
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="leather-card p-6 text-center hover-scale">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-playfair text-xl font-semibold mb-3">Showroom</h3>
              <p className="text-muted-foreground mb-4">
                Professionella tjänster för arkitekter och inredningsdesigners
              </p>
              <Button variant="ghost" asChild>
                <Link to="/showroom">Läs mer <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </Card>

            <Card className="leather-card p-6 text-center hover-scale">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-playfair text-xl font-semibold mb-3">Webbshop</h3>
              <p className="text-muted-foreground mb-4">
                Handgjorda läderprodukter för privatkunder och hem
              </p>
              <Button variant="ghost" asChild>
                <Link to="/shop">Handla nu <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </Card>

            <Card className="leather-card p-6 text-center hover-scale">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-playfair text-xl font-semibold mb-3">Kurser</h3>
              <p className="text-muted-foreground mb-4">
                Lär dig traditionellt läderhantverk från en mästare
              </p>
              <Button variant="ghost" asChild>
                <Link to="/kurser">Boka kurs <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </Card>

            <Card className="leather-card p-6 text-center hover-scale">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-playfair text-xl font-semibold mb-3">Om Oss</h3>
              <p className="text-muted-foreground mb-4">
                Läs mer om vår passion för kvalitetshantverk och tradition
              </p>
              <Button variant="ghost" asChild>
                <Link to="/om-oss">Vår historia <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </Card>
          </div>
        </div>
      </section>
      */}
      {/* Featured Work */}
      {/*<section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-playfair text-4xl md:text-5xl font-bold text-primary mb-6">
                Hantverk som varar
                <br />
                <span className="text-muted-foreground">generationer</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Varje produkt vi skapar är resultatet av djup kunskap, noggrant hantverk 
                och passion för läderarbete. Vi använder endast finaste material och 
                traditionella tekniker som överförts från generation till generation.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Oavsett om det gäller en sadel för professionell ridning, exklusiva 
                möbler för hem eller kontor, eller personliga tillbehör - vi skapar 
                produkter som både håller och förbättras med tiden.
              </p>
              <Button size="lg" asChild>
                <Link to="/om-oss">
                  Läs vår historia <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="relative">
              <img 
                src={saddleImage} 
                alt="Handgjord sadel - detaljbild av läderhantverk" 
                className="w-full h-[500px] object-cover rounded-xl shadow-elegant"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-xl"></div>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default Landing;