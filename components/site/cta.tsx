'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { Phone, MessageCircle, Send, CircleCheck as CheckCircle2 } from 'lucide-react'
import { contacts } from '@/lib/site'
import { LUXURY } from '@/lib/motion'

const field =
  'w-full rounded-xl border border-input bg-secondary/60 px-4 py-3.5 text-foreground outline-none backdrop-blur-md transition-colors placeholder:text-muted-foreground/60 focus:border-accent focus:ring-2 focus:ring-accent/20'

const pill =
  'inline-flex items-center gap-2 rounded-xl border border-border bg-secondary/50 px-5 py-3 text-sm font-semibold transition-all duration-300 hover:border-accent/60 hover:text-accent hover:bg-accent/[0.05]'

export function Cta() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <section id="cta" className="relative mx-auto max-w-6xl px-6 py-28 md:px-10 md:py-40">
      <motion.div
        initial={{ opacity: 0, y: 48, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1.1, ease: LUXURY }}
        className="relative overflow-hidden rounded-[2.5rem] border border-white/[0.07] bg-card p-8 ring-hairline shadow-luxury md:p-16"
      >
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent/15 blur-[130px]" />
        <div className="pointer-events-none absolute -bottom-40 -left-24 h-80 w-80 rounded-full bg-accent/[0.07] blur-[140px]" />

        <div className="relative grid gap-12 lg:grid-cols-2">
          <div className="flex flex-col">
            <span className="eyebrow inline-flex items-center gap-2.5">
              <span className="h-px w-8 bg-accent/60" />
              Индивидуальный подбор
            </span>
            <h2 className="mt-6 font-display text-4xl font-bold uppercase leading-[0.92] tracking-tight text-balance md:text-5xl">
              Не нашли подходящий автомобиль?
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
              Мы бесплатно подберём автомобиль под ваши требования и бюджет.
              Оставьте заявку — свяжемся в течение 15 минут.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
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
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: LUXURY }}
              className="flex flex-col items-center justify-center rounded-3xl border border-accent/30 bg-accent/5 p-10 text-center accent-ring"
            >
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
                className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-accent/10"
              >
                <CheckCircle2 className="h-11 w-11 text-accent" />
              </motion.div>
              <h3 className="font-display text-2xl font-semibold">Заявка отправлена</h3>
              <p className="mt-2 text-muted-foreground">
                Наш менеджер свяжется с вами в ближайшее время.
              </p>
            </motion.div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                setSubmitted(true)
              }}
              className="grid gap-4"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <input required placeholder="Имя" className={field} aria-label="Имя" />
                <input
                  required
                  type="tel"
                  placeholder="Телефон"
                  className={field}
                  aria-label="Телефон"
                />
              </div>
              <input placeholder="Какой автомобиль ищете" className={field} aria-label="Какой автомобиль ищете" />
              <input placeholder="Бюджет" className={field} aria-label="Бюджет" />
              <textarea
                placeholder="Комментарий"
                rows={3}
                className={`${field} resize-none`}
                aria-label="Комментарий"
              />
              <button
                type="submit"
                className="btn-glow mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-8 py-4 font-semibold text-accent-foreground transition-all duration-300 hover:scale-[1.02] hover:btn-glow-hover"
              >
                Подобрать автомобиль
              </button>
              <p className="text-center text-xs text-muted-foreground">
                Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных.
              </p>
            </form>
          )}
        </div>
      </motion.div>
    </section>
  )
}
