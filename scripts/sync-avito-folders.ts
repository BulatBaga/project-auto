import fs from "fs";
import path from "path";
import { getAvitoCars } from "../lib/avito-cars";
if (fs.existsSync(".env.local")) {
  process.loadEnvFile(".env.local");
}

const CARS_DIR = path.join(process.cwd(), "public", "cars");

// 48 часов
const DELETE_AFTER_MS = 48 * 60 * 60 * 1000;

const LAST_SEEN_FILE = ".avito-last-seen";

async function syncAvitoFolders() {
  console.log("🚗 Синхронизация автомобилей Avito...\n");

  try {
    const data = await getAvitoCars();

    const cars = data.resources ?? [];

    console.log(`Найдено автомобилей: ${cars.length}\n`);

    // ID автомобилей, которые сейчас есть на Avito
    const activeIds = new Set(
      cars.map((car: any) => String(car.id))
    );

    // Убеждаемся, что основная папка существует
    if (!fs.existsSync(CARS_DIR)) {
      fs.mkdirSync(CARS_DIR, { recursive: true });
    }

    let created = 0;
    let existing = 0;
    let deleted = 0;

    /*
     * 1. Обрабатываем автомобили, которые сейчас есть на Avito
     */
    for (const car of cars) {
      const id = String(car.id);

      const carDir = path.join(CARS_DIR, id);

      // Если папки нет — создаём
      if (!fs.existsSync(carDir)) {
        fs.mkdirSync(carDir, { recursive: true });

        console.log(`📁 Создана папка: public/cars/${id}`);

        created++;
      } else {
        existing++;
      }

      // Обновляем время последнего появления автомобиля
      const lastSeenPath = path.join(
        carDir,
        LAST_SEEN_FILE
      );

      fs.writeFileSync(
        lastSeenPath,
        new Date().toISOString(),
        "utf8"
      );
    }

    /*
     * 2. Проверяем старые папки
     */
    const folders = fs
      .readdirSync(CARS_DIR, { withFileTypes: true })
      .filter((entry) => entry.isDirectory());

    const now = Date.now();

    for (const folder of folders) {
      const id = folder.name;

      // Машина сейчас есть на Avito — ничего не удаляем
      if (activeIds.has(id)) {
        continue;
      }

      const carDir = path.join(CARS_DIR, id);

      const lastSeenPath = path.join(
        carDir,
        LAST_SEEN_FILE
      );

      /*
       * Если папка старая и в ней ещё нет
       * служебного файла — даём ей 48 часов.
       */
      if (!fs.existsSync(lastSeenPath)) {
        fs.writeFileSync(
          lastSeenPath,
          new Date().toISOString(),
          "utf8"
        );

        console.log(
          `⏳ ${id}: машина пока не найдена на Avito, начался отсчёт 48 часов`
        );

        continue;
      }

      const lastSeenText = fs
        .readFileSync(lastSeenPath, "utf8")
        .trim();

      const lastSeen = new Date(lastSeenText).getTime();

      // Если дата повреждена — не удаляем папку
      if (Number.isNaN(lastSeen)) {
        console.log(
          `⚠️ ${id}: некорректная дата, папка сохранена`
        );

        continue;
      }

      const elapsed = now - lastSeen;

      // Ещё не прошло 48 часов
      if (elapsed < DELETE_AFTER_MS) {
        const hoursLeft = Math.ceil(
          (DELETE_AFTER_MS - elapsed) / (60 * 60 * 1000)
        );

        console.log(
          `⏳ ${id}: отсутствует на Avito, до удаления примерно ${hoursLeft} ч.`
        );

        continue;
      }

      /*
       * Прошло больше 48 часов —
       * удаляем всю папку автомобиля.
       */
      fs.rmSync(carDir, {
        recursive: true,
        force: true,
      });

      console.log(
        `🗑️ Удалена папка ${id}: автомобиль отсутствует на Avito более 48 часов`
      );

      deleted++;
    }

    console.log("\n✅ Синхронизация завершена");
    console.log(`📁 Новых папок создано: ${created}`);
    console.log(`📂 Уже существовало: ${existing}`);
    console.log(`🗑️ Удалено старых папок: ${deleted}`);
  } catch (error) {
    console.error("\n❌ Ошибка синхронизации:");

    console.error(
      error instanceof Error
        ? error.message
        : error
    );

    process.exit(1);
  }
}

syncAvitoFolders();