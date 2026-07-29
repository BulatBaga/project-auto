'use client'

import { useMemo, useState } from 'react'
import { motion } from 'motion/react'
import { SlidersHorizontal } from 'lucide-react'
import { cars as allCars, type Car } from '@/lib/site'
import { CarCard } from './car-card'
import { SectionHeading } from './reveal'

type Filters = {
  brand: string
  transmission: string
  drive: string
  fuel: string
  maxPrice: string
}

const initial: Filters = {
  brand: '',
  transmission: '',
  drive: '',
  fuel: '',
  maxPrice: '',
}

function unique(list: Car[], key: keyof Car) {
  return Array.from(new Set(list.map((c) => String(c[key]))))
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-xl border border-input bg-secondary/60 px-4 py-3 text-sm text-foreground outline-none backdrop-blur-md transition-colors focus:border-accent"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-secondary text-foreground">
            {o.label}
          </option>
        ))}
      </select>
    </label>
  )
}

export function Inventory({ inventory = allCars }: { inventory?: Car[] }) {
  const [filters, setFilters] = useState<Filters>(initial)

  const set = (key: keyof Filters) => (v: string) =>
    setFilters((f) => ({ ...f, [key]: v }))

  const filtered = useMemo(() => {
    return inventory.filter((c) => {
      if (filters.brand && c.brand !== filters.brand) return false
      if (filters.transmission && c.transmission !== filters.transmission) return false
      if (filters.drive && c.drive !== filters.drive) return false
      if (filters.fuel && c.fuel !== filters.fuel) return false
      if (filters.maxPrice && c.price > Number(filters.maxPrice)) return false
      return true
    })
  }, [inventory, filters])

  const opt = (label: string, arr: string[]) => [
    { value: '', label },
    ...arr.map((v) => ({ value: v, label: v })),
  ]

  return (
    <section id="inventory" className="relative mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-40">
      <SectionHeading
        className="mb-16"
        eyebrow="Автомобили в наличии"
        title="Каталог проверенных автомобилей"
        description="Каждый автомобиль проходит полную техническую и юридическую проверку перед продажей."
      />

      {/* Filter */}
      <motion.div
        initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="glass-strong ring-hairline mb-14 rounded-[1.75rem] p-7 shadow-luxury"
      >
        <div className="mb-6 flex items-center gap-2.5 text-sm font-semibold text-foreground">
          <SlidersHorizontal className="h-4 w-4 text-accent" />
          Подбор по параметрам
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          <Select label="Марка" value={filters.brand} onChange={set('brand')} options={opt('Все марки', unique(inventory, 'brand'))} />
          <Select label="Коробка" value={filters.transmission} onChange={set('transmission')} options={opt('Любая', unique(inventory, 'transmission'))} />
          <Select label="Привод" value={filters.drive} onChange={set('drive')} options={opt('Любой', unique(inventory, 'drive'))} />
          <Select label="Топливо" value={filters.fuel} onChange={set('fuel')} options={opt('Любое', unique(inventory, 'fuel'))} />
          <Select
            label="Цена до"
            value={filters.maxPrice}
            onChange={set('maxPrice')}
            options={[
              { value: '', label: 'Не важно' },
              { value: '4500000', label: 'до 4,5 млн ₽' },
              { value: '6000000', label: 'до 6 млн ₽' },
              { value: '9000000', label: 'до 9 млн ₽' },
            ]}
          />
        </div>
      </motion.div>

      {filtered.length > 0 ? (
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((car, i) => (
            <CarCard key={car.id} car={car} index={i} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-border bg-card p-16 text-center">
          <p className="text-lg text-muted-foreground">
            По выбранным параметрам ничего не найдено.
          </p>
          <button
            type="button"
            onClick={() => setFilters(initial)}
            className="mt-4 rounded-xl bg-accent px-6 py-3 font-semibold text-accent-foreground btn-glow"
          >
            Сбросить фильтры
          </button>
        </div>
      )}
    </section>
  )
}
