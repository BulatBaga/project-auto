'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { Star, Quote } from 'lucide-react'
import { reviews } from '@/lib/site'

export function Reviews() {
  return (
    <section className="relative bg-secondary/40 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 flex flex-col gap-4">
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
            Отзывы клиентов
          </span>
          <h2 className="max-w-2xl font-display text-4xl font-bold uppercase leading-none tracking-tight text-balance md:text-6xl">
            Что говорят наши покупатели
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((r, i) => (
            <motion.figure
              key={r.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="glass relative flex h-full flex-col rounded-3xl p-8"
            >
              <Quote className="mb-4 h-9 w-9 text-accent/40" />
              <div className="mb-4 flex gap-1">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <blockquote className="flex-1 leading-relaxed text-foreground/90">
                {r.text}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-4 border-t border-border pt-6">
                <Image
                  src={r.image || '/placeholder.svg'}
                  alt={r.name}
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-foreground">{r.name}</div>
                  <div className="text-sm text-muted-foreground">{r.role}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
