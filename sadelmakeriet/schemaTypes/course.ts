const course = {
  name: 'course',
  title: 'Kurs',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Kurstitel',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required()
    },
 
    {
      name: 'duration',
      title: 'Varaktighet',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'participants',
      title: 'Antal deltagare',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'price',
      title: 'Pris (SEK)',
      type: 'number',
      validation: (Rule: any) => Rule.required().positive()
    },
    {
      name: 'nextDate',
      title: 'Nästa datum',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'description',
      title: 'Beskrivning',
      type: 'text',
      rows: 4,
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'includes',
      title: 'Ingår i kursen',
      type: 'array',
      of: [{type: 'string'}],
      validation: (Rule: any) => Rule.required().min(1)
    },
    {
      name: 'image',
      title: 'Bild',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'featured',
      title: 'Utvald kurs',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'active',
      title: 'Aktiv',
      type: 'boolean',
      initialValue: true
    }
  ],
  
  preview: {
    select: {
      title: 'title',
      subtitle: 'level'
    }
  }
}

export default course