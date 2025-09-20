import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Footer from "@/components/ui/footer";
import { Clock, Users, Calendar, X, ArrowRight } from "lucide-react";

const Courses = () => {
  const googleFormLink = "https://docs.google.com/forms/d/e/1FAIpQLScEDdcZEZYStheHgkfXsjTC34rCicZUm72U86VQjlFzEB7N0A/viewform?usp=header";

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

    },
  ];

  const [selectedCourse, setSelectedCourse] = useState(null as typeof courses[0] | null);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('sv-SE', {
      style: 'currency',
      currency: 'SEK',
      minimumFractionDigits: 0
    }).format(price);

  return (
   <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 relative pt-20 pb-10 text-center"
      style={{ backgroundColor: "var(--background)" }}>
        <div className="max-w-3xl mx-auto">
          <h1 className="font-logo text-5xl md:text-7xl mb-6 leading-tight text-logo-text">
            Kurser
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Upptäck vårt utbud av handgjorda läderprodukter – varje artikel är unik och skapad med traditionella tekniker och modern design.
          </p>
        </div>
      </section>

      {/* Course Grid */}
      <section className="py-20 relative pt-20 pb-16 text-center"
      style={{ backgroundColor: "var(--background)" }}>
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            {courses.map((course) => (
            <Card 
              key={course.id} 
              className="p-8 text-center hover:shadow-lg transition cursor-pointer"
              onClick={() => setSelectedCourse(course)}
            >
              <div className="flex justify-center mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-sans font-semibold mb-2">{course.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">{course.description}</p>
              <div className="font-bold">{formatPrice(course.price)}</div>
            </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Suddig bakgrund */}
          <div
            className="absolute inset-0 bg-white/50 backdrop-blur-sm"
            onClick={() => setSelectedCourse(null)}
          ></div>

          {/* Solid modalpanel */}
          <div
            className="relative bg-white border border-white-200 rounded-xl max-w-xl w-full mx-4 p-6 shadow-2xl z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-muted-foreground hover:text-primary"
              onClick={() => setSelectedCourse(null)}
            >
              <X className="h-6 w-6" />
            </button>

            <h2 className="font-sans text-2xl font-semibold mb-4 text-gray-900">{selectedCourse.title}</h2>
            <p className="text-gray-600 mb-4">{selectedCourse.description}</p>

            <div className="mb-4">
              <h3 className="font-medium mb-2 text-gray-900">Ingår i kursen:</h3>
              <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                {selectedCourse.includes.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
              <div className="flex items-center text-gray-700">
                <Clock className="h-4 w-4 text-primary mr-2"/>
                {selectedCourse.duration}
              </div>
              <div className="flex items-center text-gray-700">
                <Users className="h-4 w-4 text-primary mr-2"/>
                {selectedCourse.participants}
              </div>
              <div className="flex items-center text-gray-700">
                <Calendar className="h-4 w-4 text-primary mr-2"/>
                {selectedCourse.nextDate}
              </div>
            </div>

            <div className="text-right mb-4">
              <span className="text-3xl font-bold text-primary">{formatPrice(selectedCourse.price)}</span>
            </div>

            <a href={googleFormLink} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="w-full">
                Anmäl dig <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Courses;