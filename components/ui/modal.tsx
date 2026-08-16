'use client'

import { ReactNode, useEffect, useState } from "react"
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'

type ModalProps = {
  open: boolean
  onClose: () => void
  children: ReactNode
}

export default function Modal({

  open,
  onClose,
  children,
}: ModalProps) {
    const [mounted, setMounted] = useState(false)

useEffect(() => {
  setMounted(true)
}, [])

if (!mounted) return null
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          onClick={onClose}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-md rounded-3xl bg-zinc-900 p-8 shadow-2xl"
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}