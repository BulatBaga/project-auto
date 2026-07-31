'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  SlidersHorizontal,
  RotateCcw,
  Search,
  X,
  ChevronDown,
  Loader2,
} from 'lucide-react'
import {
  fetchVehicles,
  fetchFacets,
} from '@/lib/vehicles/repository'
import type {
  BodyType,
  DriveType,
  FuelType,
  SortKey,
  Transmission,
  Vehicle,
  VehicleFilters,
} from '@/lib/vehicles/types'
import {
  bodyTypeOptions,
  driveOptions,
  fuelOptions,
  sortOptions,
  transmissionOptions,
} from '@/lib/vehicles/format'
import { VehicleCard } from '@/components/vehicles/vehicle-card'
import { SectionHeading } from '@/components/site/reveal'
import { LUXURY } from '@/lib/motion'

type Facets = {
  brands: string[]
  models: string[]
  years: number[]
  bodyTypes: string[]
  transmissions: string[]
  fuels: string[]
  drives: string[]
  priceBounds: { min: number; max: number }
  mileageBounds: { min: number; max: number }
}

const initialFilters: VehicleFilters = {
  search: '',
  brand: '',
  model: '',
  bodyType: '',
  transmission: '',
  fuel: '',
  drive: '',
  yearMin: '',
  yearMax: '',
  priceMin: '',
  priceMax: '',
  mileageMax: '',
}

const field =
  'w-full rounded-xl border border-input bg-secondary/60 px-4 py-3 text-sm text-foreground outline-none backdrop-blur-md transition-colors placeholder:text-muted-foreground/60 focus:border-accent focus:ring-2 focus:ring-accent/20'

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
      <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
        {label}
      </span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${field} appearance-none pr-10`}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value} className="bg-secondary text-foreground">
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      </div>
    </label>
  )
}

function NumberField({
  label,
  value,
  onChange,
  placeholder,
  suffix,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  suffix?: string
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
        {label}
      </span>
      <div className="relative">
        <input
          type="number"
          inputMode="numeric"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={suffix ? `${field} pr-12` : field}
        />
        {suffix && (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
            {suffix}
          </span>
        )}
      </div>
    </label>
  )
}

function Skeleton() {
  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-card">
      <div className="aspect-[16/10] animate-pulse bg-secondary" />
      <div className="space-y-4 p-7">
        <div className="h-7 w-2/3 animate-pulse rounded-lg bg-secondary" />
        <div className="h-8 w-1/3 animate-pulse rounded-lg bg-accent/20" />
        <div className="grid grid-cols-2 gap-4 pt-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-4 w-full animate-pulse rounded bg-secondary" />
          ))}
        </div>
        <div className="h-12 w-full animate-pulse rounded-2xl bg-secondary" />
      </div>
    </div>
  )
}

export function Inventory() {
  const [facets, setFacets] = useState<Facets | null>(null)
  const [items, setItems] = useState<Vehicle[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<VehicleFilters>(initialFilters)
  const [sort, setSort] = useState<SortKey>('newest')
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    fetchFacets().then(setFacets)
  }, [])

  useEffect(() => {
    setLoading(true)
    const id = setTimeout(() => {
      fetchVehicles(filters, sort).then((res) => {
        setItems(res.items)
        setTotal(res.total)
        setLoading(false)
      })
    }, 200)
    return () => clearTimeout(id)
  }, [filters, sort])

  const set = (key: keyof VehicleFilters) => (v: string) =>
    setFilters((f) => ({ ...f, [key]: v }))

  const models = useMemo(() => {
    if (!facets) return []
    return facets.models
  }, [facets])

  const activeCount = Object.entries(filters).filter(
    ([k, v]) => k !== 'search' && v !== '' && v != null,
  ).length

  const reset = () => setFilters(initialFilters)

  const yearOptions = facets
    ? [{ value: '', label: 'Любой' }, ...facets.years.map((y) => ({ value: String(y), label: String(y) }))]
    : [{ value: '', label: 'Любой' }]

  const priceSteps = [
    { value: '', label: 'Не важно' },
    { value: '4000000', label: 'до 4 млн ₽' },
    { value: '5000000', label: 'до 5 млн ₽' },
    { value: '6500000', label: 'до 6,5 млн ₽' },
    { value: '9000000', label: 'до 9 млн ₽' },
  ]

  const mileageSteps = [
    { value: '', label: 'Не важно' },
    { value: '20000', label: 'до 20 000 км' },
    { value: '35000', label: 'до 35 000 км' },
    { value: '50000', label: 'до 50 000 км' },
    { value: '100000', label: 'до 100 000 км' },
  ]

  const FilterGrid = (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      <Select
        label="Марка"
        value={filters.brand}
        onChange={set('brand')}
        options={[
          { value: '', label: 'Все марки' },
          ...(facets?.brands ?? []).map((b) => ({ value: b, label: b })),
        ]}
      />
      <Select
        label="Модель"
        value={filters.model}
        onChange={set('model')}
        options={[
          { value: '', label: 'Все модели' },
          ...models.map((m) => ({ value: m, label: m })),
        ]}
      />
      <Select
        label="Год от"
        value={String(filters.yearMin)}
        onChange={set('yearMin')}
        options={yearOptions}
      />
      <Select
        label="Год до"
        value={String(filters.yearMax)}
        onChange={set('yearMax')}
        options={yearOptions}
      />
      <Select
        label="Цена"
        value={String(filters.priceMax)}
        onChange={set('priceMax')}
        options={priceSteps}
      />
      <Select
        label="Пробег"
        value={String(filters.mileageMax)}
        onChange={set('mileageMax')}
        options={mileageSteps}
      />
      <Select
        label="Коробка"
        value={filters.transmission}
        onChange={(v) => set('transmission')(v as Transmission)}
        options={[
          { value: '', label: 'Любая' },
          ...transmissionOptions.map((t) => ({ value: t, label: t })),
        ]}
      />
      <Select
        label="Топливо"
        value={filters.fuel}
        onChange={(v) => set('fuel')(v as FuelType)}
        options={[
          { value: '', label: 'Любое' },
          ...fuelOptions.map((t) => ({ value: t, label: t })),
        ]}
      />
      <Select
        label="Привод"
        value={filters.drive}
        onChange={(v) => set('drive')(v as DriveType)}
        options={[
          { value: '', label: 'Любой' },
          ...driveOptions.map((t) => ({ value: t, label: t })),
        ]}
      />
      <Select
        label="Кузов"
        value={filters.bodyType}
        onChange={(v) => set('bodyType')(v as BodyType)}
        options={[
          { value: '', label: 'Любой' },
          ...bodyTypeOptions.map((t) => ({ value: t, label: t })),
        ]}
      />
    </div>
  )

  return (
    <section
      id="inventory"
      className="relative mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-40"
    >
      <SectionHeading
        className="mb-16"
        eyebrow="Автомобили в наличии"
        title="Каталог проверенных автомобилей"
        description="Каждый автомобиль проходит полную техническую и юридическую проверку перед продажей."
      />

      <motion.div
        initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: LUXURY }}
        className="glass-strong ring-hairline mb-10 rounded-[1.75rem] p-7 shadow-luxury"
      >
        <div className="mb-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 text-sm font-semibold text-foreground">
            <SlidersHorizontal className="h-4 w-4 text-accent" />
            Подбор по параметрам
          </div>
          {activeCount > 0 && (
            <button
              type="button"
              onClick={reset}
              className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-accent"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Сбросить ({activeCount})
            </button>
          )}
        </div>

        <div className="relative mb-6">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => set('search')(e.target.value)}
            placeholder="Поиск по модели или названию..."
            className={`${field} pl-12`}
            aria-label="Поиск"
          />
        </div>

        <div className="hidden lg:block">{FilterGrid}</div>

        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-input bg-secondary/60 px-4 py-3 text-sm font-semibold text-foreground backdrop-blur-md transition-colors hover:border-accent/60 lg:hidden"
        >
          <SlidersHorizontal className="h-4 w-4 text-accent" />
          Все фильтры {activeCount > 0 && `(${activeCount})`}
        </button>
      </motion.div>

      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-sm text-muted-foreground">
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin text-accent" />
              Загрузка...
            </span>
          ) : (
            <>
              Найдено{' '}
              <span className="font-semibold text-foreground">{total}</span>{' '}
              {pluralize(total, 'автомобиль', 'автомобиля', 'автомобилей')}
            </>
          )}
        </p>
        <label className="flex items-center gap-3">
          <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
            Сортировка
          </span>
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className={`${field} appearance-none py-2.5 pl-4 pr-10`}
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value} className="bg-secondary text-foreground">
                  {o.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>
        </label>
      </div>

      {loading ? (
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} />
          ))}
        </div>
      ) : items.length > 0 ? (
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {items.map((vehicle, i) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} index={i} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-border bg-card p-16 text-center">
          <p className="text-lg text-muted-foreground">
            По выбранным параметрам ничего не найдено.
          </p>
          <button
            type="button"
            onClick={reset}
            className="btn-glow mt-4 rounded-xl bg-accent px-6 py-3 font-semibold text-accent-foreground"
          >
            Сбросить фильтры
          </button>
        </div>
      )}

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setDrawerOpen(false)}
            className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm lg:hidden"
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.4, ease: LUXURY }}
              onClick={(e) => e.stopPropagation()}
              className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-[2rem] border-t border-white/10 bg-card p-6"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="font-display text-xl font-semibold">Фильтры</span>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Закрыть фильтры"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-border"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              {FilterGrid}
              <div className="mt-6 flex gap-3">
                {activeCount > 0 && (
                  <button
                    type="button"
                    onClick={reset}
                    className="flex-1 rounded-xl border border-border py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-accent/50 hover:text-accent"
                  >
                    Сбросить
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  className="btn-glow flex-1 rounded-xl bg-accent py-3.5 text-sm font-semibold text-accent-foreground"
                >
                  Показать ({total})
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

function pluralize(n: number, one: string, few: string, many: string) {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return one
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return few
  return many
}
