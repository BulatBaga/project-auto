import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowLeft, ShieldCheck, ScrollText, BadgeCheck, Gauge, Calendar, Cog, Fuel, Car, Zap, Palette, FingerprintPattern as Fingerprint } from 'lucide-react'
import mockData from '@/lib/vehicles/mock-data.json'
import {
  fetchVehicleById,
  fetchRelatedVehicles,
} from '@/lib/vehicles/repository'
import {
  formatEngine,
  formatMileage,
  formatPower,
  formatPrice,
} from '@/lib/vehicles/format'
import { VehicleGallery } from '@/components/vehicles/vehicle-gallery'
import { VehicleInquiry } from '@/components/vehicles/vehicle-inquiry'
import { VehicleCard } from '@/components/vehicles/vehicle-card'
import { Navbar } from '@/components/site/navbar'
import { Footer } from '@/components/site/footer'
import { MobileBar } from '@/components/site/mobile-bar'
import { Reveal } from '@/components/site/reveal'

const featureIconMap: Record<string, typeof Gauge> = {
  gauge: Gauge,
  armchair: Car,
  music: Zap,
  snowflake: ShieldCheck,
  camera: ShieldCheck,
  navigation: BadgeCheck,
  key: BadgeCheck,
  shield: ShieldCheck,
}

export function generateStaticParams() {
  const data = mockData as { id: string }[]
  return data.map((v) => ({ id: v.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const vehicle = await fetchVehicleById(id)
  if (!vehicle) return { title: 'Автомобиль не найден' }
  return {
    title: `${vehicle.name} — ${formatPrice(vehicle.price)} | Автосалон БАЗА`,
    description: vehicle.description.slice(0, 160),
    openGraph: {
      title: `${vehicle.name} — Автосалон БАЗА`,
      description: vehicle.description.slice(0, 160),
      images: [vehicle.image],
    },
  }
}

export default async function VehicleDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const vehicle = await fetchVehicleById(id)
  if (!vehicle) notFound()

  const related = await fetchRelatedVehicles(id, 3)

  const specs = [
    { icon: Calendar, label: 'Год выпуска', value: `${vehicle.year} г.` },
    { icon: Gauge, label: 'Пробег', value: formatMileage(vehicle.mileage) },
    { icon: Cog, label: 'Коробка передач', value: vehicle.transmission },
    { icon: Fuel, label: 'Топливо', value: vehicle.fuel },
    { icon: Car, label: 'Тип кузова', value: vehicle.bodyType },
    { icon: BadgeCheck, label: 'Привод', value: vehicle.drive },
    { icon: Zap, label: 'Двигатель', value: `${formatEngine(vehicle.engineVolume)} / ${formatPower(vehicle.power)}` },
    { icon: Palette, label: 'Цвет', value: vehicle.color },
    { icon: Fingerprint, label: 'VIN', value: vehicle.vin },
  ]

  const guarantees = [
    {
      icon: ShieldCheck,
      title: 'Техническая проверка',
      text: 'Диагностика по 120 параметрам у сертифицированных механиков.',
    },
    {
      icon: ScrollText,
      title: 'Юридическая чистота',
      text: 'Проверка истории, залогов, ограничений и штрафов.',
    },
    {
      icon: BadgeCheck,
      title: 'Гарантия качества',
      text: 'Полная гарантия на двигатель и коробку передач.',
    },
  ]

  return (
    <main className="relative overflow-x-hidden">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 pb-28 pt-32 md:px-10 md:pt-40">
        <Link
          href="/#inventory"
          className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          Вернуться к каталогу
        </Link>

        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-white/10 bg-secondary/60 px-4 py-1.5 text-xs font-medium tracking-wide text-foreground/80 backdrop-blur-md">
                {vehicle.brand}
              </span>
              <span className="rounded-full border border-white/10 bg-secondary/60 px-4 py-1.5 text-xs font-medium tracking-wide text-foreground/80 backdrop-blur-md">
                {vehicle.bodyType}
              </span>
              {vehicle.isFeatured && (
                <span className="rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-medium tracking-wide text-accent">
                  Проверен
                </span>
              )}
            </div>

            <h1 className="font-display text-4xl font-bold uppercase leading-[0.92] tracking-tight text-balance md:text-5xl">
              {vehicle.name}
            </h1>
            <p className="mt-4 font-display text-3xl font-bold text-accent">
              {formatPrice(vehicle.price)}
            </p>

            <div className="mt-8">
              <VehicleGallery images={vehicle.gallery} name={vehicle.name} />
            </div>

            <Reveal className="mt-14">
              <h2 className="font-display text-2xl font-semibold uppercase tracking-wide">
                Описание
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                {vehicle.description}
              </p>
            </Reveal>

            <Reveal className="mt-14">
              <h2 className="font-display text-2xl font-semibold uppercase tracking-wide">
                Характеристики
              </h2>
              <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-0 border-t border-white/[0.06] sm:grid-cols-2">
                {specs.map((s) => (
                  <div
                    key={s.label}
                    className="flex items-center justify-between border-b border-white/[0.06] py-4"
                  >
                    <span className="flex items-center gap-3 text-sm text-muted-foreground">
                      <s.icon className="h-4 w-4 text-accent" />
                      {s.label}
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      {s.value}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal className="mt-14">
              <h2 className="font-display text-2xl font-semibold uppercase tracking-wide">
                Комплектация
              </h2>
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {vehicle.features.map((f) => {
                  const Icon = featureIconMap[f.icon] ?? BadgeCheck
                  return (
                    <div
                      key={f.label}
                      className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-card p-4 ring-hairline"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-sm font-medium text-foreground">
                        {f.label}
                      </span>
                    </div>
                  )
                })}
              </div>
            </Reveal>

            <Reveal className="mt-14">
              <h2 className="font-display text-2xl font-semibold uppercase tracking-wide">
                Гарантии
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {guarantees.map((g) => (
                  <div
                    key={g.title}
                    className="rounded-2xl border border-white/[0.07] bg-card p-6 ring-hairline"
                  >
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
                      <g.icon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-2 font-semibold text-foreground">{g.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {g.text}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-1">
            <VehicleInquiry vehicle={vehicle} />
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-28">
            <div className="mb-10 flex items-end justify-between">
              <h2 className="font-display text-3xl font-bold uppercase tracking-wide">
                Похожие автомобили
              </h2>
              <Link
                href="/#inventory"
                className="hidden items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-accent sm:flex"
              >
                Весь каталог
                <ArrowLeft className="h-4 w-4 rotate-180" />
              </Link>
            </div>
            <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {related.map((v, i) => (
                <VehicleCard key={v.id} vehicle={v} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
      <div className="h-20 lg:hidden" />
      <MobileBar />
    </main>
  )
}
