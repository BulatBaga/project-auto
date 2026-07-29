'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'motion/react'
import { Reveal } from './reveal'

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
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '12%'])

  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div ref={ref} className="relative order-2 h-[420px] overflow-hidden rounded-[2rem] border border-border lg:order-1 lg:h-[560px]">
            <motion.div style={{ y }} className="absolute inset-0 -top-[12%] h-[124%]">
              <Image
                src="/showroom.png"
                alt="Интерьер премиального автосалона База"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
          </div>

          <div className="order-1 lg:order-2">
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
              О компании
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold uppercase leading-none tracking-tight text-balance md:text-6xl">
              Автосалон, которому доверяют
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Более 10 лет мы помогаем клиентам покупать автомобили безопасно и
              выгодно. Каждый автомобиль проходит многоступенчатую проверку, а
              наши специалисты сопровождают сделку от первого звонка до вручения
              ключей.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Мы не маркетплейс и не посредник — мы отвечаем за каждый автомобиль
              в нашем каталоге.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-6">
              {stats.map((s, i) => (
                <Reveal key={s.label} delay={i * 0.08}>
                  <div className="border-l-2 border-accent/40 pl-4">
                    <div className="font-display text-4xl font-bold text-foreground md:text-5xl">
                      {s.value}
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
