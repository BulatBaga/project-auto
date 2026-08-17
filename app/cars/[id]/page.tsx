import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAvitoCars } from "@/lib/avito-cars";

type Car = {
  id: number;
  title: string;
  price: number;
  url: string;
  address?: string;
  status?: string;
};
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const data = await getAvitoCars();
    const cars: Car[] = data.resources ?? [];

    const car = cars.find(
      (item) => String(item.id) === String(id)
    );

    if (!car) {
      return {
        title: "Автомобиль не найден | Автосалон БАЗА",
        description:
          "Автомобиль не найден в каталоге Автосалона БАЗА.",
      };
    }

    const title = `${car.title} — купить в Уфе | Автосалон БАЗА`;

    const description = [
      `${car.title}.`,
      `${car.price.toLocaleString("ru-RU")} ₽.`,
      car.address ? `${car.address}.` : "",
      "Проверенный автомобиль с пробегом в Автосалоне БАЗА.",
    ]
      .filter(Boolean)
      .join(" ");

    return {
      title,
      description,
      alternates: {
        canonical: `https://автосалон-база.рф/cars/${car.id}`,
      },
      openGraph: {
        title,
        description,
        url: `https://автосалон-база.рф/cars/${car.id}`,
        type: "website",
        locale: "ru_RU",
        siteName: "Автосалон БАЗА",
      },
    };
  } catch (error) {
    console.error("Ошибка SEO автомобиля:", error);

    return {
      title: "Автомобиль с пробегом | Автосалон БАЗА",
      description:
        "Автомобили с пробегом в Уфе — Автосалон БАЗА.",
    };
  }
}

export default async function CarPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    const data = await getAvitoCars();

    const cars: Car[] = data.resources ?? [];

    const car = cars.find(
      (item) => String(item.id) === String(id)
    );

    if (!car) {
      notFound();
    }

    return (
      <main className="max-w-7xl mx-auto p-8">
        <div className="grid gap-8 md:grid-cols-2">

          <div className="rounded-2xl overflow-hidden shadow-lg bg-white">
            <img
              src={`/api/car-image/${car.id}`}
              alt={car.title}
              className="w-full h-[400px] object-cover"
            />
          </div>

          <div>
            <h1 className="text-4xl font-bold mb-6">
              {car.title}
            </h1>

            <div className="text-3xl text-blue-600 font-bold mb-4">
              {car.price.toLocaleString("ru-RU")} ₽
            </div>

            {car.address && (
              <p className="text-gray-500 mb-4">
                {car.address}
              </p>
            )}

            <a
              href={car.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 block text-center bg-blue-600 text-white rounded-xl py-4 hover:bg-blue-700"
            >
              Посмотреть объявление на Авито
            </a>
          </div>

        </div>
      </main>
    );
  } catch (error) {
    console.error("Ошибка страницы автомобиля:", error);

    throw new Error("Не удалось загрузить автомобиль");
  }
}