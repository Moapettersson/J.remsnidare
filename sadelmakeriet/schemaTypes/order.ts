// schemaTypes/order.ts
const orderSchema = {
  name: 'order',
  title: 'Beställning',
  type: 'document',
  fields: [
    { name: 'product', title: 'Produkt', type: 'string' },
    { name: 'productType', title: 'Produkttyp', type: 'string' },
    {
      name: 'customerInfo',
      title: 'Kunduppgifter',
      type: 'object',
      fields: [
        { name: 'name', title: 'Namn', type: 'string' },
        { name: 'email', title: 'E-post', type: 'string' },
        { name: 'phone', title: 'Telefon', type: 'string' },
        { name: 'address', title: 'Adress', type: 'string' },
        { name: 'city', title: 'Stad', type: 'string' },
        { name: 'postalCode', title: 'Postnummer', type: 'string' }
      ]
    },
    {
      name: 'orderDetails',
      title: 'Beställningsdetaljer',
      type: 'object',
      fields: [
        { name: 'message', title: 'Meddelande', type: 'text' },
        { name: 'deliveryPreference', title: 'Leverans', type: 'string' },
        { name: 'preferredContact', title: 'Kontaktmetod', type: 'string' }
      ]
    },
    { name: 'timestamp', title: 'Tidpunkt', type: 'datetime' }
  ]
};

export default orderSchema;
