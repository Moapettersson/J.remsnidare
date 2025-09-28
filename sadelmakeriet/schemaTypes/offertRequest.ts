// sadelmakeriet/schemaTypes/offertRequest.ts
const offertRequest = {
  name: 'offertRequest',
  title: 'Offertförfrågan',
  type: 'document',
  fields: [
    {
      name: 'requestNumber',
      title: 'Förfrågningsnummer',
      type: 'string',
      initialValue: () => `OFF-${Date.now()}`,
      readOnly: true
    },
    {
      name: 'productType',
      title: 'Produkttyp',
      type: 'string',
      options: {
        list: [
          {title: 'Lindning', value: 'lindning'},
          {title: 'Handväska', value: 'handväska'},
          {title: 'Jaktväska', value: 'jaktväska'},
          {title: 'Anpassad produkt', value: 'custom'},
          {title: 'Övrigt', value: 'other'}
        ]
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Ny förfrågan', value: 'new'},
          {title: 'Under behandling', value: 'processing'},
          {title: 'Offert skickad', value: 'quoted'},
          {title: 'Accepterad', value: 'accepted'},
          {title: 'Avböjd', value: 'declined'}
        ]
      },
      initialValue: 'new',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'customerInfo',
      title: 'Kunduppgifter',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Namn',
          type: 'string',
          validation: (Rule: any) => Rule.required()
        },
        {
          name: 'email',
          title: 'E-post',
          type: 'string',
          validation: (Rule: any) => Rule.required().email()
        },
        {
          name: 'phone',
          title: 'Telefon',
          type: 'string'
        },
        {
          name: 'address',
          title: 'Adress',
          type: 'string'
        },
        {
          name: 'city',
          title: 'Stad',
          type: 'string'
        },
        {
          name: 'postalCode',
          title: 'Postnummer',
          type: 'string'
        }
      ]
    },
    {
      name: 'productDetails',
      title: 'Produktdetaljer',
      type: 'object',
      fields: [
        {
          name: 'description',
          title: 'Beskrivning',
          type: 'text',
          rows: 4
        },
        {
          name: 'specifications',
          title: 'Specifikationer',
          type: 'object',
          fields: [
            {
              name: 'color',
              title: 'Färg',
              type: 'string'
            },
            {
              name: 'dimensions',
              title: 'Mått',
              type: 'object',
              fields: [
                {name: 'length', title: 'Längd (cm)', type: 'number'},
                {name: 'width', title: 'Bredd (cm)', type: 'number'},
                {name: 'height', title: 'Höjd (cm)', type: 'number'}
              ]
            },
            {
              name: 'material',
              title: 'Önskat material',
              type: 'string'
            },
            {
              name: 'additionalRequirements',
              title: 'Ytterligare krav',
              type: 'text',
              rows: 3
            }
          ]
        }
      ]
    },
    {
      name: 'preferredContact',
      title: 'Föredragen kontaktmetod',
      type: 'string',
      options: {
        list: [
          {title: 'E-post', value: 'email'},
          {title: 'Telefon', value: 'phone'},
          {title: 'Båda', value: 'both'}
        ]
      },
      initialValue: 'email'
    },
    {
      name: 'urgency',
      title: 'Brådskande',
      type: 'string',
      options: {
        list: [
          {title: 'Normal', value: 'normal'},
          {title: 'Brådskande', value: 'urgent'},
          {title: 'Mycket brådskande', value: 'very_urgent'}
        ]
      },
      initialValue: 'normal'
    },
    {
      name: 'estimatedBudget',
      title: 'Ungefärlig budget (SEK)',
      type: 'number',
      description: 'Valfritt - hjälper oss att ge bättre förslag'
    },
    {
      name: 'attachments',
      title: 'Bilagor',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true}
        },
        {
          type: 'file',
          options: {
            accept: '.pdf,.doc,.docx'
          }
        }
      ],
      description: 'Ladda upp bilder, ritningar eller andra dokument'
    },
    {
      name: 'createdAt',
      title: 'Skapad',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true
    },
    {
      name: 'updatedAt',
      title: 'Uppdaterad',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    },
    {
      name: 'notes',
      title: 'Interna anteckningar',
      type: 'text',
      rows: 3,
      description: 'Endast synligt för administratörer'
    },
    {
      name: 'quotedPrice',
      title: 'Offererat pris (SEK)',
      type: 'number'
    },
    {
      name: 'quotedDeliveryTime',
      title: 'Offererad leveranstid',
      type: 'string'
    }
  ],
  
  preview: {
    select: {
      title: 'customerInfo.name',
      subtitle: 'productType',
      status: 'status',
      createdAt: 'createdAt'
    },
    prepare: (value: any) => ({
      title: `${value.title || 'Okänd kund'}`,
      subtitle: `${value.productType || 'Okänd produkt'} - ${value.status || 'Okänd status'}`,
      description: value.createdAt ? new Date(value.createdAt).toLocaleDateString('sv-SE') : ''
    })
  },

  orderings: [
    {
      title: 'Senaste först',
      name: 'createdAtDesc',
      by: [{field: 'createdAt', direction: 'desc'}]
    },
    {
      title: 'Status',
      name: 'statusAsc',
      by: [{field: 'status', direction: 'asc'}]
    }
  ]
}

export default offertRequest