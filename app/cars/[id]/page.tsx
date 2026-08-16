type Car = {
  id: number;
  title: string;
  price: number;
  url: string;
  address: string;
status: string;
};

export default async function Home() {
  const res = await fetch("http://localhost:3000/api/avito/cars", {
    cache: "no-store",
  });

  const data = await res.json();

  const cars: Car[] = data.resources ?? [];

  return (
    <main className="max-w-7xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">
        Автомобили в наличии
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

        {cars.map((car) => (
          <div
            key={car.id}
            className="rounded-2xl shadow-lg border overflow-hidden bg-white"
          >
            <img
  src="/cars/no-image.jpg"
  alt={car.title}
  className="h-64 w-full object-cover"
/>

            <div className="p-5">

              <h2 className="font-bold text-xl">
                {car.title}
              </h2>

              <div className="text-2xl text-blue-600 font-bold mt-3">
                {car.price.toLocaleString()} ₽
              </div>
              <p className="mt-2 text-gray-500">
  {car.address}
</p>

              <a
                href={car.url}
                target="_blank"
                className="mt-5 block text-center bg-blue-600 text-white rounded-xl py-3 hover:bg-blue-700"
              >
                Смотреть на Авито
              </a>

            </div>
          </div>
        ))}

      </div>
    </main>
  );
}