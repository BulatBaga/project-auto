'use client'

import { Phone, MessageCircle, Search } from 'lucide-react'
import { contacts } from '@/lib/site'

export function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 px-3 pb-3 lg:hidden">
      <div className="glass-strong ring-hairline grid grid-cols-3 gap-2 rounded-[1.25rem] p-2 shadow-luxury">
        <a
          href={contacts.phoneHref}
          className="flex flex-col items-center gap-1 rounded-xl py-3 text-[0.7rem] font-medium text-foreground transition-colors duration-300 hover:text-accent"
        >
          <Phone className="h-5 w-5 text-accent" />
          Позвонить
        </a>
        <a
          href={contacts.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 rounded-xl py-3 text-[0.7rem] font-medium text-foreground transition-colors duration-300 hover:text-accent"
        >
          <MessageCircle className="h-5 w-5 text-accent" />
          WhatsApp
        </a>
        <a
          href="#cta"
          className="btn-glow flex flex-col items-center gap-1 rounded-xl bg-accent py-3 text-[0.7rem] font-semibold text-accent-foreground"
        >
          <Search className="h-5 w-5" />
          Подбор
        </a>
      </div>
    </div>
  )
}
