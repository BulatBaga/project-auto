'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { Phone, MessageCircle, Send, CircleCheck as CheckCircle2, Calendar } from 'lucide-react'
import { contacts } from '@/lib/site'
import { formatPrice } from '@/lib/vehicles/format'
import { LUXURY, springTap } from '@/lib/motion'
import type { Vehicle } from '@/lib/vehicles/types'

const field =
  'w-full rounded-xl border border-input bg-secondary/60 px-4 py-3.5 text-foreground outline-none backdrop-blur-md transition-colors placeholder:text-muted-foreground/60 focus:border-accent focus:ring-2 focus:ring-accent/20'

const pill =
  'inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-secondary/50 px-5 py-3 text-sm font-semibold transition-all duration-300 hover:border-accent/60 hover:text-accent hover:bg-accent/[0.05]'

export function VehicleInquiry({ vehicle }: { vehicle: Vehicle }) {
  const [submitted, setSubmitted] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 32, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: LUXURY }}
      className="glass-strong ring-hairline sticky top-28 rounded-[1.75rem] p-7 shadow-luxury"
    >
      <p className="text-sm text-muted-foreground">Стоимость автомобиля</p>
      <p className="mt-1 font-display text-4xl font-bold text-accent">
        {formatPrice(vehicle.price)}
      </p>

      <div className="mt-5 flex flex-wrap gap-2.5">
        <span className="rounded-lg border border-white/[0.07] bg-secondary/50 px-3 py-1.5 text-xs text-muted-foreground">
          {vehicle.year} г.
        </span>
        <span className="rounded-lg border border-white/[0.07] bg-secondary/50 px-3 py-1.5 text-xs text-muted-foreground">
          {vehicle.mileage.toLocaleString('ru-RU')} км
        </span>
        <span className="rounded-lg border border-white/[0.07] bg-secondary/50 px-3 py-1.5 text-xs text-muted-foreground">
          {vehicle.bodyType}
        </span>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <a href={contacts.phoneHref} className={pill}>
          <Phone className="h-4 w-4 text-accent" /> Позвонить
        </a>
        <a
          href={contacts.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className={pill}
        >
          <MessageCircle className="h-4 w-4 text-accent" /> WhatsApp
        </a>
        <a
          href={contacts.telegram}
          target="_blank"
          rel="noopener noreferrer"
          className={pill}
        >
          <Send className="h-4 w-4 text-accent" /> Telegram
        </a>
      </div>

      <div className="my-7 h-px bg-white/[0.06]" />

      {submitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: LUXURY }}
          className="flex flex-col items-center rounded-2xl border border-accent/30 bg-accent/5 p-6 text-center accent-ring"
        >
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
            className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10"
          >
            <CheckCircle2 className="h-8 w-8 text-accent" />
          </motion.div>
          <h3 className="font-display text-lg font-semibold">Заявка отправлена</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Менеджер свяжется с вами в ближайшее время.
          </p>
        </motion.div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            setSubmitted(true)
          }}
          className="flex flex-col gap-3"
        >
          <div className="mb-1 flex items-center gap-2 text-sm font-semibold text-foreground">
            <Calendar className="h-4 w-4 text-accent" />
            Записаться на просмотр
          </div>
          <input required placeholder="Имя" className={field} aria-label="Имя" />
          <input
            required
            type="tel"
            placeholder="Телефон"
            className={field}
            aria-label="Телефон"
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={springTap}
            className="btn-glow mt-1 rounded-xl bg-accent px-6 py-4 font-semibold text-accent-foreground"
          >
            Оставить заявку
          </motion.button>
          <p className="text-center text-xs text-muted-foreground">
            Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных.
          </p>
        </form>
      )}
    </motion.div>
  )
}
