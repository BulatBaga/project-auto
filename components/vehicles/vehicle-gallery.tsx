'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { ChevronLeft, ChevronRight, Expand } from 'lucide-react'
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
      <div className="group relative aspect-[16/10] overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-secondary ring-hairline">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6, ease: LUXURY }}
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-60" />

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Предыдущее фото"
              className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-background/60 text-foreground opacity-0 backdrop-blur-md transition-all duration-300 hover:border-accent/60 hover:text-accent group-hover:opacity-100"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Следующее фото"
              className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-background/60 text-foreground opacity-0 backdrop-blur-md transition-all duration-300 hover:border-accent/60 hover:text-accent group-hover:opacity-100"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}

        <button
          type="button"
          onClick={() => setZoomed(true)}
          aria-label="Открыть фото на весь экран"
          className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-background/60 text-foreground opacity-0 backdrop-blur-md transition-all duration-300 hover:border-accent/60 hover:text-accent group-hover:opacity-100"
        >
          <Expand className="h-5 w-5" />
        </button>

        <span className="absolute bottom-4 left-4 rounded-full border border-white/10 bg-background/60 px-3.5 py-1.5 text-xs font-medium text-foreground/80 backdrop-blur-md">
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
              className={`relative aspect-[4/3] overflow-hidden rounded-xl border transition-all duration-300 ${
                i === active
                  ? 'border-accent ring-2 ring-accent/40'
                  : 'border-white/[0.07] opacity-60 hover:opacity-100'
              }`}
            >
              <Image
                src={img || '/placeholder.svg'}
                alt={`${name} — миниатюра ${i + 1}`}
                fill
                sizes="120px"
                className="object-cover"
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
            transition={{ duration: 0.3 }}
            onClick={() => setZoomed(false)}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-background/90 p-6 backdrop-blur-xl"
          >
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: LUXURY }}
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
            <button
              type="button"
              onClick={() => setZoomed(false)}
              aria-label="Закрыть"
              className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-background/60 text-foreground transition-colors hover:border-accent/60 hover:text-accent"
            >
              <ChevronRight className="h-6 w-6 rotate-45" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
