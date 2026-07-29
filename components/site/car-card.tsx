'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { Gauge, Calendar, Cog, Fuel, ArrowUpRight } from 'lucide-react'
import { type Car, formatPrice, formatMileage } from '@/lib/site'

const specIcon = 'h-4 w-4 text-accent'

export function CarCard({ car, index = 0 }: { car: Car; index?: number }) {
  const specs = [
    { icon: <Calendar className={specIcon} />, label: `${car.year} г.` },
    { icon: <Gauge className={specIcon} />, label: formatMileage(car.mileage) },
    { icon: <Cog className={specIcon} />, label: car.transmission },
    { icon: <Fuel className={specIcon} />, label: car.fuel },
  ]

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8 }}
      className="group relative overflow-hidden rounded-3xl border border-border bg-card transition-colors hover:border-accent/40"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
        <Image
          src={car.image || '/placeholder.svg'}
          alt={`${car.name} — вид спереди`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 rounded-full border border-border bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-md">
          {car.brand}
        </span>
        <span className="absolute right-4 top-4 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-medium text-accent backdrop-blur-md">
          {car.drive} привод
        </span>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-xl font-semibold tracking-wide">{car.name}</h3>
        </div>
        <p className="mt-2 font-display text-2xl font-bold text-accent">{formatPrice(car.price)}</p>

        <div className="mt-5 grid grid-cols-2 gap-3">
          {specs.map((s) => (
            <div key={s.label} className="flex items-center gap-2 text-sm text-muted-foreground">
              {s.icon}
              {s.label}
            </div>
          ))}
        </div>

        <a
          href="#cta"
          className="mt-6 flex items-center justify-between rounded-xl border border-border bg-secondary/50 px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          Подробнее
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </motion.article>
  )
}
