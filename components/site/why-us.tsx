'use client'

import { motion } from 'motion/react'
import {
  ShieldCheck,
  ScrollText,
  Repeat,
  CreditCard,
  Banknote,
  FileCheck,
} from 'lucide-react'
import { Reveal, SectionHeading } from './reveal'
import { LUXURY } from '@/lib/motion'

const benefits = [
  {
    icon: ShieldCheck,
    title: 'Проверенные автомобили',
    text: 'Полная техническая диагностика по 120 параметрам перед продажей.',
  },
  {
    icon: ScrollText,
    title: 'Юридическая проверка',
    text: 'Проверяем историю, залоги, ограничения и штрафы. Чистота гарантирована.',
  },
  {
    icon: Repeat,
    title: 'Trade-In',
    text: 'Честная оценка вашего автомобиля и мгновенный зачёт в стоимость нового.',
  },
  {
    icon: CreditCard,
    title: 'Автокредит',
    text: 'Одобрение за 15 минут. Работаем с ведущими банками страны.',
  },
  {
    icon: Banknote,
    title: 'Выкуп автомобиля',
    text: 'Выкупаем автомобили по рыночной цене. Деньги в день обращения.',
  },
  {
    icon: FileCheck,
    title: 'Помощь с оформлением',
    text: 'Берём на себя всю бумажную работу — от договора до постановки на учёт.',
  },
]

export function WhyUs() {
  return (
    <section className="relative border-y border-white/[0.05] bg-secondary/30 py-28 md:py-40">
      {/* ambient accent glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-accent/[0.06] blur-[160px]" />
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          className="mb-16"
          eyebrow="Почему выбирают нас"
          title="Уверенность в каждой покупке"
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => (
            <Reveal key={b.title} delay={(i % 3) * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                className="group relative h-full overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-card p-9 ring-hairline transition-all duration-500 hover:border-accent/25 hover:shadow-luxury"
              >
                {/* hover gradient sweep */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/[0.06] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/[0.08] bg-secondary/80 text-accent transition-all duration-500 group-hover:border-accent/40 group-hover:accent-ring">
                  <b.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-3.5 font-display text-2xl font-semibold tracking-wide">
                  {b.title}
                </h3>
                <p className="leading-relaxed text-muted-foreground">{b.text}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
