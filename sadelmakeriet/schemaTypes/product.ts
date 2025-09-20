const product = {
  name: 'product',
  title: 'Produkt',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Produktnamn',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'image',
      title: 'Produktbild',
      type: 'image',
      options: {
        hotspot: true,
      }
    },
    {
      name: 'category',
      title: 'Kategori',
      type: 'reference',
      to: {type: 'category'}
    },
    {
      name: 'description',
      title: 'Kort beskrivning',
      type: 'text',
      rows: 3
    },
    {
      name: 'price',
      title: 'Pris (SEK)',
      type: 'number'
    }
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image'
    }
  }
}

export default product