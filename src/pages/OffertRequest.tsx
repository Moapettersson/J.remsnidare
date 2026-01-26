// src/pages/OffertRequest.tsx
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Mail, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { writeClient } from "@/lib/sanity";
import { useToast } from "@/hooks/use-toast";
import SEO from "@/components/SEO";

const OffertRequest = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    productType: 'lindning',
    customerInfo: {
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      postalCode: ''
    },
    productDetails: {
      description: '',
      specifications: {
        color: '',
        dimensions: {
          length: '',
          width: '',
          height: ''
        },
        material: '',
        additionalRequirements: ''
      }
    },
    preferredContact: 'email',

    estimatedBudget: ''
  });

  const colorOptions = [
    { title: 'Naturell', value: 'naturell' },
    { title: 'Ljusbrun', value: 'ljusbrun' },
    { title: 'Mörkbrun', value: 'mörkbrun' },
    { title: 'Svart', value: 'svart' },
    { title: 'Annat (beskriv i meddelande)', value: 'annat' }
  ];



  const handleInputChange = (path: string, value: any) => {
    const keys = path.split('.');
    setFormData(prev => {
      const updated = { ...prev };
      let current: any = updated;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const offertRequestData = {
        _type: 'offertRequest',
        productType: formData.productType,
        customerInfo: formData.customerInfo,
        productDetails: {
          description: `Lindning - ${formData.productDetails.specifications.color}`,
          specifications: {
            ...formData.productDetails.specifications,
            dimensions: {
              length: parseInt(formData.productDetails.specifications.dimensions.length) || null,
              width: parseInt(formData.productDetails.specifications.dimensions.width) || null,
              height: parseInt(formData.productDetails.specifications.dimensions.height) || null
            }
          }
        },
        preferredContact: formData.preferredContact,

        estimatedBudget: formData.estimatedBudget ? parseInt(formData.estimatedBudget) : null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await writeClient.create(offertRequestData);
      
      toast({
        title: "Offertförfrågan skickad!",
        description: "Vi återkommer med ett prisförslag inom 2-3 arbetsdagar.",
      });
      
      setIsSubmitted(true);
    } catch (error) {
      console.error('Fel vid skickning av offertförfrågan:', error);
      toast({
        title: "Något gick fel",
        description: "Försök igen eller kontakta oss direkt.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center py-24"
         style={{ backgroundColor: "var(--background)" }}>
        <Card className="max-w-md mx-auto p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Tack för din förfrågan!</h2>
          <p className="text-muted-foreground mb-6">
            Vi har mottagit din offertförfrågan för lindning och återkommer med ett prisförslag inom 2-3 arbetsdagar.
          </p>
          <Button onClick={() => navigate('/')}>
            Tillbaka till startsidan
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <>
      <SEO 
        title="Be om offert - Lindning" 
        description="Få en offert för skräddarsydd läderlindning. Välj färg och mått för att få ett personligt prisförslag."
      />
      <div className="min-h-screen py-24"
     style={{ backgroundColor: "var(--background)" }}>
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Tillbaka
          </Button>
          <h1 className="text-3xl font-bold">Be om offert - Lindning</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Lindningsdetaljer */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Lindningsdetaljer</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Färg *</label>
                <div className="grid grid-cols-1 gap-2">
                  {colorOptions.map((color) => (
                    <label key={color.value} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="color"
                        value={color.value}
                        checked={formData.productDetails.specifications.color === color.value}
                        onChange={(e) => handleInputChange('productDetails.specifications.color', e.target.value)}
                        className="text-primary"
                        required
                      />
                      <span className="text-sm">{color.title}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Längd (cm) *</label>
                  <Input
                    type="number"
                    placeholder="t.ex. 150"
                    value={formData.productDetails.specifications.dimensions.length}
                    onChange={(e) => handleInputChange('productDetails.specifications.dimensions.length', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Bredd (cm) *</label>
                  <Input
                    type="number"
                    placeholder="t.ex. 5"
                    value={formData.productDetails.specifications.dimensions.width}
                    onChange={(e) => handleInputChange('productDetails.specifications.dimensions.width', e.target.value)}
                    required
                  />
                </div>
              </div>


              <div>
                <label className="block text-sm font-medium mb-2">Ungefärlig budget (SEK)</label>
                <Input
                  type="number"
                  placeholder="Valfritt - hjälper oss att ge bättre förslag"
                  value={formData.estimatedBudget}
                  onChange={(e) => handleInputChange('estimatedBudget', e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Detta hjälper oss att anpassa vårt förslag efter dina behov
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Ytterligare önskemål</label>
                <Textarea
                  placeholder="Beskriv eventuella speciella önskemål, användningsområde eller frågor..."
                  value={formData.productDetails.specifications.additionalRequirements}
                  onChange={(e) => handleInputChange('productDetails.specifications.additionalRequirements', e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          </Card>

          {/* Kunduppgifter */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Dina uppgifter</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Namn *</label>
                <Input
                  type="text"
                  value={formData.customerInfo.name}
                  onChange={(e) => handleInputChange('customerInfo.name', e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">E-post *</label>
                <Input
                  type="email"
                  value={formData.customerInfo.email}
                  onChange={(e) => handleInputChange('customerInfo.email', e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Telefon</label>
                <Input
                  type="tel"
                  value={formData.customerInfo.phone}
                  onChange={(e) => handleInputChange('customerInfo.phone', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Föredragen kontaktmetod</label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-md border hover:bg-accent transition-colors">
                    <input
                      type="radio"
                      name="preferredContact"
                      value="email"
                      checked={formData.preferredContact === 'email'}
                      onChange={(e) => handleInputChange('preferredContact', e.target.value)}
                      className="text-primary"
                    />
                    <Mail className="h-4 w-4" />
                    <span>E-post</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer p-3 rounded-md border hover:bg-accent transition-colors">
                    <input
                      type="radio"
                      name="preferredContact"
                      value="phone"
                      checked={formData.preferredContact === 'phone'}
                      onChange={(e) => handleInputChange('preferredContact', e.target.value)}
                      className="text-primary"
                    />
                    <Phone className="h-4 w-4" />
                    <span>Telefon</span>
                  </label>
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Adress</label>
                <Input
                  type="text"
                  value={formData.customerInfo.address}
                  onChange={(e) => handleInputChange('customerInfo.address', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Stad</label>
                <Input
                  type="text"
                  value={formData.customerInfo.city}
                  onChange={(e) => handleInputChange('customerInfo.city', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Postnummer</label>
                <Input
                  type="text"
                  value={formData.customerInfo.postalCode}
                  onChange={(e) => handleInputChange('customerInfo.postalCode', e.target.value)}
                />
              </div>
            </div>
          </Card>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Skickar...' : 'Be om offert'}
          </Button>
        </form>
      </div>
      </div>
    </>
  );
};

export default OffertRequest;