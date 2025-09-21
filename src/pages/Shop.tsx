import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Footer from "@/components/ui/footer";
import { useState, useEffect } from "react";
import { X, ArrowRight, Loader2 } from "lucide-react";
import { client, urlFor, SanityProduct, SanityCategory } from "@/lib/sanity";

const Shop = () => {
  const [selectedGroup, setSelectedGroup] = useState("alla");
  const [selectedProduct, setSelectedProduct] = useState<SanityProduct | null>(null);
  const [products, setProducts] = useState<SanityProduct[]>([]);
  const [categories, setCategories] = useState<SanityCategory[]>([]);
  const [loading, setLoading] = useState(true);

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
// Hämta data från Sanity
useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      console.log('🔍 Försöker hämta data från Sanity...'); // ← NYTT
      const [productsData, categoriesData] = await Promise.all([
        client.fetch(productsQuery),
        client.fetch(categoriesQuery)
      ]);
      console.log('📦 Produkter:', productsData); // ← NYTT
      console.log('🏷️ Kategorier:', categoriesData); // ← NYTT
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

  const googleFormLink =
    "https://docs.google.com/forms/d/e/1FAIpQLSfRLT8kS_mucH9NrZbjw3_1cPgW3wdNf3w2iUDYMpsrmyZePA/viewform?usp=header";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Laddar produkter...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-10 relative pt-20 text-center"
      style={{ backgroundColor: "var(--background)" }}>
        <div className="max-w-3xl mx-auto">
          <h1 className="font-logo text-5xl md:text-7xl mb-6 leading-tight text-logo-text hover:text-logo-text/80 transition-colors duration-300">
            Produkter
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed hover:text-foreground transition-colors duration-300">
            Upptäck vårt utbud av handgjorda läderprodukter – varje artikel är unik och skapad med traditionella tekniker och modern design.
          </p>
        </div>
      </section>

      {/* Filter Buttons */}
     <section className="py-20 relative pt-10 pb-16 text-center"
      style={{ backgroundColor: "var(--background)" }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {groups.map((group) => (
              <Button
                key={group.id}
                variant={selectedGroup === group.id ? "default" : "outline"}
                onClick={() => setSelectedGroup(group.id)}
                className="transform hover:scale-105 transition-all duration-300 hover:shadow-md"
              >
                {group.label}
              </Button>
            ))}
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="py-20 relative pt-10 pb-16 text-center"
      style={{ backgroundColor: "var(--background)" }}>
              <p className="text-muted-foreground text-lg">
                Inga produkter hittades i denna kategori.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <Card 
                  key={product._id} 
                  className="overflow-hidden group text-center cursor-pointer transform hover:scale-105 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary/20"
                  onClick={() => setSelectedProduct(product)}
                >
                  {/* Product Image */}
                  <div className="relative h-64 bg-muted flex items-center justify-center overflow-hidden">
                    {product.image ? (
                      <img 
                        src={urlFor(product.image).width(400).height(256).fit('crop').url()} 
                        alt={product.name} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">Ingen bild</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <h3 className="font-playfair text-lg font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                      {product.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 group-hover:text-foreground transition-colors duration-300">
                      {product.description}
                    </p>
                    {product.price && (
                      <p className="text-primary font-semibold mb-4">
                        {product.price} SEK
                      </p>
                    )}
                    <Button 
                      size="lg" 
                      className="group/btn transform hover:scale-105 transition-all duration-300"
                    >
                      Se mer information
                      <ArrowRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in">
          {/* Suddig bakgrund */}
          <div
            className="absolute inset-0 bg-white/50 backdrop-blur-sm"
            onClick={() => setSelectedProduct(null)}
          ></div>

          {/* Solid modalpanel */}
          <div
            className="relative bg-white border border-gray-200 rounded-xl max-w-2xl w-full mx-4 shadow-2xl z-10 max-h-[90vh] overflow-y-auto transform scale-95 hover:scale-100 transition-transform duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full p-1 transition-all duration-300 z-10"
              onClick={() => setSelectedProduct(null)}
            >
              <X className="h-6 w-6" />
            </button>

            {/* Product Image */}
            <div className="h-80 bg-gray-100 overflow-hidden">
              {selectedProduct.image ? (
                <img 
                  src={urlFor(selectedProduct.image).width(800).height(320).fit('crop').url()} 
                  alt={selectedProduct.name} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">Ingen bild</span>
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="p-6">
              <h2 className="font-playfair text-3xl font-semibold mb-4 text-gray-900 hover:text-primary transition-colors duration-300">
                {selectedProduct.name}
              </h2>
              
              {selectedProduct.category && (
                <Badge className="mb-4">{selectedProduct.category.name}</Badge>
              )}
              
              <p className="text-gray-600 mb-6 leading-relaxed hover:text-gray-900 transition-colors duration-300">
                {selectedProduct.detailDescription || selectedProduct.description}
              </p>

              {/* Features */}
              {selectedProduct.features && selectedProduct.features.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-medium mb-3 text-gray-900">Produktegenskaper:</h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    {selectedProduct.features.map((feature, index) => (
                      <li key={index} className="flex items-start hover:text-gray-900 transition-colors duration-300">
                        <span className="text-primary mr-2">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Product Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                {selectedProduct.dimensions && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Mått:</h4>
                    <p className="text-sm text-gray-600">{selectedProduct.dimensions}</p>
                  </div>
                )}
                {selectedProduct.care && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Skötsel:</h4>
                    <p className="text-sm text-gray-600">{selectedProduct.care}</p>
                  </div>
                )}
                {selectedProduct.price && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Pris:</h4>
                    <p className="text-lg font-semibold text-primary">{selectedProduct.price} SEK</p>
                  </div>
                )}
              </div>

              {/* Call to Action */}
              <div className="border-t border-gray-200 pt-6">
                <p className="text-sm text-gray-600 mb-4 text-center">
                  Intresserad av denna produkt? Kontakta oss för mer information och leveranstid.
                </p>
                <div className="flex justify-center gap-4">
                  <a href={googleFormLink} target="_blank" rel="noopener noreferrer">
                    <Button size="lg">
                      Beställ nu <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Shop;