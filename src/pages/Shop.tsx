import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Footer from "@/components/ui/footer";
import { useState, useEffect } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { client, urlFor, SanityProduct, SanityCategory } from "@/lib/sanity";
import { useNavigate } from "react-router-dom";
import furnitureImage1 from "@/assets/sadelmakaren/working.jpg";
import SEO from "@/components/SEO";
import furnitureImage2 from "@/assets/sadelmakaren/working.jpg";
import furnitureImage3 from "@/assets/sadelmakaren/working.jpg";
import furnitureImage4 from "@/assets/sadelmakaren/working.jpg";

// ─────────────────────────────────────────────
// 👇 Byt till `true` för att visa produkterna igen
const SHOW_PRODUCTS = false;
// ─────────────────────────────────────────────

const Shop = () => {
  const [selectedGroup, setSelectedGroup] = useState("alla");
  const [products, setProducts] = useState<SanityProduct[]>([]);
  const [categories, setCategories] = useState<SanityCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const lindningExamples = [
  { 
    image: furnitureImage1, 
    title: "Lindning exempel 1", 
    text: <p>"Handgjord lindning för professionella behov."</p>
  },
  { 
    image: furnitureImage2, 
    title: "Lindning exempel 2", 
    text: <p>"Anpassade dimensioner efter dina önskemål."</p>
  },
  { 
    image: furnitureImage3, 
    title: "Lindning exempel 3", 
    text: <p>"Kvalitetsläder som håller över tid."</p>
  },
  { 
    image: furnitureImage4, 
    title: "Lindning exempel 4", 
    text: <p>"Traditionellt hantverk i modern tillämpning."</p>
  },
];

  

  // Queries för att hämta data från Sanity
  const productsQuery = `*[_type == "product"] {
    _id,
    name,
    slug,
    image,
    gallery,
    category->{name, slug},
    description,
    detailDescription,
    features,
    dimensions,
    care,
    price,
    color,
    inStock,
    featured
  } | order(_createdAt desc)`;

  const categoriesQuery = `*[_type == "category"] {
    _id,
    name,
    slug,
    description
  } | order(name asc)`;

  // Hämta data från Sanity
useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      console.log('🔍 Försöker hämta data från Sanity...');
      const [productsData, categoriesData] = await Promise.all([
        client.fetch(productsQuery),
        client.fetch(categoriesQuery)
      ]);
      console.log('📦 Produkter:', productsData);
      console.log('🏷️ Kategorier:', categoriesData);
      setProducts(productsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('❌ Fel vid hämtning:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);

  // Skapa grupper baserat på kategorier från Sanity + "Alla"
  const groups = [
    { id: "alla", label: "Alla" },
    ...categories.map(cat => ({
      id: cat.slug.current,
      label: cat.name
    }))
  ];

  // Filtrera produkter baserat på vald kategori
  const filteredProducts = selectedGroup === "alla" 
    ? products 
    : products.filter(product => 
        product.category?.slug.current === selectedGroup
      );

    const handleProductClick = (product: SanityProduct) => {
      navigate('/order', { state: { selectedProduct: product } });
    };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Laddar produkter...</span>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title="Produkter" 
        description="Upptäck vårt utbud av handgjorda läderprodukter. Väskor, bälten, accessoarer och mer - allt tillverkat med traditionellt hantverk."
        url="https://sadelmakeriet.se/shop"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Produkter | Sadelmakeriet",
          "description": "Handgjorda läderprodukter - väskor, bälten, accessoarer och mer.",
          "url": "https://sadelmakeriet.se/shop"
        }}
      />
      <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 pt-24 text-center"
            style={{ backgroundColor: "var(--background)" }}>
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="font-logo text-4xl md:text-6xl mb-6 text-logo-text">
            Produkter
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Upptäck vårt utbud av handgjorda läderprodukter – varje artikel är unik och skapad med traditionella tekniker och modern design.
          </p>
        </div>
      </section>
      
      {/* Filter Section */}
      <section className="py-8"
        style={{ backgroundColor: "var(--background)" }}>
        <div className="max-w-6xl mx-auto px-4">

          {SHOW_PRODUCTS ? (
            <>
              {/* ── Filter-knappar ── */}
              <div className="flex flex-wrap justify-center gap-6 mb-12">
                {groups.map((group) => (
                  <button
                    key={group.id}
                    onClick={() => setSelectedGroup(group.id)}
                    className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                      selectedGroup === group.id 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-muted text-muted-foreground hover:bg-beige-800 hover:text-beige-900"
                    }`}
                  >
                    {group.label}
                  </button>
                ))}
              </div>

              {/* ── Lindning Special Section ── */}
              {selectedGroup === "lindning" && (
                <div className="mb-12"
                  style={{ backgroundColor: "var(--background)" }}>
                  <Card className="overflow-hidden bg-gradient-to-r from-primary/5 to-primary/10"
                   style={{ backgroundColor: "var(--background)" }}>
                    <div className="p-8 text-center">
                      <h3 className="text-3xl font-bold mb-4">Lindning</h3>
                      <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                        Behöver du lindning i specifika mått? Vi tillverkar lindningar efter dina
                        exakta behov. Välj färg och dimensioner för att få en personlig offert.
                      </p>
                      <Button
                        size="lg"
                        onClick={() => navigate("/offert-lindning")}
                        className="bg-primary hover:bg-primary/90"
                      >
                        Be om offert för lindning
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>

                      <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="overflow-hidden rounded-xl shadow-lg">
                          <img src={furnitureImage1} alt="Läderhantverk exempel 1" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                        </div>
                        <div className="overflow-hidden rounded-xl shadow-lg">
                          <img src={furnitureImage2} alt="Läderhantverk exempel 2" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                        </div>
                        <div className="overflow-hidden rounded-xl shadow-lg">
                          <img src={furnitureImage3} alt="Läderhantverk exempel 3" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                        </div>
                        <div className="overflow-hidden rounded-xl shadow-lg">
                          <img src={furnitureImage4} alt="Läderhantverk exempel 4" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              )}

              {/* ── Product Grid ── */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <Card 
                    key={product._id} 
                    className="overflow-hidden cursor-pointer transition-shadow duration-300 shadow-sm hover:shadow-md border border-gray-100 rounded-lg"
                    onClick={() => handleProductClick(product)}
                  >
                    <div className="w-full aspect-[4/3] bg-gray-50 overflow-hidden">
                      {product.image ? (
                        <img 
                          src={urlFor(product.image).width(600).height(450).fit('crop').url()} 
                          alt={product.name} 
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          Ingen bild
                        </div>
                      )}
                    </div>

                    <div className="p-6 text-center font-sans">
                      <h3 className="text-2xl mb-2 text-gray-900 transition-colors group-hover:text-primary">
                        {product.name}
                      </h3>
                      {product.description && (
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {product.description}
                        </p>
                      )}
                      {product.price && (
                        <p className="text-gray-800 font-medium text-base mb-4">
                          {product.price} SEK
                        </p>
                      )}

                      <Button 
                        size="sm" 
                        className="mx-auto hover:bg-beige-800 hover:text-beige-900 transition-all"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleProductClick(product);
                        }}
                      >
                        Välj produkt
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            // ── Kommer snart ──────────────────────────────────────
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Kommer snart</h2>
              <p className="text-muted-foreground max-w-sm">
                Vi jobbar på att göra våra produkter tillgängliga här. Hör av dig till oss om du redan nu vill beställa något.
              </p>
            </div>
            // ─────────────────────────────────────────────────────
          )}

        </div>
      </section>

      <Footer />
      </div>
    </>
  );
};

export default Shop;
