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

export const metadata: Metadata = {
  title: 'АВТОСАЛОН БАЗА — Проверенные автомобили с пробегом',
  description:
    'Автосалон БАЗА — проверенные автомобили с пробегом. Trade-In, автокредит, выкуп автомобилей. Полная юридическая проверка и помощь с оформлением.',
  keywords: [
    'автосалон',
    'база',
    'автомобили с пробегом',
    'trade-in',
    'автокредит',
    'выкуп автомобилей',
  ],
  generator: 'v0.app',
  openGraph: {
    title: 'АВТОСАЛОН БАЗА',
    description: 'Проверенные автомобили с пробегом. Trade-In, автокредит, выкуп.',
    type: 'website',
    locale: 'ru_RU',
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
    <html lang="ru" className={`dark ${manrope.variable} ${oswald.variable}`}>
      <body className="bg-background font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
