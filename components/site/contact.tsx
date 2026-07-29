'use client'

import { motion } from 'motion/react'
import { Phone, MessageCircle, Send, MapPin, Clock } from 'lucide-react'
import { contacts } from '@/lib/site'

const items = [
  {
    icon: Phone,
    label: 'Телефон',
    value: contacts.phone,
    href: contacts.phoneHref,
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: 'Написать в WhatsApp',
    href: contacts.whatsapp,
  },
  {
    icon: Send,
    label: 'Telegram',
    value: 'Написать в Telegram',
    href: contacts.telegram,
  },
  { icon: MapPin, label: 'Адрес', value: contacts.address },
  { icon: Clock, label: 'Часы работы', value: contacts.hours },
]

export function Contact() {
  return (
    <section id="contacts" className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
      <div className="mb-14 flex flex-col gap-4">
        <span className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
          Контакты
        </span>
        <h2 className="max-w-2xl font-display text-4xl font-bold uppercase leading-none tracking-tight text-balance md:text-6xl">
          Приезжайте в гости
        </h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          {items.map((item, i) => {
            const content = (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-accent/40"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">
                    {item.label}
                  </div>
                  <div className="font-medium text-foreground">{item.value}</div>
                </div>
              </motion.div>
            )
            return item.href ? (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
              >
                {content}
              </a>
            ) : (
              <div key={item.label}>{content}</div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative min-h-[360px] overflow-hidden rounded-3xl border border-border"
        >
          <iframe
            title="Карта — Автосалон База"
            src="https://www.openstreetmap.org/export/embed.html?bbox=37.6%2C55.72%2C37.78%2C55.78&layer=mapnik"
            className="h-full w-full grayscale-[0.4] invert-[0.9] hue-rotate-180"
            style={{ border: 0, minHeight: 360 }}
            loading="lazy"
          />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-accent/20" />
        </motion.div>
      </div>
    </section>
  )
}
