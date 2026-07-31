'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'
import { LUXURY } from '@/lib/motion'

export function VehicleGallery({
  images,
  name,
}: {
  images: string[]
  name: string
}) {
  const [active, setActive] = useState(0)
  const [zoomed, setZoomed] = useState(false)
  const count = images.length

  const go = (dir: 1 | -1) =>
    setActive((a) => (dir === 1 ? (a + 1) % count : (a - 1 + count) % count))

  return (
    <div className="flex flex-col gap-4">
      <div className="group relative aspect-[16/10] overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-secondary shadow-card ring-hairline">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.7, ease: LUXURY }}
            className="absolute inset-0"
          >
            <Image
              src={images[active] || '/placeholder.svg'}
              alt={`${name} — фото ${active + 1}`}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover"
              priority={active === 0}
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Предыдущее фото"
              className="absolute left-5 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-background/50 text-foreground opacity-0 backdrop-blur-xl transition-all duration-400 hover:border-accent/60 hover:text-accent group-hover:opacity-100"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Следующее фото"
              className="absolute right-5 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-background/50 text-foreground opacity-0 backdrop-blur-xl transition-all duration-400 hover:border-accent/60 hover:text-accent group-hover:opacity-100"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}

        <button
          type="button"
          onClick={() => setZoomed(true)}
          aria-label="Открыть фото на весь экран"
          className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-background/50 text-foreground opacity-0 backdrop-blur-xl transition-all duration-400 hover:border-accent/60 hover:text-accent group-hover:opacity-100"
        >
          <Expand className="h-5 w-5" />
        </button>

        <span className="absolute bottom-5 left-5 rounded-full border border-white/10 bg-background/50 px-4 py-1.5 text-xs font-medium tracking-wide text-foreground/80 backdrop-blur-xl">
          {active + 1} / {count}
        </span>
      </div>

      {count > 1 && (
        <div className="grid grid-cols-4 gap-3 md:grid-cols-6">
          {images.map((img, i) => (
            <button
              key={img + i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Фото ${i + 1}`}
              className={`group/thumb relative aspect-[4/3] overflow-hidden rounded-xl border transition-all duration-400 ${
                i === active
                  ? 'border-accent ring-2 ring-accent/30'
                  : 'border-white/[0.07] opacity-50 hover:opacity-100'
              }`}
            >
              <Image
                src={img || '/placeholder.svg'}
                alt={`${name} — миниатюра ${i + 1}`}
                fill
                sizes="120px"
                className="object-cover transition-transform duration-700 group-hover/thumb:scale-110"
              />
            </button>
          ))}
        </div>
      )}

      <AnimatePresence>
        {zoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: LUXURY }}
            onClick={() => setZoomed(false)}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-background/92 p-6 backdrop-blur-2xl md:p-12"
          >
            <button
              type="button"
              onClick={() => setZoomed(false)}
              aria-label="Закрыть"
              className="absolute right-6 top-6 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-background/50 text-foreground backdrop-blur-xl transition-all duration-300 hover:border-accent/60 hover:text-accent"
            >
              <X className="h-6 w-6" />
            </button>

            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    go(-1)
                  }}
                  aria-label="Предыдущее фото"
                  className="absolute left-6 top-1/2 z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-background/50 text-foreground backdrop-blur-xl transition-all duration-300 hover:border-accent/60 hover:text-accent md:left-12"
                >
                  <ChevronLeft className="h-7 w-7" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    go(1)
                  }}
                  aria-label="Следующее фото"
                  className="absolute right-6 top-1/2 z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-background/50 text-foreground backdrop-blur-xl transition-all duration-300 hover:border-accent/60 hover:text-accent md:right-12"
                >
                  <ChevronRight className="h-7 w-7" />
                </button>
              </>
            )}

            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: LUXURY }}
              className="relative aspect-[16/10] w-full max-w-5xl overflow-hidden rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[active] || '/placeholder.svg'}
                alt={`${name} — фото ${active + 1}`}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </motion.div>

            <span className="absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-background/50 px-5 py-2 text-xs font-medium tracking-wide text-foreground/80 backdrop-blur-xl">
              {active + 1} / {count}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
