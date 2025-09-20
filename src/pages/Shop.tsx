import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Footer from "@/components/ui/footer";
import bagImage from "@/assets/products/bag.jpg";
import catImage from "@/assets/products/cat.jpg";
import knivesImage from "@/assets/products/knives.jpg";
import gunBagImage from "@/assets/products/gunbag.jpg";
import { useState } from "react";
import { X, ArrowRight } from "lucide-react";

const Shop = () => {
  const [selectedGroup, setSelectedGroup] = useState("alla");
  const [selectedProduct, setSelectedProduct] = useState(null as typeof products[0] | null);

  const groups = [
    { id: "alla", label: "Alla" },
    { id: "jagaren", label: "För jägaren" },
    { id: "hundagaren", label: "För hundägaren" },
    { id: "inredaren", label: "För inredaren" },
    { id: "resenaren", label: "För resenären" },
    { id: "väskor", label: "För handväskbäraren" },
  ];

  const products = [
    {
      id: 1,
      name: "Handväska - bärnsten",
      group: "väskor",
      image: bagImage,
      description: "Elegant handgjord läderväska i bärnstenstoner",
      detailDescription: "Denna eleganta handväska är tillverkad i högkvalitativt läder med vackra bärnstenstoner. Varje väska är unik och handgjord med traditionella tekniker. Perfekt för vardag eller fest.",
      features: ["Handgjort kvalitetsläder", "Unik design", "Flera fack", "Justerbara axelband"],
      dimensions: "30x25x10 cm",
      care: "Torka av med fuktig trasa, använd lädervård regelbundet"
    },
    {
      id: 2,
      name: "Weekendbag för katten",
      group: "resenaren",
      image: catImage,
      description: "Rymlig weekendbag i robust läder för resan",
      detailDescription: "En rymlig och praktisk weekendbag som tål tidens tand. Tillverkad i robust läder som blir vackrare med åren. Perfekt för kortare resor eller som träningsväska.",
      features: ["Robust construction", "Rymlig huvudfack", "Förstärka handtag", "Tidlös design"],
      dimensions: "45x30x20 cm",
      care: "Rengör med lädertvål, behandla med läderolja"
    },
    {
      id: 3,
      name: "Jaktväska i läder",
      group: "jagaren",
      image: gunBagImage,
      description: "Praktisk och slitstark jaktväska med flera fack",
      detailDescription: "Specialdesignad för jägaren som kräver både funktionalitet och hållbarhet. Väskan har flera fack för organisation och är tillverkad för att klara tuffa förhållanden.",
      features: ["Vattentåligt läder", "Flera specialfack", "Förstärkt botten", "Justerbar axelrem"],
      dimensions: "40x35x15 cm",
      care: "Rengör efter användning, impregnera regelbundet"
    },
    {
      id: 4,
      name: "Knivskydd",
      group: "jagaren",
      image: knivesImage,
      description: "Slittåligt knivskydd",
      detailDescription: "Handgjorda knivskydd som skyddar både kniv och användare. Tillverkade i tjockt läder med säker fastsättning. Passar de flesta knivar.",
      features: ["Tjockt skyddsläder", "Säker fastsättning", "Handgjord kvalitet", "Anpassningsbar storlek"],
      dimensions: "Varierar efter knivstorlek",
      care: "Torka av efter användning, behandla med läderolja"
    },
  ];

  const filteredProducts =
    selectedGroup === "alla"
      ? products
      : products.filter((product) => product.group === selectedGroup);

  const googleFormLink =
    "https://docs.google.com/forms/d/e/1FAIpQLSd35Iup_nlptG-ODKW089-l7iT_y16tMiLd_c4xodFR5PKhBA/viewform?usp=header";

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 relative pt-20 pb-10 text-center"
      style={{ backgroundColor: "var(--background)" }}>
        <div className="max-w-3xl mx-auto">
          <h1 className="font-logo text-5xl md:text-7xl mb-6 leading-tight text-logo-text">
            Produkter
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Upptäck vårt utbud av handgjorda läderprodukter – varje artikel är unik och skapad med traditionella tekniker och modern design.
          </p>
        </div>
      </section>

      {/* Filter Buttons */}
     <section className="py-20 relative pt-5 pb-16 text-center"
      style={{ backgroundColor: "var(--background)" }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {groups.map((group) => (
              <Button
                key={group.id}
                variant={selectedGroup === group.id ? "default" : "outline"}
                onClick={() => setSelectedGroup(group.id)}
              >
                {group.label}
              </Button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <Card 
                key={product.id} 
                className="overflow-hidden group text-center cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelectedProduct(product)}
              >
                {/* Product Image */}
                <div className="relative h-64 bg-muted flex items-center justify-center">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="font-playfair text-lg font-semibold mb-2">{product.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{product.description}</p>
                  <Button variant="outline" size="sm">
                    Se mer information
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Suddig bakgrund */}
          <div
            className="absolute inset-0 bg-white/50 backdrop-blur-sm"
            onClick={() => setSelectedProduct(null)}
          ></div>

          {/* Solid modalpanel */}
          <div
            className="relative bg-white border border-gray-200 rounded-xl max-w-2xl w-full mx-4 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
              onClick={() => setSelectedProduct(null)}
            >
              <X className="h-6 w-6" />
            </button>

            {/* Product Image */}
            <div className="h-80 bg-gray-100">
              <img 
                src={selectedProduct.image} 
                alt={selectedProduct.name} 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Details */}
            <div className="p-6">
              <h2 className="font-playfair text-3xl font-semibold mb-4 text-gray-900">
                {selectedProduct.name}
              </h2>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {selectedProduct.detailDescription}
              </p>

              {/* Features */}
              <div className="mb-6">
                <h3 className="font-medium mb-3 text-gray-900">Produktegenskaper:</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  {selectedProduct.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Product Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Mått:</h4>
                  <p className="text-sm text-gray-600">{selectedProduct.dimensions}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Skötsel:</h4>
                  <p className="text-sm text-gray-600">{selectedProduct.care}</p>
                </div>
              </div>

              {/* Call to Action */}
              <div className="border-t border-gray-200 pt-6">
                <p className="text-sm text-gray-600 mb-4 text-center">
                  Intresserad av denna produkt? Kontakta oss för pris och leveranstid.
                </p>
                <a href={googleFormLink} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="w-full">
                    Beställ nu <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Shop;