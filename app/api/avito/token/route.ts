import { NextResponse } from "next/server";
import { getAvitoToken } from "@/lib/avito";

export async function GET() {
  try {
    const token = await getAvitoToken();
    return NextResponse.json(token);
  } catch (e) {
    return NextResponse.json(
      { error: String(e) },
      { status: 500 }
    );
  }
}