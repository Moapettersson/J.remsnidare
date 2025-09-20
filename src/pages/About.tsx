import { Badge } from "@/components/ui/badge";
import Footer from "@/components/ui/footer";

import leatherImage1 from "@/assets/sadelmakaren/working.jpg";
import leatherImage2 from "@/assets/showroom/table.png";

const storySections = [
  {
    image: leatherImage1,
    text: "Min kärlek för läderhantverk började redan som ung när jag mötte en traditionell sadelmakare. Fascinationen för hur råa material kunde förvandlas till funktionella och vackra föremål väckte en passion som skulle forma mitt liv."
  },
  {
    image: leatherImage2,
    text: "Efter flera år som lärling och gesäll öppnade jag mitt första eget sadelmakeri 1985. Målet var att kombinera traditionella tekniker med modern design och funktionalitet. Idag delar vi även vår kunskap genom kurser och workshops."
  }
];

const About = () => {
  return (
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
      <section className="py-16 px-4 max-w-7xl mx-auto grid gap-16">
        {storySections.map((section, index) => (
          <div
            key={index}
            className={`grid md:grid-cols-2 gap-6 items-center ${
              index % 2 === 1 ? "md:grid-flow-dense" : ""
            }`}
          >
            {/* Text */}
            <div className={`flex flex-col justify-center ${index % 2 === 1 ? "md:order-last" : ""}`}>
              <p className="text-lg text-muted-foreground italic leading-relaxed">{section.text}</p>
            </div>

            {/* Image */}
            <div className="overflow-hidden rounded-xl shadow-lg">
              <img
                src={section.image}
                alt="Story image"
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

export default About;
