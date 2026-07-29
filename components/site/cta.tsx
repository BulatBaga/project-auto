'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { Phone, MessageCircle, Send, CheckCircle2 } from 'lucide-react'
import { contacts } from '@/lib/site'

const field =
  'w-full rounded-xl border border-input bg-secondary/60 px-4 py-3.5 text-foreground outline-none backdrop-blur-md transition-colors placeholder:text-muted-foreground/60 focus:border-accent'

export function Cta() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <section id="cta" className="relative mx-auto max-w-6xl px-6 py-24 md:py-32">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-card p-8 md:p-14">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent/15 blur-[130px]" />
        <div className="relative grid gap-12 lg:grid-cols-2">
          <div>
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
              Индивидуальный подбор
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold uppercase leading-none tracking-tight text-balance md:text-5xl">
              Не нашли подходящий автомобиль?
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">
              Мы бесплатно подберём автомобиль под ваши требования и бюджет.
              Оставьте заявку — свяжемся в течение 15 минут.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={contacts.phoneHref}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-secondary/50 px-5 py-3 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
              >
                <Phone className="h-4 w-4 text-accent" /> Позвонить
              </a>
              <a
                href={contacts.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-secondary/50 px-5 py-3 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
              >
                <MessageCircle className="h-4 w-4 text-accent" /> WhatsApp
              </a>
              <a
                href={contacts.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-secondary/50 px-5 py-3 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
              >
                <Send className="h-4 w-4 text-accent" /> Telegram
              </a>
            </div>
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center rounded-3xl border border-accent/30 bg-accent/5 p-10 text-center"
            >
              <CheckCircle2 className="mb-4 h-14 w-14 text-accent" />
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
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-8 py-4 font-semibold text-accent-foreground btn-glow transition-transform hover:scale-[1.02]"
              >
                Подобрать автомобиль
              </button>
              <p className="text-center text-xs text-muted-foreground">
                Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
