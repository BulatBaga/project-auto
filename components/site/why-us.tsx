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
import { Reveal } from './reveal'

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
    <section className="relative bg-secondary/40 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 flex flex-col gap-4">
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
            Почему выбирают нас
          </span>
          <h2 className="max-w-2xl font-display text-4xl font-bold uppercase leading-none tracking-tight text-balance md:text-6xl">
            Уверенность в каждой покупке
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => (
            <Reveal key={b.title} delay={(i % 3) * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                className="group h-full rounded-3xl border border-border bg-card p-8 transition-colors hover:border-accent/40"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 text-accent transition-all group-hover:accent-ring">
                  <b.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-3 font-display text-xl font-semibold tracking-wide">
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
