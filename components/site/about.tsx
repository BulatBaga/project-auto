'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react'
import { Reveal } from './reveal'
import { LUXURY } from '@/lib/motion'

const stats = [
  { value: '500+', label: 'проданных автомобилей' },
  { value: '98%', label: 'положительных отзывов' },
  { value: '10+', label: 'лет опыта' },
  { value: '100%', label: 'юридическая чистота' },
]

const showroomImages = [
  '/showroom/1.jpg',
  '/showroom/2.jpg',
  '/showroom/3.jpg',
  '/showroom/4.jpg',
  '/showroom/5.jpg',
]

export function About() {
  const ref = useRef<HTMLDivElement>(null)
  const [currentImage, setCurrentImage] = useState(0)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '14%'])

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % showroomImages.length)
  }

  const prevImage = () => {
    setCurrentImage(
      (prev) =>
        (prev - 1 + showroomImages.length) % showroomImages.length
    )
  }

  return (
    <section id="about" className="relative overflow-hidden py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10">

        {/* Заголовок */}
        <div className="mb-16 grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: LUXURY }}
              className="eyebrow inline-flex items-center gap-2.5"
            >
              <span className="h-px w-8 bg-accent/60" />
              О компании
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: LUXURY }}
              className="mt-6 font-display text-display-sm font-bold uppercase leading-[0.9] tracking-tight text-balance"
            >
              Автосалон,
              которому <span className="text-accent">доверяют</span>
            </motion.h2>
          </div>

          <Reveal className="lg:col-span-4" delay={0.15}>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Более 10 лет мы помогаем клиентам покупать автомобили безопасно и
              выгодно. Мы не маркетплейс и не посредник — мы отвечаем за каждый
              автомобиль в нашем каталоге.
            </p>
          </Reveal>
        </div>

        {/* Карусель фотографий */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.1, ease: LUXURY }}
          className="relative h-[420px] overflow-hidden rounded-[2rem] border border-white/[0.07] ring-hairline md:h-[620px]"
          ref={ref}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImage}
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 0.45, ease: LUXURY }}
              className="absolute inset-0"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.8}
              onDragEnd={(_, info) => {
                if (info.offset.x < -50) {
                  nextImage()
                }

                if (info.offset.x > 50) {
                  prevImage()
                }
              }}
            >
              <motion.div
                style={{ y }}
                className="absolute inset-0 -top-[14%] h-[128%]"
              >
                <Image
                  src={showroomImages[currentImage]}
                  alt={`Автосалон — фотография ${currentImage + 1}`}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority={currentImage === 0}
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Затемнение снизу */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />

          {/* Подпись */}
          <div className="pointer-events-none absolute bottom-6 left-6 right-6 flex flex-col gap-4 md:bottom-10 md:left-10 md:right-auto md:max-w-md">
            <p className="font-display text-2xl font-medium leading-snug tracking-wide text-balance md:text-3xl">
              Пространство, созданное для уверенного выбора.
            </p>
          </div>

          {/* Стрелка назад */}
          <button
            type="button"
            onClick={prevImage}
            aria-label="Предыдущее фото"
            className="absolute left-5 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/30 text-2xl text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-black/50"
          >
            ←
          </button>

          {/* Стрелка вперёд */}
          <button
            type="button"
            onClick={nextImage}
            aria-label="Следующее фото"
            className="absolute right-5 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/30 text-2xl text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-black/50"
          >
            →
          </button>

          {/* Точки */}
          <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {showroomImages.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentImage(index)}
                aria-label={`Открыть фото ${index + 1}`}
                className={`h-2 rounded-full transition-all ${
                  index === currentImage
                    ? 'w-8 bg-accent'
                    : 'w-2 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Статистика */}
        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 md:mt-20 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1}>
              <div className="flex flex-col gap-2.5 border-t border-white/10 pt-7">
                <div className="font-display text-5xl font-bold tracking-tight text-foreground md:text-6xl">
                  {s.value}
                </div>

                <div className="text-sm leading-relaxed text-muted-foreground">
                  {s.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}