import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import  Footer  from "@/components/ui/footer";
import { Calendar, Clock, Users, Star, ArrowRight } from "lucide-react";
import courseImage from "@/assets/leather-course.jpg";

const Courses = () => {
  const courses = [
    {
      id: 1,
      title: "Grundkurs i Läderhantverk",
      level: "Nybörjare",
      duration: "2 dagar",
      participants: "Max 6 deltagare",
      price: 2890,
      nextDate: "15-16 Mars 2024",
      description: "Lär dig grunderna i läderbearbetning. Vi går igenom materialkunskap, verktyg och skapar din första läderprodukt.",
      includes: ["Alla material", "Verktyg", "Lunch båda dagarna", "Kaffe & kaka"],
      popular: true
    },
    {
      id: 2,
      title: "Sadelmakeri - Intensivkurs",
      level: "Avancerad",
      duration: "5 dagar", 
      participants: "Max 4 deltagare",
      price: 8900,
      nextDate: "22-26 April 2024",
      description: "Fördjupningskurs för dig som vill lära dig konsten att tillverka sadlar och sele. Kräver grundläggande kunskaper.",
      includes: ["Premium material", "Professionella verktyg", "Personlig handledning", "Lunch alla dagar"],
      popular: false
    },
    {
      id: 3,
      title: "Läderväska Workshop",
      level: "Medel",
      duration: "1 dag",
      participants: "Max 8 deltagare",
      price: 1490,
      nextDate: "8 Mars 2024",
      description: "Skapa din egen handgjorda läderväska. Välj mellan olika modeller och personalisera med dina egna detaljer.",
      includes: ["Läder och material", "Verktygsanvändning", "Lunch", "Recept på lädervård"],
      popular: true
    },
    {
      id: 4,
      title: "Privat Handledning",
      level: "Alla nivåer",
      duration: "Flexibel",
      participants: "1-2 deltagare", 
      price: 890,
      nextDate: "Efter överenskommelse",
      description: "Skräddarsydd undervisning för ditt specifika projekt. Perfekt för dig som vill fokusera på något särskilt.",
      includes: ["Personlig handledning", "Projektspecifika råd", "Flexibel tidsram"],
      popular: false
    }
  ];

  const testimonials = [
    {
      name: "Anna Lindberg",
      course: "Grundkurs i Läderhantverk",
      rating: 5,
      comment: "Fantastisk kurs! Lärde mig så mycket på bara två dagar. Instruktören var tålmodig och kunnig."
    },
    {
      name: "Erik Ström",
      course: "Sadelmakeri - Intensivkurs", 
      rating: 5,
      comment: "Otroligt detaljerad kurs som gav mig verktyg att starta mitt eget sadelmakeri. Rekommenderar varmt!"
    },
    {
      name: "Maria Johansson",
      course: "Läderväska Workshop",
      rating: 5,
      comment: "Så roligt att skapa något med sina egna händer. Min väska blev precis som jag ville ha den!"
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('sv-SE', {
      style: 'currency', 
      currency: 'SEK',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
           <section className="py-20" style={{ backgroundColor: "var(--background)" }}>
      
        <div className="absolute inset-0 bg-gradient-hero"></div>
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-3xl var(--text)">
            <Badge className="mb-4 bg-white/20 text-white border-white">Lär dig hantverket</Badge>
            <h1 className="font-logo text-5xl md:text-7xl mb-6 leading-tight text-logo-text">
              Kurser i
              <br />
              <span className="text-secondary">Läderhantverk</span>
            </h1>
            <p className="text-xl leading-relaxed  var(--text)">
              Upptäck konsten att arbeta med läder. Våra kurser passar alla nivåer - 
              från nybörjare till de som vill fördjupa sina kunskaper inom traditionellt hantverk.
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Se alla kurser <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Course Grid */}
      <section className="py-20" style={{ backgroundColor: "var(--background)" }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-primary mb-4">
              Våra Kurser
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Välj den kurs som passar din nivå och dina intressen
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {courses.map((course) => (
              <Card key={course.id} className="leather-card overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <Badge 
                        variant={course.level === "Nybörjare" ? "default" : course.level === "Medel" ? "secondary" : "outline"}
                        className="mb-2"
                      >
                        {course.level}
                      </Badge>
                      {course.popular && (
                        <Badge className="mb-2 ml-2 bg-primary/10 text-primary">
                          Populär
                        </Badge>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-2xl">{formatPrice(course.price)}</div>
                      <div className="text-sm text-muted-foreground">per person</div>
                    </div>
                  </div>

                  <h3 className="font-playfair text-xl font-semibold mb-3">
                    {course.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {course.description}
                  </p>

                  <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-primary mr-2" />
                      {course.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-primary mr-2" />
                      {course.participants}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-primary mr-2" />
                      {course.nextDate}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-medium mb-2">Ingår i kursen:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {course.includes.map((item, index) => (
                        <li key={index} className="flex items-center">
                          <Star className="h-3 w-3 text-primary mr-2 fill-current" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button className="w-full">
                    Boka plats
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-warm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-primary mb-4">
              Vad säger våra deltagare?
            </h2>
            <p className="text-lg text-muted-foreground">
              Läs om andras upplevelser av våra kurser
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="leather-card p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < testimonial.rating ? 'text-primary fill-current' : 'text-muted'}`} 
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic leading-relaxed">
                  "{testimonial.comment}"
                </p>
                <div>
                  <div className="font-medium">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.course}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

    <Footer/>
      
    </div>
  );
};

export default Courses;