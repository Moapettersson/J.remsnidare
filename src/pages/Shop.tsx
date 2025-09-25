import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Footer from "@/components/ui/footer";
import { useState, useEffect } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { client, urlFor, SanityProduct, SanityCategory } from "@/lib/sanity";
import { useNavigate } from "react-router-dom";


const Shop = () => {
  const [selectedGroup, setSelectedGroup] = useState("alla");
  const [products, setProducts] = useState<SanityProduct[]>([]);
  const [categories, setCategories] = useState<SanityCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  

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
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4">
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

          {/* Product Grid */}
<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
  {filteredProducts.map((product) => (
    <Card 
      key={product._id} 
      className="overflow-hidden cursor-pointer transition-shadow duration-300 shadow-sm hover:shadow-md border border-gray-100 rounded-lg"
      onClick={() => handleProductClick(product)}
    >
      {/* Produktbild */}
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

      {/* Produktinfo */}
      <div className="p-6 text-center font-sans">
        <h3 className="text-2xl  mb-2 text-gray-900 transition-colors group-hover:text-primary">
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
          className="w-full bg-transparent border border-white-800 text-beige-800 hover:bg-beige-800 hover:text-beige-900 transition-all "
          onClick={(e) => {
            e.stopPropagation();
            handleProductClick(product);
          }}
        >
          Välj produkt
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </Card>
  ))}
</div>

       
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Shop;