import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Manrope, Oswald } from 'next/font/google'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-manrope',
  display: 'swap',
})

const oswald = Oswald({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-oswald',
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

export const metadata: Metadata = {
  title: {
    default: 'Автосалон БАЗА — автомобили с пробегом в Уфе',
    template: '%s | Автосалон БАЗА',
  },

  description:
    'Автосалон БАЗА в Уфе — проверенные автомобили с пробегом. Автокредит, Trade-In, выкуп автомобилей и полная юридическая проверка.',

  keywords: [
    'автосалон Уфа',
    'автомобили с пробегом Уфа',
    'купить автомобиль Уфа',
    'авто с пробегом Уфа',
    'Автосалон База Уфа',
    'автокредит Уфа',
    'Trade-In Уфа',
    'выкуп автомобилей Уфа',
    'проверенные автомобили Уфа',
  ],

  authors: [
    {
      name: 'Автосалон БАЗА',
    },
  ],

  creator: 'Автосалон БАЗА',
  publisher: 'Автосалон БАЗА',

  ...(siteUrl
    ? {
        metadataBase: new URL(siteUrl),

        alternates: {
          canonical: '/',
        },
      }
    : {}),

  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: 'Автосалон БАЗА',

    title: 'Автосалон БАЗА — автомобили с пробегом в Уфе',

    description:
      'Проверенные автомобили с пробегом в Уфе. Автокредит, Trade-In, выкуп и полная юридическая проверка.',

    url: siteUrl || undefined,

    images: [
      {
        url: '/logo-mark.jpeg',
        width: 1200,
        height: 630,
        alt: 'Автосалон БАЗА — автомобили с пробегом в Уфе',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',

    title: 'Автосалон БАЗА — автомобили с пробегом в Уфе',

    description:
      'Проверенные автомобили с пробегом. Автокредит, Trade-In, выкуп автомобилей.',

    images: ['/logo-mark.jpeg'],
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },

  icons: {
    icon: '/logo-mark.jpeg',
    apple: '/logo-mark.jpeg',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#090909',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ru"
      className={`dark ${manrope.variable} ${oswald.variable}`}
    >
      <body className="bg-background font-sans antialiased">
        {children}

        {/* SEO: информация о компании для поисковых систем */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'AutoDealer',

              name: 'Автосалон БАЗА',

              description:
                'Автосалон БАЗА — проверенные автомобили с пробегом в Уфе.',

              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Комсомольская, 15',
                addressLocality: 'Уфа',
                addressRegion: 'Республика Башкортостан',
                postalCode: '450001',
                addressCountry: 'RU',
              },

              telephone: '+7 917 735-04-01',

              url: siteUrl || undefined,

              areaServed: {
                '@type': 'City',
                name: 'Уфа',
              },
            }),
          }}
        />

        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}