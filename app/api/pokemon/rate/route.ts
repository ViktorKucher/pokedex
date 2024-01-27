import { getAverageRate } from "@/services/db";
import { updateRate } from "@/services/pokemon";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const { pokemon_id, user_id, rate } = await req.json();
    await updateRate(pokemon_id, user_id, +rate);
    const data = await getAverageRate(pokemon_id, user_id);
    return NextResponse.json(data, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Error server" }, { status: 404 });
  }
}
