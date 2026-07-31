export type BodyType =
  | 'Седан'
  | 'Кроссовер'
  | 'Внедорожник'
  | 'Купе'
  | 'Универсал'
  | 'Хэтчбек'
  | 'Минивэн'
  | 'Пикап'

export type Transmission = 'Автомат' | 'Механика' | 'Робот' | 'Вариатор'
export type FuelType = 'Бензин' | 'Дизель' | 'Гибрид' | 'Электро'
export type DriveType = 'Передний' | 'Задний' | 'Полный'

export type VehicleFeature = {
  icon: string
  label: string
}

export type Vehicle = {
  id: string
  brand: string
  model: string
  name: string
  year: number
  price: number
  mileage: number
  transmission: Transmission
  fuel: FuelType
  drive: DriveType
  bodyType: BodyType
  engineVolume: number
  power: number
  color: string
  vin: string
  image: string
  gallery: string[]
  description: string
  features: VehicleFeature[]
  isFeatured?: boolean
  createdAt: string
}

export type VehicleFilters = {
  search?: string
  brand?: string
  model?: string
  bodyType?: BodyType | ''
  transmission?: Transmission | ''
  fuel?: FuelType | ''
  drive?: DriveType | ''
  yearMin?: number | ''
  yearMax?: number | ''
  priceMin?: number | ''
  priceMax?: number | ''
  mileageMax?: number | ''
}

export type SortKey =
  | 'newest'
  | 'price-asc'
  | 'price-desc'
  | 'mileage-asc'
  | 'year-desc'

export type CatalogResult = {
  items: Vehicle[]
  total: number
  facets: {
    brands: string[]
    models: string[]
    years: number[]
  }
}
