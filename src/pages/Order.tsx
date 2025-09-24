import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Check, Mail, Phone, User, MapPin, MessageSquare, Package } from 'lucide-react';
import { writeClient } from '@/lib/sanity';

const Order = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [orderData, setOrderData] = useState({
    product: '',
    productType: '',
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Exempel på produkter (skulle kunna komma från props eller context)
  const availableProducts = [
    { id: 1, name: "Handväska - bärnsten", type: "väskor", price: "Pris på förfrågan" },
    { id: 2, name: "Weekendbag för katten", type: "resenaren", price: "Pris på förfrågan" },
    { id: 3, name: "Jaktväska i läder", type: "jagaren", price: "Pris på förfrågan" },
    { id: 4, name: "Knivskydd", type: "jagaren", price: "Pris på förfrågan" },
    { id: 5, name: "Anpassad beställning", type: "custom", price: "Pris på förfrågan" }
  ];

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
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="font-playfair text-2xl font-semibold mb-4">Tack för din beställning!</h2>
          <p className="text-muted-foreground mb-6">
            Vi har mottagit din beställning och återkommer inom 24 timmar med pris och leveranstid.
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            En bekräftelse har skickats till din e-post.
          </p>
          <Button onClick={() => window.location.href = '/'} className="w-full">
            Tillbaka till startsidan
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background"
    style={{ backgroundColor: "var(--background)" }}>
      {/* Header */}
      <div className="bg-background border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => window.history.back()}
              className="flex items-center text-muted-foreground hover:text-primary"
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
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= step 
                  ? 'bg-primary text-white' 
                  : 'bg-stone-200'
              }`}>
                {step}
              </div>
              {step < 3 && (
                <div className={`w-16 h-0.5 mx-4 ${
                  currentStep > step ? 'bg-primary' : 'bg-stone-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        <div className="text-center mb-8">
          <h2 className="text-xl font-semibold mb-2">
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
          {/* Step 1: Product Selection */}
          {currentStep === 1 && (
            <Card className="p-6">
              <div className="space-y-4">
                <div className="grid gap-4">
                  {availableProducts.map((product) => (
                    <label key={product.id} className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                      <input
                        type="radio"
                        name="product"
                        value={product.name}
                        checked={orderData.product === product.name}
                        onChange={(e) => {
                          setOrderData(prev => ({
                            ...prev,
                            product: e.target.value,
                            productType: product.type
                          }));
                        }}
                        className="text-primary"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{product.name}</span>
                          <Badge variant="outline">{product.price}</Badge>
                        </div>
                        {product.type === 'custom' && (
                          <p className="text-sm text-muted-foreground mt-1">
                            Beskriv din önskade produkt i nästa steg
                          </p>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
                
                <div className="flex justify-end pt-4">
                  <Button 
                    type="button" 
                    onClick={nextStep}
                    disabled={!orderData.product}
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
                <Button type="button" variant="outline" onClick={prevStep}>
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
                <Button type="button" variant="outline" onClick={prevStep}>
                  Föregående
                </Button>
                <Button 
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-primary hover:bg-primary/90"
                >
                  {isSubmitting ? 'Skickar...' : 'Skicka beställning'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;