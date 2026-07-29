'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { Phone, MessageCircle, Menu, X } from 'lucide-react'
import { navLinks, contacts } from '@/lib/site'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
      >
        <nav
          className={`flex w-full max-w-6xl items-center justify-between rounded-2xl px-4 py-3 transition-all duration-500 md:px-6 ${
            scrolled ? 'glass shadow-2xl' : 'bg-transparent'
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
            <span className="font-display text-lg font-semibold tracking-widest text-foreground">
              БАЗА
            </span>
          </a>

          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={contacts.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Написать в WhatsApp"
              className="hidden h-10 w-10 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors hover:border-accent hover:text-accent sm:flex"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
            <a
              href={contacts.phoneHref}
              className="hidden items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground btn-glow transition-transform hover:scale-[1.03] sm:flex"
            >
              <Phone className="h-4 w-4" />
              Позвонить
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Открыть меню"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-foreground lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex flex-col bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex items-center justify-between px-6 py-6">
              <span className="font-display text-lg font-semibold tracking-widest">БАЗА</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Закрыть меню"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex flex-1 flex-col justify-center gap-2 px-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i }}
                  className="font-display text-4xl font-medium tracking-wide text-foreground/90"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
            <div className="flex flex-col gap-3 px-6 pb-10">
              <a
                href={contacts.phoneHref}
                className="flex items-center justify-center gap-2 rounded-xl bg-accent py-4 font-semibold text-accent-foreground btn-glow"
              >
                <Phone className="h-5 w-5" /> Позвонить
              </a>
              <a
                href={contacts.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-border py-4 font-semibold text-foreground"
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
