import mockData from './mock-data.json'
import type { CatalogResult, SortKey, Vehicle, VehicleFilters } from './types'

const LATENCY = 120

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(resolve, LATENCY, value))
}

export async function fetchVehicles(
  filters: VehicleFilters = {},
  sort: SortKey = 'newest',
): Promise<CatalogResult> {
  const all = mockData as Vehicle[]
  const items = applyFilters(all, filters).sort((a, b) => applySort(a, b, sort))

  return delay({
    items,
    total: items.length,
    facets: {
      brands: sortedUnique(all, 'brand'),
      models: sortedUnique(
        filters.brand ? all.filter((v) => v.brand === filters.brand) : all,
        'model',
      ),
      years: sortedUnique(all, 'year').sort((a, b) => a - b),
    },
  })
}

export async function fetchVehicleById(id: string): Promise<Vehicle | null> {
  const all = mockData as Vehicle[]
  return delay(all.find((v) => v.id === id) ?? null)
}

export async function fetchFeaturedVehicles(limit = 6): Promise<Vehicle[]> {
  const all = mockData as Vehicle[]
  return delay(all.filter((v) => v.isFeatured).slice(0, limit))
}

export async function fetchRelatedVehicles(
  id: string,
  limit = 3,
): Promise<Vehicle[]> {
  const all = mockData as Vehicle[]
  const current = all.find((v) => v.id === id)
  if (!current) return delay([])
  return delay(
    all
      .filter((v) => v.id !== id)
      .sort((a, b) => scoreRelated(a, current) - scoreRelated(b, current))
      .slice(0, limit),
  )
}

export async function fetchFacets() {
  const all = mockData as Vehicle[]
  return delay({
    brands: sortedUnique(all, 'brand'),
    models: sortedUnique(all, 'model'),
    years: sortedUnique(all, 'year').sort((a, b) => a - b),
    bodyTypes: sortedUnique(all, 'bodyType'),
    transmissions: sortedUnique(all, 'transmission'),
    fuels: sortedUnique(all, 'fuel'),
    drives: sortedUnique(all, 'drive'),
    priceBounds: { min: Math.min(...all.map((v) => v.price)), max: Math.max(...all.map((v) => v.price)) },
    mileageBounds: { min: Math.min(...all.map((v) => v.mileage)), max: Math.max(...all.map((v) => v.mileage)) },
  })
}

function applyFilters(list: Vehicle[], f: VehicleFilters): Vehicle[] {
  return list.filter((v) => {
    if (f.search) {
      const q = f.search.trim().toLowerCase()
      if (!`${v.brand} ${v.model} ${v.name}`.toLowerCase().includes(q)) return false
    }
    if (f.brand && v.brand !== f.brand) return false
    if (f.model && v.model !== f.model) return false
    if (f.bodyType && v.bodyType !== f.bodyType) return false
    if (f.transmission && v.transmission !== f.transmission) return false
    if (f.fuel && v.fuel !== f.fuel) return false
    if (f.drive && v.drive !== f.drive) return false
    if (f.yearMin && v.year < Number(f.yearMin)) return false
    if (f.yearMax && v.year > Number(f.yearMax)) return false
    if (f.priceMin && v.price < Number(f.priceMin)) return false
    if (f.priceMax && v.price > Number(f.priceMax)) return false
    if (f.mileageMax && v.mileage > Number(f.mileageMax)) return false
    return true
  })
}

function applySort(a: Vehicle, b: Vehicle, sort: SortKey): number {
  switch (sort) {
    case 'price-asc':
      return a.price - b.price
    case 'price-desc':
      return b.price - a.price
    case 'mileage-asc':
      return a.mileage - b.mileage
    case 'year-desc':
      return b.year - a.year
    case 'newest':
    default:
      return b.createdAt.localeCompare(a.createdAt)
  }
}

function scoreRelated(v: Vehicle, ref: Vehicle): number {
  let score = 0
  if (v.brand === ref.brand) score -= 3
  if (v.bodyType === ref.bodyType) score -= 2
  if (v.fuel === ref.fuel) score -= 1
  score += Math.abs(v.price - ref.price) / 1_000_000
  return score
}

function sortedUnique<T, K extends keyof T>(list: T[], key: K): string[] {
  return Array.from(new Set(list.map((v) => String(v[key])))).sort()
}
