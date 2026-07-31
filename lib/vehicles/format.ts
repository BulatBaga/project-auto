import type { BodyType, DriveType, FuelType, Transmission } from './types'

export function formatPrice(value: number): string {
  return new Intl.NumberFormat('ru-RU').format(value) + ' ₽'
}

export function formatMileage(value: number): string {
  return new Intl.NumberFormat('ru-RU').format(value) + ' км'
}

export function formatPower(value: number): string {
  return `${value} л.с.`
}

export function formatEngine(value: number): string {
  return `${value.toFixed(1)} л`
}

export const bodyTypeOptions: BodyType[] = [
  'Седан',
  'Кроссовер',
  'Внедорожник',
  'Купе',
  'Универсал',
  'Хэтчбек',
  'Минивэн',
  'Пикап',
]

export const transmissionOptions: Transmission[] = [
  'Автомат',
  'Механика',
  'Робот',
  'Вариатор',
]

export const fuelOptions: FuelType[] = ['Бензин', 'Дизель', 'Гибрид', 'Электро']

export const driveOptions: DriveType[] = ['Передний', 'Задний', 'Полный']

export const sortOptions: { value: string; label: string }[] = [
  { value: 'newest', label: 'Сначала новые' },
  { value: 'price-asc', label: 'Цена: по возрастанию' },
  { value: 'price-desc', label: 'Цена: по убыванию' },
  { value: 'mileage-asc', label: 'Пробег: по возрастанию' },
  { value: 'year-desc', label: 'Год: новее' },
]
