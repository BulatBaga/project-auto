'use client'

import { motion } from 'motion/react'
import { Phone, MessageCircle, Send, MapPin, Clock } from 'lucide-react'
import { contacts } from '@/lib/site'
import { SectionHeading } from './reveal'
import { LUXURY } from '@/lib/motion'
import dynamic from 'next/dynamic'

const OfficeMap = dynamic(() => import('./map'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[400px] items-center justify-center bg-card">
      <span className="text-sm text-muted-foreground">
        Загрузка карты...
      </span>
    </div>
  ),
})

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
  {
    icon: MapPin,
    label: 'Адрес',
    value: 'г. Уфа, ул. Комсомольская, 15',
  },
  {
    icon: Clock,
    label: 'Часы работы',
    value: contacts.hours,
  },
]

export function Contact() {
  return (
    <section
      id="contacts"
      className="relative mx-auto max-w-6xl px-6 py-28 md:px-10 md:py-40"
    >
      <SectionHeading
        className="mb-16"
        eyebrow="Контакты"
        title="Приезжайте в гости"
      />

      <div className="grid gap-6 lg:grid-cols-2">

        {/* Левая часть — контакты */}
        <div className="flex flex-col gap-4">
          {items.map((item, i) => {
            const content = (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.06,
                  duration: 0.7,
                  ease: LUXURY,
                }}
                className="group flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-card p-5 ring-hairline transition-all duration-400 hover:border-accent/40 hover:bg-accent/[0.03]"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent transition-all duration-500 group-hover:accent-ring">
                  <item.icon className="h-5 w-5" />
                </div>

                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">
                    {item.label}
                  </div>

                  <div className="font-medium text-foreground">
                    {item.value}
                  </div>
                </div>
              </motion.div>
            )

            return item.href ? (
              <a
                key={item.label}
                href={item.href}
                target={
                  item.href.startsWith('http') ? '_blank' : undefined
                }
                rel="noopener noreferrer"
              >
                {content}
              </a>
            ) : (
              <div key={item.label}>{content}</div>
            )
          })}
        </div>

        {/* Правая часть — карта */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: LUXURY }}
          className="relative min-h-[400px] overflow-hidden rounded-3xl border border-white/[0.07] ring-hairline"
        >
          <OfficeMap />

          {/* Тонкая рамка поверх карты */}
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-accent/20" />
        </motion.div>

      </div>
    </section>
  )
}