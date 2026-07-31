'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'
import { Gauge, Calendar, Cog, Fuel, ArrowUpRight } from 'lucide-react'
import type { Vehicle } from '@/lib/vehicles/types'
import { formatPrice, formatMileage } from '@/lib/vehicles/format'
import { LUXURY } from '@/lib/motion'

const specIcon = 'h-4 w-4 text-muted-foreground transition-colors duration-500 group-hover:text-foreground/80'

export function VehicleCard({
  vehicle,
  index = 0,
}: {
  vehicle: Vehicle
  index?: number
}) {
  const specs = [
    { icon: <Calendar className={specIcon} />, label: `${vehicle.year} г.` },
    { icon: <Gauge className={specIcon} />, label: formatMileage(vehicle.mileage) },
    { icon: <Cog className={specIcon} />, label: vehicle.transmission },
    { icon: <Fuel className={specIcon} />, label: vehicle.fuel },
  ]

  return (
    <motion.article
      initial={{ opacity: 0, y: 48, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, delay: (index % 3) * 0.12, ease: LUXURY }}
      whileHover={{ y: -12 }}
      className="group relative overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-card shadow-card ring-hairline transition-[border-color,box-shadow] duration-500 hover:border-accent/30 hover:shadow-card-hover"
    >
      <Link href={`/cars/${vehicle.id}`} className="block">
        <div className="sheen relative aspect-[16/10] overflow-hidden bg-secondary">
          <Image
            src={vehicle.image || '/placeholder.svg'}
            alt={`${vehicle.name} — вид спереди`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.08]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent" />
          <div className="absolute left-5 top-5">
            <span className="rounded-full border border-white/10 bg-background/50 px-4 py-1.5 text-xs font-medium tracking-wide text-foreground/80 backdrop-blur-xl">
              {vehicle.brand}
            </span>
          </div>
          <div className="absolute right-5 top-5">
            <span className="rounded-full border border-white/10 bg-background/50 px-4 py-1.5 text-xs font-medium tracking-wide text-foreground/80 backdrop-blur-xl">
              {vehicle.bodyType}
            </span>
          </div>
        </div>

        <div className="p-7">
          <h3 className="font-display text-2xl font-semibold leading-tight tracking-wide">
            {vehicle.name}
          </h3>
          <div className="mt-3 flex items-baseline gap-3">
            <p className="font-display text-3xl font-bold text-accent">
              {formatPrice(vehicle.price)}
            </p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3.5 border-t border-white/[0.06] pt-6">
            {specs.map((s) => (
              <div
                key={s.label}
                className="flex items-center gap-2.5 text-sm text-muted-foreground"
              >
                {s.icon}
                {s.label}
              </div>
            ))}
          </div>

          <span className="group/btn mt-7 flex items-center justify-between rounded-2xl border border-white/[0.08] bg-secondary/60 px-6 py-4 text-sm font-semibold text-foreground transition-all duration-300 group-hover:border-accent/50 group-hover:bg-accent/[0.06] group-hover:text-accent">
            Подробнее
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
          </span>
        </div>
      </Link>
    </motion.article>
  )
}
