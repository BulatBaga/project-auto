'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { Gauge, Calendar, Cog, Fuel, ArrowUpRight } from 'lucide-react'
import { type Car, formatPrice, formatMileage } from '@/lib/site'

const LUXURY = [0.16, 1, 0.3, 1] as const
const specIcon = 'h-4 w-4 text-muted-foreground'

export function CarCard({ car, index = 0 }: { car: Car; index?: number }) {
  const specs = [
    { icon: <Calendar className={specIcon} />, label: `${car.year} г.` },
    { icon: <Gauge className={specIcon} />, label: formatMileage(car.mileage) },
    { icon: <Cog className={specIcon} />, label: car.transmission },
    { icon: <Fuel className={specIcon} />, label: car.fuel },
  ]

  return (
    <motion.article
      initial={{ opacity: 0, y: 48, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, delay: (index % 3) * 0.12, ease: LUXURY }}
      whileHover={{ y: -10 }}
      className="group relative overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-card ring-hairline transition-all duration-500 hover:border-accent/30 hover:shadow-luxury"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
        <Image
          src={car.image || '/placeholder.svg'}
          alt={`${car.name} — вид спереди`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-background/60 px-3.5 py-1.5 text-xs font-medium tracking-wide text-foreground/80 backdrop-blur-md">
          {car.brand}
        </span>
        <span className="absolute right-4 top-4 rounded-full border border-white/10 bg-background/60 px-3.5 py-1.5 text-xs font-medium tracking-wide text-foreground/80 backdrop-blur-md">
          {car.drive} привод
        </span>
      </div>

      <div className="p-7">
        <h3 className="font-display text-2xl font-semibold tracking-wide">{car.name}</h3>
        <p className="mt-2 font-display text-3xl font-bold text-accent">
          {formatPrice(car.price)}
        </p>

        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3.5 border-t border-white/[0.06] pt-6">
          {specs.map((s) => (
            <div key={s.label} className="flex items-center gap-2.5 text-sm text-muted-foreground">
              {s.icon}
              {s.label}
            </div>
          ))}
        </div>

        <a
          href="#cta"
          className="group/btn mt-7 flex items-center justify-between rounded-2xl border border-white/[0.08] bg-secondary/60 px-6 py-4 text-sm font-semibold text-foreground transition-all duration-300 hover:border-accent/50 hover:bg-accent/[0.06] hover:text-accent"
        >
          Подробнее
          <ArrowUpRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
        </a>
      </div>
    </motion.article>
  )
}
