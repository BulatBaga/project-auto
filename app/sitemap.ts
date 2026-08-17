import type { MetadataRoute } from 'next'
import { getAvitoCars } from '@/lib/avito-cars'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

  if (!siteUrl) {
    return []
  }

  const baseUrl = siteUrl.replace(/\/$/, '')

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/inventory`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/credit`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/selection`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/trade-in`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/buyout`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contacts`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]

  try {
    const data = await getAvitoCars()

    const cars: MetadataRoute.Sitemap = (data.resources ?? [])
      .filter((car: any) => car?.id)
      .map((car: any) => ({
        url: `${baseUrl}/cars/${String(car.id)}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
      }))

    return [...staticPages, ...cars]
  } catch (error) {
    console.error('Ошибка генерации sitemap:', error)

    return staticPages
  }
}