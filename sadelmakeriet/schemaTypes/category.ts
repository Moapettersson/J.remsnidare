const category = {
  name: 'category',
  title: 'Kategori',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Kategorinamn',
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
      name: 'description',
      title: 'Beskrivning',
      type: 'text',
      rows: 3
    }
  ],
  preview: {
    select: {
      title: 'name'
    }
  }
}

export default category