import type { Vehicle } from "./types";

const API = "/api/avito/cars";

export async function fetchVehicles(): Promise<{
  items: Vehicle[];
  total: number;
}> {
  const res = await fetch(API, {
  next: {
    revalidate: 60,
  },
});

  if (!res.ok) {
    throw new Error(`Ошибка API: ${res.status}`);
  }

  const data = await res.json();

  const resources = data.resources ?? [];

  const items: Vehicle[] = resources.map((car: any) => {
    const id = String(car.id);

    return {
      id,
      name: car.title ?? "Автомобиль",
      price: Number(car.price ?? 0),

      // Папка машины называется ID объявления
      image: `/api/car-image/${id}`,

      url: car.url ?? "#",
    };
  });

  return {
    items,
    total: items.length,
  };
}

export async function fetchVehicleById(id: string) {
  const { items } = await fetchVehicles();

  return items.find((car) => car.id === id) ?? null;
}