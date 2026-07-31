export const LUXURY = [0.16, 1, 0.3, 1] as const
export const EASE_OUT = [0.22, 1, 0.36, 1] as const

export type Tuple4 = readonly [number, number, number, number]

export const revealVariants = {
  hidden: { opacity: 0, y: 48, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.1, ease: LUXURY },
  },
} as const

export const itemVariants = {
  hidden: { opacity: 0, y: 32, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1, ease: LUXURY },
  },
} as const

export const staggerContainer = (stagger = 0.12, delayChildren = 0.25) => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren } },
})

export const springTap = {
  type: 'spring',
  stiffness: 400,
  damping: 22,
} as const
