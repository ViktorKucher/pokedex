import { getPokemons } from "@/services/pokemon";
import { NextResponse } from "next/server";

export async function GET(req: NextResponse) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = searchParams.get("limit");
    const offset = searchParams.get("offset");
    const user_id = searchParams.get("user_id");
    if (limit && offset && user_id) {
      const pokemons = await getPokemons(+limit, +offset, user_id);
      return NextResponse.json({ pokemons }, { status: 200 });
    }
    return NextResponse.json({ message: "Error request" }, { status: 400 });
  } catch {
    return NextResponse.json({ message: "Error server" }, { status: 404 });
  }
}
