import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import  Footer  from "@/components/ui/footer";
import { useState } from "react";
import { ShoppingCart, Star, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("alla");
  
  const categories = [
    { id: "alla", label: "Alla produkter" },
    { id: "vaskor", label: "Väskor & Portföljer" },
    { id: "tillbehor", label: "Tillbehör" },
    { id: "mobler", label: "Möbler" },
    { id: "sadlar", label: "Sadlar & Sele" }
  ];

  const products = [
    {
      id: 1,
      name: "Handgjord läderportfölj",
      category: "vaskor",
      price: 2490,
      originalPrice: 2890,
      rating: 5,
      reviews: 23,
      image: "/api/placeholder/300/300",
      description: "Klassisk portfölj i fullnarvläder med mässingsbeslag",
      inStock: true,
      popular: true
    },
    {
      id: 2, 
      name: "Läderfåtölj Heritage",
      category: "mobler",
      price: 18900,
      rating: 5,
      reviews: 8,
      image: "/api/placeholder/300/300", 
      description: "Bekväm fåtölj i premiumläder med handgjord ram",
      inStock: true,
      popular: false
    },
    {
      id: 3,
      name: "Läderplånbok Premium",
      category: "tillbehor", 
      price: 890,
      originalPrice: 1190,
      rating: 4,
      reviews: 67,
      image: "/api/placeholder/300/300",
      description: "Kompakt plånbok med RFID-skydd och handstygn",
      inStock: true,
      popular: true
    },
    {
      id: 4,
      name: "Ridingssadel Classical",
      category: "sadlar",
      price: 15900,
      rating: 5,
      reviews: 12,
      image: "/api/placeholder/300/300",
      description: "Professionell ridingssadel med ergonomisk design",
      inStock: false,
      popular: false
    },
    {
      id: 5,
      name: "Weekendbag Traveller", 
      category: "vasko",
      price: 3490,
      rating: 5,
      reviews: 34,
      image: "/api/placeholder/300/300",
      description: "Rymlig weekendbag i robust läder för resan",
      inStock: true,
      popular: true
    },
    {
      id: 6,
      name: "Läderbälte Classic",
      category: "tillbehor",
      price: 690,
      rating: 4,
      reviews: 89,
      image: "/api/placeholder/300/300", 
      description: "Tidlöst läderbälte med solid mässingsspänne",
      inStock: true,
      popular: false
    }
  ];

  const filteredProducts = selectedCategory === "alla" 
    ? products 
    : products.filter(product => product.category === selectedCategory);

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
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <Badge className="mb-4 bg-primary/10 text-primary">Handgjort med kärlek</Badge>
            <h1 className="font-playfair text-5xl md:text-6xl font-bold text-primary mb-6">
              Våra Läderprodukter
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Upptäck vårt utbud av handgjorda läderprodukter - varje artikel 
              är unik och skapad med traditionella tekniker och modern design.
            </p>
          </div>
        </div>
      </section>

      {/* Shop Interface */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Search and Filter */}
          <div className="flex flex-col lg:flex-row gap-6 mb-12">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input 
                  placeholder="Sök produkter..." 
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex-shrink-0"
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="leather-card overflow-hidden group">
                {/* Product Image */}
                <div className="relative overflow-hidden">
                  <div className="w-full h-64 bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground">Produktbild</span>
                  </div>
                  {product.popular && (
                    <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                      Populär
                    </Badge>
                  )}
                  {!product.inStock && (
                    <Badge className="absolute top-3 right-3 bg-destructive text-destructive-foreground">
                      Slutsåld
                    </Badge>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="font-playfair text-lg font-semibold mb-2">
                    {product.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
                    {product.description}
                  </p>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < product.rating ? 'text-primary fill-current' : 'text-muted'}`} 
                      />
                    ))}
                    <span className="text-sm text-muted-foreground ml-2">
                      ({product.reviews})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="font-semibold text-lg">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-muted-foreground line-through text-sm">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <Button 
                    className="w-full" 
                    disabled={!product.inStock}
                    variant={product.inStock ? "default" : "secondary"}
                  >
                    {product.inStock ? (
                      <>
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Lägg i varukorg
                      </>
                    ) : (
                      "Slutsåld"
                    )}
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <Card className="leather-card p-8 max-w-2xl mx-auto">
              <h3 className="font-playfair text-2xl font-semibold mb-4">
                Hittade du inte det du sökte?
              </h3>
              <p className="text-muted-foreground mb-6">
                Vi skapar även skräddarsydda produkter efter dina önskemål. 
                Kontakta oss för en personlig konsultation.
              </p>
              <Button size="lg">
                Kontakta oss
              </Button>
            </Card>
          </div>
        </div>
      </section>
        <Footer />
    </div>
  );
};

export default Shop;