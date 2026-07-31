import Image from 'next/image'
import { navLinks, contacts } from '@/lib/site'

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-secondary/30">
      {/* faint top accent line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-10">
        <div className="flex flex-col justify-between gap-12 md:flex-row">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <Image
                src="/logo-mark.jpeg"
                alt="Логотип Автосалон База"
                width={44}
                height={44}
                className="h-10 w-10 rounded-lg object-contain"
              />
              <span className="font-display text-lg font-semibold tracking-[0.22em]">БАЗА</span>
            </div>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Премиальный автосалон проверенных автомобилей с пробегом. Trade-In,
              автокредит, выкуп и полное юридическое сопровождение.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Навигация
            </span>
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-foreground/80 transition-colors duration-300 hover:text-accent"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Контакты
            </span>
            <a
              href={contacts.phoneHref}
              className="text-sm text-foreground/80 transition-colors duration-300 hover:text-accent"
            >
              {contacts.phone}
            </a>
            <a
              href={contacts.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-foreground/80 transition-colors duration-300 hover:text-accent"
            >
              WhatsApp
            </a>
            <a
              href={contacts.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-foreground/80 transition-colors duration-300 hover:text-accent"
            >
              Telegram
            </a>
            <span className="text-sm text-muted-foreground">{contacts.address}</span>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 text-sm text-muted-foreground md:flex-row">
          <span>© {new Date().getFullYear()} Автосалон БАЗА. Все права защищены.</span>
          <span>Проверенные автомобили с пробегом</span>
        </div>
      </div>
    </footer>
  )
}
