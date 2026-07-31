'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { Star } from 'lucide-react'
import { reviews } from '@/lib/site'
import { SectionHeading } from './reveal'
import { LUXURY } from '@/lib/motion'

export function Reviews() {
  return (
    <section className="relative overflow-hidden py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-16 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Отзывы клиентов"
            title="Что говорят наши покупатели"
          />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: LUXURY }}
            className="flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-card px-6 py-4 ring-hairline"
          >
            <span className="font-display text-4xl font-bold text-foreground">4.9</span>
            <div className="flex flex-col gap-1">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">на основе 500+ отзывов</span>
            </div>
          </motion.div>
        </div>

        <div className="grid gap-7 md:grid-cols-3">
          {reviews.map((r, i) => (
            <motion.figure
              key={r.name}
              initial={{ opacity: 0, y: 48, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, delay: i * 0.12, ease: LUXURY }}
              whileHover={{ y: -8 }}
              className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-card p-9 ring-hairline transition-all duration-500 hover:border-accent/25 hover:shadow-luxury"
            >
              {/* oversized quotation mark */}
              <span
                aria-hidden
                className="pointer-events-none absolute -right-2 -top-6 font-display text-[10rem] leading-none text-accent/10 transition-colors duration-500 group-hover:text-accent/20"
              >
                &rdquo;
              </span>

              <div className="mb-5 flex gap-1">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-5 w-5 fill-accent text-accent" />
                ))}
              </div>
              <blockquote className="relative flex-1 text-lg leading-relaxed text-foreground/90">
                {r.text}
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4 border-t border-white/[0.06] pt-7">
                <div className="relative">
                  <span className="absolute inset-0 rounded-full ring-2 ring-accent/30 ring-offset-2 ring-offset-card" />
                  <Image
                    src={r.image || '/placeholder.svg'}
                    alt={r.name}
                    width={52}
                    height={52}
                    className="relative h-14 w-14 rounded-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold text-foreground">{r.name}</div>
                  <div className="text-sm text-accent/90">{r.role}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
