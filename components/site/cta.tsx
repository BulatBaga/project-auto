'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import {
  Phone,
  MessageCircle,
  Send,
  CircleCheck as CheckCircle2,
} from 'lucide-react'
import { contacts } from '@/lib/site'
import { LUXURY } from '@/lib/motion'

const field =
  'w-full rounded-xl border border-input bg-secondary/60 px-4 py-3.5 text-foreground outline-none backdrop-blur-md transition-colors placeholder:text-muted-foreground/60 focus:border-accent focus:ring-2 focus:ring-accent/20'

const pill =
  'inline-flex items-center gap-2 rounded-xl border border-border bg-secondary/50 px-5 py-3 text-sm font-semibold transition-all duration-300 hover:border-accent/60 hover:text-accent hover:bg-accent/[0.05]'

function formatPhone(value: string) {
  let digits = value.replace(/\D/g, '')

  if (digits.startsWith('8')) {
    digits = '7' + digits.slice(1)
  }

  if (!digits.startsWith('7')) {
    digits = '7' + digits
  }

  digits = digits.slice(0, 11)

  let result = '+7'

  if (digits.length > 1) {
    result += ' (' + digits.slice(1, 4)
  }

  if (digits.length >= 4) {
    result += ')'
  }

  if (digits.length > 4) {
    result += ' ' + digits.slice(4, 7)
  }

  if (digits.length > 7) {
    result += '-' + digits.slice(7, 9)
  }

  if (digits.length > 9) {
    result += '-' + digits.slice(9, 11)
  }

  return result
}

export function Cta() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [phone, setPhone] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setError('')
    setLoading(true)

    const form = e.currentTarget
    const formData = new FormData(form)

    const firstName = String(formData.get('firstName') || '').trim()
    const phoneValue = String(formData.get('phone') || '').trim()
    const car = String(formData.get('car') || '').trim()
    const budget = String(formData.get('budget') || '').trim()
    const comment = String(formData.get('comment') || '').trim()

    const phoneDigits = phoneValue.replace(/\D/g, '')

    if (phoneDigits.length !== 11 || !phoneDigits.startsWith('7')) {
      setError('Введите корректный номер телефона РФ')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/selection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          phone: phoneValue,
          car,
          budget,
          comment,
        }),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Не удалось отправить заявку')
      }

      setSubmitted(true)
      form.reset()
      setPhone('')
    } catch (err) {
      console.error(err)
      setError('Не удалось отправить заявку. Попробуйте ещё раз.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id="cta"
      className="relative mx-auto max-w-6xl px-6 py-28 md:px-10 md:py-40"
    >
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

            <h2
            className="mt-6 font-display text-4xl font-bold uppercase leading-[0.92] tracking-tight text-balance md:text-5xl">
              Не нашли подходящий автомобиль?
            </h2>

            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
              Мы бесплатно подберём автомобиль под ваши требования и бюджет.
              Оставьте заявку — свяжемся в течение 15 минут.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a href={contacts.phoneHref} className={pill}>
                <Phone className="h-4 w-4 text-accent" />
                Позвонить
              </a>

              <a
                href={contacts.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className={pill}
              >
                <MessageCircle className="h-4 w-4 text-accent" />
                WhatsApp
              </a>

              <a
                href={contacts.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className={pill}
              >
                <Send className="h-4 w-4 text-accent" />
                Telegram
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
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 18,
                  delay: 0.1,
                }}
                className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-accent/10"
              >
                <CheckCircle2 className="h-11 w-11 text-accent" />
              </motion.div>

              <h3 className="font-display text-2xl font-semibold">
                Заявка отправлена
              </h3>

              <p className="mt-2 text-muted-foreground">
                Наш менеджер свяжется с вами в ближайшее время.
              </p>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="grid gap-4"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  required
                  name="firstName"
                  placeholder="Имя *"
                  className={field}
                  aria-label="Имя"
                />

                <input
                  required
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  placeholder="+7 (___) ___-__-__ *"
                  value={phone}
                  onChange={(e) => setPhone(formatPhone(e.target.value))}
                  className={field}
                  aria-label="Телефон"
                />
              </div>

              <input
                required
                name="car"
                placeholder="Какой автомобиль ищете *"
                className={field}
                aria-label="Какой автомобиль ищете"
              />

              <input
                required
                name="budget"
                placeholder="Бюджет *"
                className={field}
                aria-label="Бюджет"
              />

              <textarea
                required
                name="comment"
                placeholder="Комментарий *"
                rows={3}
                className={`${field} resize-none`}
                aria-label="Комментарий"
              />

              {error && (
                <p className="text-center text-sm text-red-400">
                  {error}
                </p>
                )}

              <button
                type="submit"
                disabled={loading}
                className="btn-glow mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-8 py-4 font-semibold text-accent-foreground transition-all duration-300 hover:scale-[1.02] hover:btn-glow-hover disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? 'Отправляем...' : 'Подобрать автомобиль'}
              </button>

              <p className="text-center text-xs text-muted-foreground">
                Нажимая кнопку, вы соглашаетесь с политикой обработки
                персональных данных.
              </p>
            </form>
          )}
        </div>
      </motion.div>
    </section>
  )
}