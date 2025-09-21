import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'j0dqnwqh', // Ditt project ID från tidigare meddelande
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Typer för TypeScript
export interface SanityProduct {
  _id: string
  name: string
  slug: { current: string }
  image: any
  gallery?: any[]
  category?: {
    name: string
    slug: { current: string }
  }
  description: string
  detailDescription?: string
  features?: string[]
  dimensions?: string
  care?: string
  price?: number
  inStock?: boolean
  featured?: boolean
}

export interface SanityCategory {
  _id: string
  name: string
  slug: { current: string }
  description?: string
}
export interface SanityCourse {
  _id: string
  title: string
  slug: { current: string }
  level: string
  duration: string
  participants: string
  price: number
  nextDate: string
  description: string
  includes: string[]
  image?: any
  featured?: boolean
  active?: boolean
}