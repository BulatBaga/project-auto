'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react'
import { Phone, MessageCircle, Menu, X } from 'lucide-react'
import { navLinks, contacts } from '@/lib/site'

const LUXURY = [0.16, 1, 0.3, 1] as const

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
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
          <a href="#hero" className="flex items-center gap-3" aria-label="Автосалон База — на главную">
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

          <div className="flex items-center gap-2">
            <a
              href={contacts.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Написать в WhatsApp"
              className="hidden h-10 w-10 items-center justify-center rounded-xl border border-border text-muted-foreground transition-all duration-300 hover:border-accent/60 hover:text-accent sm:flex"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
            <motion.a
              href={contacts.phoneHref}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="btn-glow hidden items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground sm:flex"
            >
              <Phone className="h-4 w-4" />
              Позвонить
            </motion.a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Открыть меню"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-border text-foreground transition-colors hover:border-accent/50 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>

          {/* scroll progress */}
          <motion.span
            style={{ scaleX: progress }}
            className="absolute inset-x-4 bottom-0 h-px origin-left bg-accent/70"
          />
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[60] flex flex-col bg-background/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex items-center justify-between px-6 py-6">
              <span className="font-display text-lg font-semibold tracking-[0.22em]">БАЗА</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Закрыть меню"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-border"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex flex-1 flex-col justify-center gap-3 px-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -40, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  transition={{ delay: 0.08 * i + 0.1, duration: 0.6, ease: LUXURY }}
                  className="font-display text-5xl font-medium uppercase tracking-wide text-foreground/90"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
            <div className="flex flex-col gap-3 px-6 pb-10">
              <a
                href={contacts.phoneHref}
                className="btn-glow flex items-center justify-center gap-2 rounded-2xl bg-accent py-4 font-semibold text-accent-foreground"
              >
                <Phone className="h-5 w-5" /> Позвонить
              </a>
              <a
                href={contacts.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-2xl border border-border py-4 font-semibold text-foreground"
              >
                <MessageCircle className="h-5 w-5" /> WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
