"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchVehicles } from "@/lib/vehicles/repository";

type Car = {
  id: string;
  name: string;
  price: number;
  image: string;
  url?: string;
};

export function Inventory() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetchVehicles()
      .then((res) => {
        if (cancelled) return;

        setCars(res.items);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка загрузки автомобилей:", err);

        if (cancelled) return;

        setError(true);
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  /*
   * SEO-разметка каталога.
   *
   * Передаём поисковику только реальные данные,
   * которые пришли из Avito.
   */
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Автомобили в наличии — Автосалон БАЗА",
    description:
      "Автомобили с пробегом в наличии в автосалоне БАЗА в Уфе.",
    numberOfItems: cars.length,
    itemListElement: cars.map((car, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: car.name,
      url: car.url || undefined,
    })),
  };

  return (
    <section id="inventory" className="py-20">
      {/* SEO-разметка */}
      {!loading && cars.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      )}

      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-10 text-4xl font-bold">
          Автомобили в наличии
        </h2>

        {/* Загрузка */}
        {loading && (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-3xl border border-zinc-700 bg-zinc-900"
              >
                <div className="h-64 w-full animate-pulse bg-zinc-800" />

                <div className="space-y-4 p-6">
                  <div className="h-6 w-3/4 animate-pulse rounded bg-zinc-800" />
                  <div className="h-9 w-1/2 animate-pulse rounded bg-zinc-800" />
                  <div className="h-12 w-full animate-pulse rounded-xl bg-zinc-800" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Ошибка */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-center text-white">
            Не удалось загрузить автомобили.
            

            Попробуйте обновить страницу.
          </div>
        )}

        {/* Автомобили */}
        {!loading && !error && cars.length > 0 && (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {cars.map((car) => (
              <div
                key={car.id}
                className="relative overflow-hidden rounded-3xl border border-zinc-700 bg-zinc-900 shadow-2xl transition duration-300 hover:-translate-y-2 hover:border-[#2EF2D0]"
              >
                {/* ФОТО */}
                <div className="relative h-64 w-full overflow-hidden bg-zinc-800">
                  <Image
                    src={car.image}
                    alt={`${car.name} — купить в Уфе`}
                    fill
                    sizes="
                      (max-width: 768px) 100vw,
                      (max-width: 1280px) 50vw,
                      33vw
                    "
                    className="object-cover"
                    loading="lazy"
                    onError={(e) => {
                      console.error(
                        "Ошибка картинки:",
                        car.image
                      );

                      e.currentTarget.src =
                      "/cars/no-image.jpg";
                    }}
                  />
                </div>

                {/* БЕЙДЖ */}
                <div className="absolute right-4 top-4 rounded-full border border-[#2EF2D0] bg-black/70 px-3 py-1 text-xs font-semibold text-[#39FFD8] backdrop-blur">
                  ● В наличии
                </div>

                {/* ИНФОРМАЦИЯ */}
                <div className="bg-zinc-900 p-6">
                  <h3 className="text-xl font-bold leading-7 text-white">
                    {car.name}
                  </h3>

                  {/* ЦЕНА */}
                  <div className="mt-4 text-3xl font-extrabold text-[#2EF2D0]">
                    {car.price.toLocaleString("ru-RU")} ₽
                  </div>

                  {/* AVITO */}
                  <a
                    href={car.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 block rounded-xl bg-[#2EF2D0] py-3 text-center font-semibold text-black transition hover:bg-[#39FFD8] hover:shadow-[0_0_25px_rgba(46,242,208,0.6)]"
                  >
                    Смотреть на Авито
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Автомобилей нет */}
        {!loading && !error && cars.length === 0 && (
          <div className="rounded-2xl border border-zinc-700 bg-zinc-900 p-8 text-center text-zinc-300">
            Сейчас автомобилей в наличии нет.
          </div>
        )}
      </div>
    </section>
  );
}