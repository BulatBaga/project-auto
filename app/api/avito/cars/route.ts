import { NextResponse } from "next/server";
import { getAvitoCars } from "@/lib/avito-cars";

export async function GET() {
  try {
    const cars = await getAvitoCars();

    return NextResponse.json(cars);
  } catch (error) {
    console.error("ОШИБКА AVITO API:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Неизвестная ошибка",
      },
      {
        status: 500,
      }
    );
  }
}