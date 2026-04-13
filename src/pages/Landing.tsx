import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, Users, ShoppingBag, GraduationCap, Heart } from "lucide-react";
import saddleImage from "@/assets/showroom/shaire.png"
import Footer from "@/components/ui/footer";
import leatherImage1 from "@/assets/sadelmakaren/working.jpg"; 
import leatherImage2 from "@/assets/knife_brown_leather.jpeg";
import leatherImage3 from "@/assets/showroom/table.png";
import SEO from "@/components/SEO";

const storySections = [
  {
    title: "Mer än bara sadlar",
    image: leatherImage1,
    text: "Titeln sadelmakare är idag lite missvisande. Det centrala i allt jag gör är materialet - läder. Ett material som kan användas till det mesta - möbler, väskor, inredning, häst- och hund utrustning etc. Det är kundens fantasi som vanligen sätter begränsningen, inte materialet eller hantverket. Oavsett om ni är intresserade av nytillverkning, reparationer eller utbildning kan jag hjälpa er." 

  },
  {
    title: "Läder ett magiskt material",
    image: leatherImage2,
    text: "Jag använder bara läder gjort av hudarna från svenska kor, garvat i Tärnsjö. Detta dels för att de håller en hög kvalitet och dels för att jag anser att det är viktigt att minimera vår miljöbelastning och värna djurens välfärd. Produkter tillverkade av bra läder är hållbara och får med tiden en vacker patina. Ärr och nyansskillnader är en naturlig del av materialet och gör varje produkt unik, en vinfläck är inte bara en fläck utan även, förhoppningsvis, ett minne från ett unikt tillfälle."

  },
  {
    title: "Sadelmakare ett magiskt hantverk:",
    image: leatherImage3,
    text: "Redan under medeltiden var sadelmakare ett etablerat yrke i norden. Sedan dess har mycket förändrats men samtidigt är mycket desamma. Förmodligen skulle jag inte ha några problem att gå in på ett sadelmakeri under 1700-talet och sätta mig och börja arbeta.Vår superkraft är att vi kan förvandla läder till färdiga produkter. Produkter där funktion och hållbarhet alltid sätts i centrum, det vackra följer automatiskt."

  }
];

const Landing = () => {
  return (
    <div className="min-h-screen">
      <SEO 
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Sadelmakeriet",
            "description": "Traditionellt läderhantverk och sadelmakeri. Professionella tjänster för arkitekter och inredare samt kurser för privatpersoner.",
            "url": "https://sadelmakeriet.se",
            "image": "https://sadelmakeriet.se/og-image.jpg",
            "address": { "@type": "PostalAddress", "addressCountry": "SE" },
            "priceRange": "$$",
            "knowsAbout": ["Läderhantverk", "Sadelmakeri", "Läderkurser", "Lädermöbler"]
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Sadelmakeriet",
            "url": "https://sadelmakeriet.se"
          }
        ]}
      />
      {/* Hero Section */}
      <section 
        id="home"
        className="relative h-screen flex items-center justify-center text-center -mt-16 pt-16" 
        style={{ 
          backgroundImage: `url(${saddleImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30"></div>

        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="font-logo text-4xl sm:text-5xl md:text-7xl lg:text-8xl mb-4 sm:mb-6 leading-tight text-white drop-shadow-lg">
            Sadelmakeriet
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed drop-shadow-md px-4">
            Tradition och förnyelse. 
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Button size="lg" asChild className="text-base sm:text-lg text-white shadow-lg w-full sm:w-auto hover:bg-beige-800 hover:text-beige-900">
              <Link to="/showroom">
                Inspiration <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            </Button>
            <Button size="lg" asChild className="text-base sm:text-lg text-white shadow-lg w-full sm:w-auto hover:bg-beige-800 hover:text-beige-900">
              <Link to="/Shop">
                Produkter <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            </Button>
            <Button size="lg" asChild className="text-base sm:text-lg text-white shadow-lg w-full sm:w-auto hover:bg-beige-800 hover:text-beige-900">
              <Link to="/Kurser">
                Kurser <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="om-oss" className="min-h-screen bg-background">
        {/* Hero Section */}
        <div className="py-20 relative pt-20 pb-16 text-center"
             style={{ backgroundColor: "var(--background)" }}>
          {/* Rubrik */}
          <h1 className="font-logo text-3xl sm:text-4xl md:text-5xl lg:text-7xl mb-4 sm:mb-6 leading-tight text-logo-text px-4">
            Att arbeta med läder
          </h1>
          {/* Text */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Det vackra med läder och dess historia
          </p>
        </div>
 
        {/* Story Sections */}
        <div className="py-16 px-4 max-w-7xl mx-auto grid gap-16"
             style={{ backgroundColor: "var(--background)" }}>
          {storySections.map((section, index) => (
            <div
              key={index}
              className={`grid md:grid-cols-2 gap-6 items-center ${
                index % 2 === 1 ? "md:grid-flow-dense" : ""
              }`}
            >
              {/* Text */}
              <div
                className={`flex flex-col justify-center ${
                  index % 2 === 1 ? "md:order-last" : ""
                }`}
              >
                {/* Stor rubrik för varje sektion */}
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {section.title}
                </h2>
                <p className="text-lg text-muted-foreground italic leading-relaxed">
                  {section.text}
                </p>
              </div>
 
              {/* Image */}
              <div className="overflow-hidden rounded-xl shadow-lg">
                <img
                  src={section.image}
                  alt={section.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer/>
    </div>
  );
};

export default Landing;