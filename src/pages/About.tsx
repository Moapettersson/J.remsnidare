import { Badge } from "@/components/ui/badge";
import Footer from "@/components/ui/footer";
import { ContactSection } from "@/components/ContactSection";
import leatherImage1 from "@/assets/sadelmakaren/working.jpg";
import leatherImage2 from "@/assets/showroom/table.png";
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
    image: leatherImage2,
    text: "Redan under medeltiden var sadelmakare ett etablerat yrke i norden. Sedan dess har mycket förändrats men samtidigt är mycket desamma. Förmodligen skulle jag inte ha några problem att gå in på ett sadelmakeri under 1700-talet och sätta mig och börja arbeta.Vår superkraft är att vi kan förvandla läder till färdiga produkter. Produkter där funktion och hållbarhet alltid sätts i centrum, det vackra följer automatiskt."

  }
];

const About = () => {
  return (
    <>
      <SEO 
        title="Om Oss" 
        description="Lär känna Sadelmakeriet - traditionellt läderhantverk med passion. Upptäck vår historia och vårt engagemang för kvalitet och hållbarhet."
        url="https://sadelmakeriet.se/om-oss"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "Om Sadelmakeriet",
          "description": "Traditionellt läderhantverk med passion - vår historia och vårt engagemang för kvalitet.",
          "url": "https://sadelmakeriet.se/om-oss"
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
          Att arbeta med läder
        </h1>
        {/* Text */}
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Det vackra med läder och dess historia
        </p>
      </section>

      {/* Story Sections */}
      <section className="py-16 px-4 max-w-7xl mx-auto grid gap-16"
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
      </section>

      {/* Kontaktsektion */}
      <ContactSection 
        className="bg-secondary/20" 
      />

      <Footer />
    </div>
    </>
  );
};

export default About;
