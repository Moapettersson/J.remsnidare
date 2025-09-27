const offertRequest = {
  name: 'offertRequest',
  title: 'Offertförfrågan',
  type: 'document',
  fields: [
    {
      name: 'product',
      title: 'Produkt',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
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
      name: 'lindningDetails',
      title: 'Lindningsdetaljer',
      type: 'object',
      fields: [
        {
          name: 'color',
          title: 'Färg',
          type: 'string',
          options: {
            list: [
              { title: 'Naturell', value: 'naturell' },
              { title: 'Ljusbrun', value: 'ljusbrun' },
              { title: 'Mörkbrun', value: 'mörkbrun' },
              { title: 'Svart', value: 'svart' },
              { title: 'Annat', value: 'annat' },
            ]
          }
        },
        { name: 'length', title: 'Längd (cm)', type: 'string' },
        { name: 'width', title: 'Bredd (cm)', type: 'string' },
        { name: 'message', title: 'Meddelande', type: 'text' },
        { name: 'preferredContact', title: 'Föredragen kontakt', type: 'string' }
      ]
    },
    {
      name: 'timestamp',
      title: 'Tidpunkt',
      type: 'datetime',
      validation: (Rule: any) => Rule.required()
    }
  ],
  preview: {
    select: {
      title: 'product',
      subtitle: 'customerInfo.name',
      description: 'timestamp'
    }
  }
};

export default offertRequest;