export const contacts = {
  phone: '+7 (900) 000-00-00',
  phoneHref: 'tel:+79000000000',
  whatsapp: 'https://wa.me/79000000000',
  telegram: 'https://t.me/avtosalonbaza',
  address: 'г. Москва, Волгоградский проспект, 42',
  hours: 'Ежедневно с 09:00 до 21:00',
}

export const navLinks = [
  { label: 'Главная', href: '#hero' },
  { label: 'Автомобили', href: '#inventory' },
  { label: 'Подбор', href: '#cta' },
  { label: 'О нас', href: '#about' },
  { label: 'Контакты', href: '#contacts' },
]

export type Car = {
  id: string
  name: string
  price: number
  year: number
  mileage: number
  transmission: string
  fuel: string
  drive: string
  brand: string
  image: string
}

export const cars: Car[] = [
  {
    id: '1',
    name: 'Range Rover Velar',
    price: 5490000,
    year: 2022,
    mileage: 34000,
    transmission: 'Автомат',
    fuel: 'Бензин',
    drive: 'Полный',
    brand: 'Land Rover',
    image: '/cars/car-black-suv.png',
  },
  {
    id: '2',
    name: 'Mercedes-Benz E-Class',
    price: 4290000,
    year: 2021,
    mileage: 48000,
    transmission: 'Автомат',
    fuel: 'Бензин',
    drive: 'Задний',
    brand: 'Mercedes-Benz',
    image: '/cars/car-white-sedan.png',
  },
  {
    id: '3',
    name: 'BMW M4 Competition',
    price: 6890000,
    year: 2023,
    mileage: 18000,
    transmission: 'Автомат',
    fuel: 'Бензин',
    drive: 'Полный',
    brand: 'BMW',
    image: '/cars/car-grey-coupe.png',
  },
  {
    id: '4',
    name: 'Audi Q7',
    price: 5990000,
    year: 2022,
    mileage: 41000,
    transmission: 'Автомат',
    fuel: 'Дизель',
    drive: 'Полный',
    brand: 'Audi',
    image: '/cars/car-silver-crossover.png',
  },
  {
    id: '5',
    name: 'Genesis G80',
    price: 4790000,
    year: 2023,
    mileage: 22000,
    transmission: 'Автомат',
    fuel: 'Бензин',
    drive: 'Полный',
    brand: 'Genesis',
    image: '/cars/car-blue-sedan.png',
  },
  {
    id: '6',
    name: 'Porsche Panamera',
    price: 8490000,
    year: 2022,
    mileage: 29000,
    transmission: 'Автомат',
    fuel: 'Бензин',
    drive: 'Полный',
    brand: 'Porsche',
    image: '/cars/car-black-coupe.png',
  },
]

export const reviews = [
  {
    name: 'Алексей Морозов',
    role: 'Range Rover Velar',
    image: '/reviews/person-1.png',
    text: 'Покупал автомобиль впервые в салоне и остался под впечатлением. Полная проверка, честная история, оформили всё за один день. Рекомендую.',
  },
  {
    name: 'Дмитрий Соколов',
    role: 'BMW M4',
    image: '/reviews/person-2.png',
    text: 'Сдал старую машину по Trade-In и сразу забрал новую. Оценили честно, без занижения. Отношение действительно премиальное.',
  },
  {
    name: 'Екатерина Волкова',
    role: 'Genesis G80',
    image: '/reviews/person-3.png',
    text: 'Долго выбирала и переживала за юридическую чистоту. Здесь показали все документы и историю. Спокойна за свою покупку.',
  },
]

export function formatPrice(value: number) {
  return new Intl.NumberFormat('ru-RU').format(value) + ' ₽'
}

export function formatMileage(value: number) {
  return new Intl.NumberFormat('ru-RU').format(value) + ' км'
}
