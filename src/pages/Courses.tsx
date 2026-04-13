import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Footer from "@/components/ui/footer";
import { Clock, Users, Calendar, X, ArrowRight, Loader2 } from "lucide-react";
import { client, urlFor, SanityCourse } from "@/lib/sanity";
import SEO from "@/components/SEO";

// ─────────────────────────────────────────────
// 👇 Byt till `true` för att visa kurserna igen
const SHOW_COURSES = false;
// ─────────────────────────────────────────────

const Courses = () => {
  const [courses, setCourses] = useState<SanityCourse[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<SanityCourse | null>(null);
  const [loading, setLoading] = useState(true);

  const googleFormLink = "https://docs.google.com/forms/d/e/1FAIpQLScEDdcZEZYStheHgkfXsjTC34rCicZUm72U86VQjlFzEB7N0A/viewform?usp=header";

  // Query för att hämta kurser från Sanity
  const coursesQuery = `*[_type == "course" && (!defined(active) || active == true)] {
    _id,
    title,
    slug,
    duration,
    participants,
    price,
    nextDate,
    description,
    includes,
    image,
    featured,
    active
  } | order(featured desc, _createdAt desc)`;

  // Hämta kurser från Sanity
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        console.log('Fetching courses with query:', coursesQuery);
        const coursesData = await client.fetch(coursesQuery);
        console.log('Fetched courses data:', coursesData);
        setCourses(coursesData);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('sv-SE', {
      style: 'currency',
      currency: 'SEK',
      minimumFractionDigits: 0
    }).format(price);


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Laddar kurser...</span>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title="Kurser" 
        description="Lär dig läderhantverk på våra kurser. Från nybörjare till avancerad - upptäck konsten att arbeta med läder under professionell handledning."
        url="https://sadelmakeriet.se/kurser"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Läderhantverkskurser | Sadelmakeriet",
          "description": "Kurser i läderhantverk - från nybörjare till avancerad.",
          "url": "https://sadelmakeriet.se/kurser",
          "itemListElement": []
        }}
      />
      <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 relative pt-20 pb-10 text-center"
      style={{ backgroundColor: "var(--background)" }}>
        <div className="max-w-3xl mx-auto">
          <h1 className="font-logo text-5xl md:text-7xl mb-6 leading-tight text-logo-text">
            Kurser
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Lär dig att arbeta med läder från grunden eller fördjupa dina kunskaper, testa på processen att gå från ide till färdig produkt med handledning från mig.
          </p>
        </div>
      </section>

      {/* Course Grid */}
      <section className="py-20 relative pt-20 text-center"
      style={{ backgroundColor: "var(--background)" }}>
        <div className="container mx-auto px-4">

          {SHOW_COURSES ? (
            <>
              {/* ── Kursgrid ── */}
              {courses.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-muted-foreground text-lg">
                    Inga kurser tillgängliga just nu.
                  </p>
                </div>
              ) : (
                <div className="grid lg:grid-cols-2 gap-8">
                  {courses.map((course) => (
                    <Card 
                      key={course._id} 
                      className="p-8 text-center hover:bg-beige-800 hover:text-beige-900 transition transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/1"
                      onClick={() => setSelectedCourse(course)}
                    >
                      {course.featured && (
                        <Badge className="mb-4" variant="default">Populär</Badge>
                      )}
                      
                      {course.image && (
                        <div className="w-16 h-16 mx-auto mb-4 overflow-hidden rounded-full">
                          <img 
                            src={urlFor(course.image).width(64).height(64).fit('crop').url()} 
                            alt={course.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      
                      {!course.image && (
                        <div className="flex justify-center mb-4">
                          <Users className="h-8 w-8 text-primary" />
                        </div>
                      )}

                      <h3 className="text-xl font-sans font-semibold mb-2">{course.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4">{course.description}</p>
                      <div className="font-bold">{formatPrice(course.price)}</div>
                    </Card>
                  ))}
                </div>
              )}
            </>
          ) : (
            // ── Kommer snart ──────────────────────────────────────
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Kommer snart</h2>
              <p className="text-muted-foreground max-w-sm">
                Vi jobbar på att göra våra kurser tillgängliga här. Hör av dig till oss om du redan nu vill anmäla dig.
              </p>
            </div>
            // ─────────────────────────────────────────────────────
          )}

        </div>
      </section>

      {/* Modal - visas bara om SHOW_COURSES är true och en kurs är vald */}
      {SHOW_COURSES && selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-white/50 backdrop-blur-sm"
            onClick={() => setSelectedCourse(null)}
          ></div>

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
              <Button size="lg" className="w-full hover:bg-beige-800 hover:text-beige-900 xl:!text-xl">
                Anmäl dig <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </div>
        </div>
      )}

      <Footer />
      </div>
    </>
  );
};

export default Courses;
