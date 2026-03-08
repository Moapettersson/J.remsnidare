import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Check, Mail, Phone, User, MapPin, MessageSquare, Package } from 'lucide-react';
import { writeClient, urlFor, SanityProduct } from '@/lib/sanity';
import SEO from '@/components/SEO';

const Order = () => {
  const location = useLocation();
const selectedProduct = location.state?.selectedProduct as SanityProduct;
  
  const [currentStep, setCurrentStep] = useState(1);
  const [orderData, setOrderData] = useState({
    product: '',
    productType: '',
    color: '',
    customerInfo: {
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      postalCode: ''
    },
    orderDetails: {
      message: '',
      deliveryPreference: 'standard',
      preferredContact: 'email'
    }
  });

  // Sätt produktnamn när komponenten laddas
  useEffect(() => {
    if (selectedProduct) {
      setOrderData(prev => ({
        ...prev,
        product: selectedProduct.name,
        
      }));
    }
  }, [selectedProduct]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);


type NestedSections = "customerInfo" | "orderDetails";

const handleInputChange = (
  section: NestedSections,
  field: string,
  value: string
) => {
  setOrderData(prev => ({
    ...prev,
    [section]: {
      ...prev[section],
      [field]: value
    }
  }));
};

const handleSubmit = async () => {
  setIsSubmitting(true);

  try {
    const newOrder = {
      _type: 'order', // måste matcha schemat
      product: orderData.product,
      productType: orderData.productType,
      customerInfo: orderData.customerInfo,
      orderDetails: orderData.orderDetails,
      timestamp: new Date().toISOString(),
    };

    const result = await writeClient.create(newOrder);
    console.log('Order sparad i Sanity:', result);

    setIsSubmitted(true);
  } catch (error) {
    console.error('Kunde inte spara order:', error);
  } finally {
    setIsSubmitting(false);
  }
};

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4"  style={{ backgroundColor: "var(--background)" }}>
        <Card className="max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="font-logo text-2xl font-semibold mb-4">Tack för din beställning!</h2>
          <p className="text-muted-foreground mb-6">
            Vi har mottagit din beställning och återkommer inom 24 timmar med pris och leveranstid.
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            En bekräftelse har skickats till din e-post.
          </p>
          <Button onClick={() => window.location.href = '/'} className="w-full ">
            Tillbaka till startsidan
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title="Beställning" 
        description="Beställ din handgjorda läderprodukt från Sadelmakeriet. Vi skapar unika produkter efter dina önskemål."
        url="https://sadelmakeriet.se/order"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Beställning | Sadelmakeriet",
          "description": "Beställ din handgjorda läderprodukt.",
          "url": "https://sadelmakeriet.se/order"
        }}
      />
      <div className="min-h-screen bg-background"
      style={{ backgroundColor: "var(--background)" }}>
      {/* Header */}
      <div className="bg-background border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => window.history.back()}
              className="flex items-center text-muted-foreground hover:bg-beige-800 hover:text-beige-900"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Tillbaka
            </button>
            <h1 className="font-logo text-2xl text-logo-text">Beställning</h1>
            <div className="w-20"></div>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center mb-8">
          {[1, 2, 3].map((step) => (
             <div key={step} className="flex items-center">
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors
          ${currentStep === step 
            ? "bg-beige-900 text-white"   // aktivt steg = beige bubbla
            : "text-gray-700"}        // inaktiva steg = bara text
        `}
      >
        {step}
      </div>

      {step < 3 && (
        <div
          className={`w-16 h-0.5 mx-4 transition-colors
            ${currentStep > step ? "bg-gray-300" : "bg-gray-300"}
                }`} />
              )}
            </div>
          ))}
        </div>

        <div className="text-center mb-8">
          <h2 className="text-xl mb-2">
            {currentStep === 1 && "Välj produkt"}
            {currentStep === 2 && "Dina uppgifter"}
            {currentStep === 3 && "Slutför beställning"}
          </h2>
          <p className="text-muted-foreground">
            {currentStep === 1 && "Vad vill du beställa?"}
            {currentStep === 2 && "Så vi kan kontakta dig"}
            {currentStep === 3 && "Granska och skicka din beställning"}
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Step 1: Product Selection and Color */}
          {currentStep === 1 && (
            <Card className="p-6">
              <div className="space-y-6">
                {/* Visa vald produkt med bild */}
                {selectedProduct ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 border rounded-lg bg-muted/50">
                      {selectedProduct.image && (
                        <img 
                          src={urlFor(selectedProduct.image).width(80).height(80).fit('crop').url()} 
                          alt={selectedProduct.name} 
                          className="w-16 h-16 rounded object-cover"
                        />
                      )}
                      <div>
                        <p className="text-m text-muted-foreground mb-1">Du har valt:</p>
                        <h3 className="text-lg text-foreground">{selectedProduct.name}</h3>
                        {selectedProduct.category && (
                          <Badge variant="secondary" className="text-xs mt-1">
                    
                          </Badge>
                        )}
                        {selectedProduct.price && (
                          <p className="text-primary font-medium mt-1">{selectedProduct.price} SEK</p>
                        )}
                      </div>
                    </div>
                    
                    {selectedProduct.description && (
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <p className="text-sm text-muted-foreground">{selectedProduct.description}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-4 border rounded-lg bg-muted/50">
                    <p className="text-sm text-muted-foreground">Ingen produkt vald</p>
                    <p className="font-medium text-lg text-foreground">Gå tillbaka till produktsidan för att välja en produkt</p>
                  </div>
                )}

                {/* Färgval */}
                <div>
                  <h4 className="text-lg text-muted-foreground  mb-4">Välj färg</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Välj den lädernyans som passar dig bäst
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { title: 'Naturell', value: 'naturell', color: '#E6D7B8' },
                      { title: 'Ljusbrun', value: 'ljusbrun', color: '#A0692B' },
                      { title: 'Mörkbrun', value: 'mörkbrun', color: '#5D3319' },
                      { title: 'Svart', value: 'svart', color: '#1A1A1A' },
                      { title: 'Annat', value: 'annat', color: '#8B7355' },
                    ].map((c) => (
                      <label
                        key={c.value}
                        className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all hover:bg-beige-800 hover:text-beige-900 ${
                          orderData.color === c.value ? 'border-primary bg-primary/5' : 'border-border'
                        }`}
                      >
                        <div 
                          className="w-6 h-6 rounded-full border-2 border-border mr-3"
                          style={{ backgroundColor: c.color }}
                        />
                        <input
                          type="radio"
                          name="color"
                          value={c.value}
                          checked={orderData.color === c.value}
                          onChange={(e) =>
                            setOrderData((prev) => ({
                              ...prev,
                              color: e.target.value,
                            }))
                          }
                          className="sr-only"
                        />
                        <span className="font-medium text-foreground">{c.title}</span>
                        {orderData.color === c.value && (
                          <Check className="ml-auto h-5 w-5 text-primary" />
                        )}
                      </label>
                    ))}
                  </div>
                  
               
                    
                  
                </div>

                <div className="flex justify-between pt-4 ">
                  <Button
                    type="button"
                   
                    onClick={() => window.history.back()}
                    
                    className="hover:bg-beige-800 hover:text-beige-900"
                  >
                    Tillbaka till produkter
                  </Button>
                  <Button
                    type="button"
                    onClick={nextStep}
                     disabled={!orderData.color || !orderData.product}
                  className="hover:bg-beige-800 hover:text-beige-900"
                  >
                    Nästa steg
                  </Button>
                </div>
              </div>
            </Card>
          )}


          {/* Step 2: Customer Information */}
          {currentStep === 2 && (
            <Card className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="flex items-center text-sm font-medium mb-2">
                      <User className="h-4 w-4 mr-2 text-primary" />
                      Fullständigt namn *
                    </label>
                    <input
                      type="text"
                      required
                      value={orderData.customerInfo.name}
                      onChange={(e) => handleInputChange('customerInfo', 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Ditt för- och efternamn"
                    />
                  </div>

                  <div>
                    <label className="flex items-center text-sm font-medium mb-2">
                      <Mail className="h-4 w-4 mr-2 text-primary" />
                      E-postadress *
                    </label>
                    <input
                      type="email"
                      required
                      value={orderData.customerInfo.email}
                      onChange={(e) => handleInputChange('customerInfo', 'email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="din@email.se"
                    />
                  </div>

                  <div>
                    <label className="flex items-center text-sm font-medium mb-2">
                      <Phone className="h-4 w-4 mr-2 text-primary" />
                      Telefonnummer *
                    </label>
                    <input
                      type="tel"
                      required
                      value={orderData.customerInfo.phone}
                      onChange={(e) => handleInputChange('customerInfo', 'phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="070-123 45 67"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="flex items-center text-sm font-medium mb-2">
                      <MapPin className="h-4 w-4 mr-2 text-primary" />
                      Adress
                    </label>
                    <input
                      type="text"
                      value={orderData.customerInfo.address}
                      onChange={(e) => handleInputChange('customerInfo', 'address', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Gatuadress"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Postnummer
                      </label>
                      <input
                        type="text"
                        value={orderData.customerInfo.postalCode}
                        onChange={(e) => handleInputChange('customerInfo', 'postalCode', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="123 45"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Stad
                      </label>
                      <input
                        type="text"
                        value={orderData.customerInfo.city}
                        onChange={(e) => handleInputChange('customerInfo', 'city', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Staden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Föredragen kontaktmetod
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="contactMethod"
                          value="email"
                          checked={orderData.orderDetails.preferredContact === 'email'}
                          onChange={(e) => handleInputChange('orderDetails', 'preferredContact', e.target.value)}
                          className="text-primary mr-2"
                        />
                        E-post
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="contactMethod"
                          value="phone"
                          checked={orderData.orderDetails.preferredContact === 'phone'}
                          onChange={(e) => handleInputChange('orderDetails', 'preferredContact', e.target.value)}
                          className="text-primary mr-2"
                        />
                        Telefon
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-6">
                <Button type="button" onClick={prevStep}  
    className="hover:bg-beige-800 hover:text-beige-900">
                  Föregående
                </Button>
                <Button 
                  type="button" 
                  onClick={nextStep}
                  disabled={!orderData.customerInfo.name || !orderData.customerInfo.email || !orderData.customerInfo.phone}
                >
                  Nästa steg
                </Button>
              </div>
            </Card>
          )}

          {/* Step 3: Order Details and Submit */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <Card className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="flex items-center text-sm font-medium mb-2">
                      <MessageSquare className="h-4 w-4 mr-2 text-primary" />
                      Meddelande och önskemål
                    </label>
                    <textarea
                      value={orderData.orderDetails.message}
                      onChange={(e) => handleInputChange('orderDetails', 'message', e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Beskriv dina önskemål, färgval, storlek eller andra specifikationer..."
                    />
                  </div>

                  <div>
                    <label className="flex items-center text-sm font-medium mb-2">
                      <Package className="h-4 w-4 mr-2 text-primary" />
                      Leverans
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="delivery"
                          value="standard"
                          checked={orderData.orderDetails.deliveryPreference === 'standard'}
                          onChange={(e) => handleInputChange('orderDetails', 'deliveryPreference', e.target.value)}
                          className="text-primary mr-2"
                        />
                        Standardleverans (diskuteras vid beställning)
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="delivery"
                          value="pickup"
                          checked={orderData.orderDetails.deliveryPreference === 'pickup'}
                          onChange={(e) => handleInputChange('orderDetails', 'deliveryPreference', e.target.value)}
                          className="text-primary mr-2"
                        />
                        Hämtning i verkstad
                      </label>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Order Summary */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Sammanfattning</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Produkt:</span>
                    <span className="font-medium">{orderData.product}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Färg:</span>
                    <span className="font-medium">{orderData.color}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Namn:</span>
                    <span>{orderData.customerInfo.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">E-post:</span>
                    <span>{orderData.customerInfo.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Telefon:</span>
                    <span>{orderData.customerInfo.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Kontakt via:</span>
                    <span className="capitalize">{orderData.orderDetails.preferredContact === 'email' ? 'E-post' : 'Telefon'}</span>
                  </div>
                </div>
              </Card>

              <div className="flex justify-between pt-4">
                <Button type="button" onClick={prevStep}>
                  Föregående
                </Button>
                <Button 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-primary hover:bg-beige-800 hover:text-beige-900"
                >
                  {isSubmitting ? 'Skickar...' : 'Skicka beställning'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      </div>
    </>
  );
};

export default Order;