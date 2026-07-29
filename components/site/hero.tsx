'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'motion/react'
import { Star, ArrowRight, Search } from 'lucide-react'

const trust = [
  { value: '5000+', label: 'автомобилей продано' },
  { value: '98%', label: 'довольных клиентов' },
  { value: '10+', label: 'лет опыта' },
]

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '22%'])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.12])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section id="hero" ref={ref} className="relative h-[100svh] min-h-[640px] overflow-hidden">
      <motion.div style={{ y: imageY, scale: imageScale }} className="absolute inset-0">
        <Image
          src="/cars/hero-suv.png"
          alt="Премиальный внедорожник в тёмной студии"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* lighting + vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_rgba(9,9,9,0.85)_100%)]" />
      <div className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-accent/20 blur-[140px]" />
      <div className="absolute inset-0 grain opacity-40" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-center px-6"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-accent"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Премиальный автосалон
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[15vw] font-bold uppercase leading-[0.85] tracking-tight text-balance md:text-[8rem]"
        >
          Автосалон
          <br />
          <span className="text-accent text-glow">База</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl"
        >
          Проверенные автомобили с пробегом. Trade-In, автокредит и выкуп
          автомобилей — с полной юридической прозрачностью.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.7 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <a
            href="#inventory"
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-8 py-4 font-semibold text-accent-foreground btn-glow transition-transform hover:scale-[1.03]"
          >
            Посмотреть автомобили
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#cta"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-secondary/50 px-8 py-4 font-semibold text-foreground backdrop-blur-sm transition-colors hover:border-accent hover:text-accent"
          >
            <Search className="h-5 w-5" />
            Подобрать автомобиль
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-6"
        >
          <div className="flex items-center gap-1.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-accent text-accent" />
            ))}
          </div>
          {trust.map((t) => (
            <div key={t.label} className="flex flex-col">
              <span className="font-display text-2xl font-bold text-foreground">{t.value}</span>
              <span className="text-sm text-muted-foreground">{t.label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-border p-1.5">
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.6 }}
            className="h-2 w-1 rounded-full bg-accent"
          />
        </div>
      </motion.div>
    </section>
  )
}
