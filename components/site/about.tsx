'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'motion/react'
import { Reveal } from './reveal'
import { LUXURY } from '@/lib/motion'

const stats = [
  { value: '5000+', label: 'проданных автомобилей' },
  { value: '98%', label: 'положительных отзывов' },
  { value: '10+', label: 'лет опыта' },
  { value: '100%', label: 'юридическая чистота' },
]

export function About() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '14%'])

  return (
    <section id="about" className="relative overflow-hidden py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* editorial masthead */}
        <div className="mb-16 grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: LUXURY }}
              className="eyebrow inline-flex items-center gap-2.5"
            >
              <span className="h-px w-8 bg-accent/60" />О компании
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: LUXURY }}
              className="mt-6 font-display text-display-sm font-bold uppercase leading-[0.9] tracking-tight text-balance"
            >
              Автосалон,
              <br />
              которому <span className="text-accent">доверяют</span>
            </motion.h2>
          </div>
          <Reveal className="lg:col-span-4" delay={0.15}>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Более 10 лет мы помогаем клиентам покупать автомобили безопасно и
              выгодно. Мы не маркетплейс и не посредник — мы отвечаем за каждый
              автомобиль в нашем каталоге.
            </p>
          </Reveal>
        </div>

        {/* large photography */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.1, ease: LUXURY }}
          className="relative h-[420px] overflow-hidden rounded-[2rem] border border-white/[0.07] ring-hairline md:h-[620px]"
          ref={ref}
        >
          <motion.div style={{ y }} className="absolute inset-0 -top-[14%] h-[128%]">
            <Image
              src="/showroom.png"
              alt="Интерьер премиального автосалона База"
              fill
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />

          {/* overlapping editorial caption */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-4 md:bottom-10 md:left-10 md:right-auto md:max-w-md">
            <p className="font-display text-2xl font-medium leading-snug tracking-wide text-balance md:text-3xl">
              Пространство, созданное для уверенного выбора.
            </p>
          </div>
        </motion.div>

        {/* stats row */}
        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 md:mt-20 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1}>
              <div className="flex flex-col gap-2.5 border-t border-white/10 pt-7">
                <div className="font-display text-5xl font-bold tracking-tight text-foreground md:text-6xl">
                  {s.value}
                </div>
                <div className="text-sm leading-relaxed text-muted-foreground">
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
