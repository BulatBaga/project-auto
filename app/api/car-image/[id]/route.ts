import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const dir = path.join(
    process.cwd(),
    "public",
    "cars",
    id
  );

  // Ищем фотографии в папке автомобиля
  if (fs.existsSync(dir)) {
    const images = fs
      .readdirSync(dir)
      .filter((file) =>
        /\.(jpg|jpeg|png|webp)$/i.test(file)
      )
      .sort();

    // Если нашли фотографию
    if (images.length > 0) {
      const fileName = images[0];
      const filePath = path.join(dir, fileName);

      const file = fs.readFileSync(filePath);

      let contentType = "image/jpeg";

      if (fileName.toLowerCase().endsWith(".png")) {
        contentType = "image/png";
      }

      if (fileName.toLowerCase().endsWith(".webp")) {
        contentType = "image/webp";
      }

      return new NextResponse(file, {
        headers: {
          "Content-Type": contentType,
          "Cache-Control": "no-store",
        },
      });
    }
  }

  // Если фотографий нет — no-image
  const fallbackPath = path.join(
    process.cwd(),
    "public",
    "cars",
    "no-image.jpg"
  );

  const fallback = fs.readFileSync(fallbackPath);

  return new NextResponse(fallback, {
    headers: {
      "Content-Type": "image/jpeg",
      "Cache-Control": "no-store",
    },
  });
}