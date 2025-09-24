import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Footer from "@/components/ui/footer";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { urlFor, SanityProduct } from "@/lib/sanity";

const ProductSelection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product as SanityProduct;
  const [selectedColor, setSelectedColor] = useState<string>("");

  const colorOptions = [
    { value: 'naturell', label: 'Naturell', color: '#E6D7B8' },
    { value: 'ljusbrun', label: 'Ljusbrun', color: '#A0692B' },
    { value: 'mörkbrun', label: 'Mörkbrun', color: '#5D3319' },
    { value: 'svart', label: 'Svart', color: '#1A1A1A' },
    { value: 'annat', label: 'Annat', color: '#8B7355' },
  ];

  useEffect(() => {
    if (!product) {
      navigate('/shop');
    }
  }, [product, navigate]);

  if (!product) {
    return null;
  }

  const handleOrderClick = () => {
    navigate('/order', { 
      state: { 
        product: product, 
        selectedColor: selectedColor 
      } 
    });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--background)" }}>
      {/* Header */}
      <section className="py-10 relative pt-20">
        <div className="max-w-4xl mx-auto px-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/shop')}
            className="mb-6 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Tillbaka till produkter
          </Button>
          
          <div className="text-center mb-8">
            <h1 className="font-logo text-4xl md:text-5xl mb-4 text-logo-text">
              Du har valt
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-2">
              {product.name}
            </h2>
            {product.category && (
              <Badge variant="secondary" className="mb-4">
                {product.category.name}
              </Badge>
            )}
          </div>
        </div>
      </section>

      {/* Product Overview */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Product Image */}
            <div className="relative">
              <div className="aspect-square bg-muted rounded-lg overflow-hidden">
                {product.image ? (
                  <img 
                    src={urlFor(product.image).width(600).height(600).fit('crop').url()} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    Ingen bild tillgänglig
                  </div>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">Produktbeskrivning</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {product.detailDescription || product.description}
                </p>
              </div>

              {product.features && product.features.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">Egenskaper</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-muted-foreground">
                        <span className="text-primary mr-2 mt-1">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                {product.dimensions && (
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Mått</h4>
                    <p className="text-sm text-muted-foreground">{product.dimensions}</p>
                  </div>
                )}
                {product.care && (
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Skötsel</h4>
                    <p className="text-sm text-muted-foreground">{product.care}</p>
                  </div>
                )}
                {product.price && (
                  <div className="sm:col-span-2">
                    <h4 className="font-medium text-foreground mb-1">Pris</h4>
                    <p className="text-2xl font-semibold text-primary">{product.price} SEK</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Color Selection */}
          <Card className="p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold mb-3 text-foreground">Välj färg</h3>
              <p className="text-muted-foreground">
                Välj den lädernyans som passar dig bäst
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
              {colorOptions.map((color) => (
                <div
                  key={color.value}
                  className={`cursor-pointer p-4 rounded-lg border-2 transition-all duration-300 ${
                    selectedColor === color.value
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => setSelectedColor(color.value)}
                >
                  <div className="text-center">
                    <div 
                      className="w-12 h-12 rounded-full mx-auto mb-3 border-2 border-border relative"
                      style={{ backgroundColor: color.color }}
                    >
                      {selectedColor === color.value && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Check className="h-6 w-6 text-white drop-shadow-lg" />
                        </div>
                      )}
                    </div>
                    <p className="font-medium text-sm text-foreground">{color.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {selectedColor && (
              <div className="text-center p-4 bg-primary/5 rounded-lg mb-6">
                <p className="text-foreground">
                  Du har valt färgen: <span className="font-semibold text-primary">
                    {colorOptions.find(c => c.value === selectedColor)?.label}
                  </span>
                </p>
              </div>
            )}

            <div className="text-center">
              <Button 
                size="lg" 
                onClick={handleOrderClick}
                disabled={!selectedColor}
                className="px-8 py-3"
              >
                Fortsätt till beställning
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              {!selectedColor && (
                <p className="text-sm text-muted-foreground mt-2">
                  Välj en färg för att fortsätta
                </p>
              )}
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductSelection;