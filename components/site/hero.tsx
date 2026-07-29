'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, type Variants } from 'motion/react'
import { ShieldCheck, ArrowRight, Search, BadgeCheck, Clock } from 'lucide-react'

const LUXURY = [0.16, 1, 0.3, 1] as const

const badges = [
  { icon: ShieldCheck, label: 'Полная проверка' },
  { icon: BadgeCheck, label: '5000+ продано' },
  { icon: Clock, label: 'Оформление за 1 день' },
]

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.25 } },
}
const item: Variants = {
  hidden: { opacity: 0, y: 32, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1, ease: LUXURY },
  },
}

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '24%'])
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.18])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '45%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])

  return (
    <section
      id="hero"
      ref={ref}
      className="relative h-[100svh] min-h-[680px] overflow-hidden"
    >
      {/* car photography with slow parallax + zoom */}
      <motion.div
        style={{ y: imageY, scale: imageScale }}
        initial={{ scale: 1.12, opacity: 0 }}
        animate={{ scale: 1.04, opacity: 1 }}
        transition={{ duration: 1.8, ease: LUXURY }}
        className="absolute inset-0"
      >
        <Image
          src="/cars/hero-suv.png"
          alt="Премиальный внедорожник в тёмной студии"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* cinematic grading + vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/75 to-background/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-transparent to-background/50" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,_transparent_15%,_rgba(7,7,7,0.9)_100%)]" />

      {/* soft moving light sweep */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-light-sweep absolute -left-1/4 top-0 h-[140%] w-1/2 bg-[linear-gradient(100deg,transparent,rgba(255,255,255,0.05),transparent)] blur-2xl" />
      </div>
      {/* subtle drifting smoke near the ground */}
      <div className="animate-smoke pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(ellipse_at_bottom,_rgba(255,255,255,0.06),transparent_70%)]" />
      {/* faint accent glow, used sparingly */}
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[28rem] w-[28rem] rounded-full bg-accent/10 blur-[160px]" />
      <div className="absolute inset-0 grain opacity-40" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6 md:px-10"
      >
        <motion.span
          variants={item}
          className="mb-8 inline-flex w-fit items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-xs font-medium uppercase tracking-[0.28em] text-foreground/80 backdrop-blur-md"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          Премиальный автосалон
        </motion.span>

        <motion.h1
          variants={item}
          className="font-display text-[19vw] font-bold uppercase leading-[0.82] tracking-tight text-balance sm:text-[16vw] md:text-[12rem]"
        >
          Автосалон
          <br />
          <span className="text-accent text-glow">База</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-8 max-w-lg text-lg leading-relaxed text-muted-foreground md:text-xl"
        >
          Проверенные автомобили с пробегом — с полной юридической прозрачностью.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-11 flex flex-col gap-4 sm:flex-row"
        >
          <motion.a
            href="#inventory"
            whileHover={{ scale: 1.035 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 22 }}
            className="btn-glow group inline-flex items-center justify-center gap-2.5 rounded-2xl bg-accent px-9 py-5 text-base font-semibold text-accent-foreground transition-shadow hover:btn-glow-hover"
          >
            Посмотреть автомобили
            <ArrowRight className="h-5 w-5 transition-transform duration-500 group-hover:translate-x-1.5" />
          </motion.a>
          <motion.a
            href="#cta"
            whileHover={{ scale: 1.035 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 22 }}
            className="group inline-flex items-center justify-center gap-2.5 rounded-2xl border border-white/12 bg-white/[0.04] px-9 py-5 text-base font-semibold text-foreground backdrop-blur-md transition-colors hover:border-accent/60 hover:text-accent"
          >
            <Search className="h-5 w-5" />
            Подобрать автомобиль
          </motion.a>
        </motion.div>

        {/* floating trust badges */}
        <motion.div
          variants={item}
          className="mt-12 flex flex-wrap gap-3"
        >
          {badges.map((b, i) => (
            <motion.div
              key={b.label}
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 4 + i,
                repeat: Number.POSITIVE_INFINITY,
                ease: 'easeInOut',
                delay: i * 0.4,
              }}
              className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-medium text-foreground/90 backdrop-blur-md"
            >
              <b.icon className="h-4.5 w-4.5 text-accent" />
              {b.label}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 md:block"
      >
        <div className="flex h-11 w-6 items-start justify-center rounded-full border border-white/15 p-1.5">
          <motion.span
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.8, ease: 'easeInOut' }}
            className="h-2.5 w-1 rounded-full bg-accent"
          />
        </div>
      </motion.div>
    </section>
  )
}
