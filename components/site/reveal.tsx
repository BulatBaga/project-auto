'use client'

import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { LUXURY, revealVariants } from '@/lib/motion'

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      variants={revealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  className?: string
}) {
  const centered = align === 'center'
  return (
    <div
      className={`flex flex-col gap-5 ${centered ? 'items-center text-center' : ''} ${
        className ?? ''
      }`}
    >
      <motion.span
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: LUXURY }}
        className="eyebrow inline-flex items-center gap-2.5"
      >
        <span className="h-px w-8 bg-accent/60" />
        {eyebrow}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: LUXURY }}
        className={`font-display text-display-sm font-bold uppercase leading-[0.92] tracking-tight text-balance ${
          centered ? 'max-w-3xl' : 'max-w-2xl'
        }`}
      >
        {title}
      </motion.h2>
      {description ? (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1, ease: LUXURY }}
          className="max-w-xl text-lg leading-relaxed text-muted-foreground"
        >
          {description}
        </motion.p>
      ) : null}
    </div>
  )
}
