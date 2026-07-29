'use client'

import { Phone, MessageCircle, Search } from 'lucide-react'
import { contacts } from '@/lib/site'

export function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 lg:hidden">
      <div className="glass m-3 grid grid-cols-3 gap-2 rounded-2xl p-2">
        <a
          href={contacts.phoneHref}
          className="flex flex-col items-center gap-1 rounded-xl py-2.5 text-xs font-medium text-foreground"
        >
          <Phone className="h-5 w-5 text-accent" />
          Позвонить
        </a>
        <a
          href={contacts.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 rounded-xl py-2.5 text-xs font-medium text-foreground"
        >
          <MessageCircle className="h-5 w-5 text-accent" />
          WhatsApp
        </a>
        <a
          href="#cta"
          className="flex flex-col items-center gap-1 rounded-xl bg-accent py-2.5 text-xs font-semibold text-accent-foreground"
        >
          <Search className="h-5 w-5" />
          Подбор
        </a>
      </div>
    </div>
  )
}
