'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react'
import { Phone, MessageCircle, Menu, X } from 'lucide-react'
import { navLinks, contacts } from '@/lib/site'
import { LUXURY, springTap } from '@/lib/motion'

export function Navbar() {
const [scrolled, setScrolled] = useState(false)
const [open, setOpen] = useState(false)
const [phoneOpen, setPhoneOpen] = useState(false)
const [mounted, setMounted] = useState(false)

  const { scrollYProgress } = useScroll()

  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  })

  useEffect(() => {
  setMounted(true)

  const onScroll = () => setScrolled(window.scrollY > 24)

  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })

  return () => {
    window.removeEventListener('scroll', onScroll)
  }
}, [])

  return (
    <>
      {/* Skip link */}
      <a
        href="#inventory"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-xl focus:bg-accent focus:px-4 focus:py-2 focus:font-semibold focus:text-accent-foreground"
      >
        Перейти к содержимому
      </a>

      {/* ================= NAVBAR ================= */}
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: LUXURY }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
      >
        <nav
          className={`relative flex w-full max-w-7xl items-center justify-between rounded-2xl px-4 transition-all duration-700 ease-out md:px-6 ${
            scrolled
              ? 'glass-strong shadow-luxury py-2.5'
              : 'border border-transparent bg-transparent py-4'
          }`}
        >
          {/* ЛОГОТИП */}
          <a
            href="#hero"
            className="flex items-center gap-3"
            aria-label="Автосалон База — на главную"
          >
            <Image
              src="/logo-mark.jpeg"
              alt="Логотип Автосалон База"
              width={44}
              height={44}
              className="h-10 w-10 rounded-lg object-contain"
              priority
            />

            <span className="font-display text-lg font-semibold tracking-[0.22em] text-foreground">
              БАЗА
            </span>
          </a>

          {/* МЕНЮ */}
          <div className="hidden items-center gap-9 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative text-sm font-medium text-muted-foreground transition-colors duration-300 hover:text-foreground"
              >
                {link.label}

                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-accent transition-all duration-500 ease-out group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* ПРАВАЯ ЧАСТЬ */}
          <div className="flex items-center gap-2">
            {/* WHATSAPP */}
            <a
              href={contacts.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Написать в WhatsApp"
              className="hidden h-10 w-10 items-center justify-center rounded-xl border border-border text-muted-foreground transition-all duration-300 hover:border-accent/60 hover:text-accent sm:flex"
            >
              <MessageCircle className="h-5 w-5" />
            </a>

            {/* ПОЗВОНИТЬ */}
            <motion.button
              type="button"
              onClick={() => setPhoneOpen(true)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={springTap}
              className="btn-glow hidden items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground sm:flex"
            >
              <Phone className="h-4 w-4" />
              Позвонить
            </motion.button>
            {/* МОБИЛЬНОЕ МЕНЮ */}
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Открыть меню"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-border text-foreground transition-colors hover:border-accent/50 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>

          {/* ЛИНИЯ ПРОГРЕССА */}
          <motion.span
            style={{ scaleX: progress }}
            className="absolute inset-x-4 bottom-0 h-px origin-left bg-accent/70"
          />
        </nav>
      </motion.header>

      {/* ================= ОКНО ТЕЛЕФОНА ================= */}
{mounted &&
  phoneOpen &&
  createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[99999] flex min-h-screen items-center justify-center bg-black/75 p-6 backdrop-blur-md"
        onClick={() => setPhoneOpen(false)}
      >
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.85,
            y: 20,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.85,
            y: 20,
          }}
          transition={{
            duration: 0.3,
            ease: LUXURY,
          }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-md rounded-3xl border border-white/10 bg-card p-8 text-center shadow-2xl"
        >
          {/* КРЕСТИК */}
          <button
            type="button"
            onClick={() => setPhoneOpen(false)}
            aria-label="Закрыть"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors hover:border-accent/50 hover:text-accent"
          >
            <X className="h-5 w-5" />
          </button>

          {/* ИКОНКА */}
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10 text-accent">
            <Phone className="h-7 w-7" />
          </div>

          {/* ТЕКСТ */}
          <p className="mt-6 text-sm uppercase tracking-[0.2em] text-muted-foreground">
            Автосалон База
          </p>

          <h3 className="mt-3 font-display text-2xl font-semibold text-foreground">
            Свяжитесь с нами
          </h3>

          {/* НОМЕР */}
          <a
            href="tel:+79177350401"
            className="mt-5 block text-2xl font-semibold tracking-wide text-accent transition-colors hover:text-foreground"
          >
            +7 (917) 735-04-01
          </a>

          {/* ПОЗВОНИТЬ */}
          <a
            href="tel:+79177350401"
            onClick={() => setPhoneOpen(false)}
            className="btn-glow mt-7 flex w-full items-center justify-center gap-2 rounded-2xl bg-accent px-6 py-4 font-semibold text-accent-foreground transition-transform hover:scale-[1.02]"
          >
            <Phone className="h-5 w-5" />
            Позвонить
          </a>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  )}

      {/* ================= МОБИЛЬНОЕ МЕНЮ ================= */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] flex flex-col bg-background/95 backdrop-blur-2xl lg:hidden"
          >
            {/* ШАПКА МОБИЛЬНОГО МЕНЮ */}
            <div className="flex items-center justify-between px-6 py-6">
              <span className="font-display text-lg font-semibold tracking-[0.22em]">
                БАЗА
              </span>

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Закрыть меню"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-border"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* ССЫЛКИ */}
            <div className="flex flex-1 flex-col justify-center gap-3 px-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{
                    opacity: 0,
                    x: -40,
                    filter: 'blur(6px)',
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    filter: 'blur(0px)',
                  }}
                  transition={{
                    delay: 0.08 * i + 0.1,
                    duration: 0.6,
                    ease: LUXURY,
                  }}
                  className="font-display text-5xl font-medium uppercase tracking-wide text-foreground/90"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            {/* КНОПКИ */}
            <div className="flex flex-col gap-3 px-6 pb-10">
              {/* ПОЗВОНИТЬ */}
              <button
                type="button"
                onClick={() => {
                  setOpen(false)
                  setPhoneOpen(true)
                }}
                className="btn-glow flex items-center justify-center gap-2 rounded-2xl bg-accent py-4 font-semibold text-accent-foreground"
              >
                <Phone className="h-5 w-5" />
                Позвонить
              </button>

              {/* WHATSAPP */}
              <a
                href={contacts.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-2xl border border-border py-4 font-semibold text-foreground"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}