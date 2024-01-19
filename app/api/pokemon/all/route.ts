import { getPokemons } from "@/services/pokemon";
import { NextResponse } from "next/server";

export async function GET(req: NextResponse) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = searchParams.get("limit");
    const offset = searchParams.get("offset");
    if (limit && offset) {
      const resaults = await getPokemons(limit, offset);
      return NextResponse.json({pokemons:resaults},{status:200});
    }
    return NextResponse.json({ message: "Error request" }, { status: 400 });
  } catch {
    return NextResponse.json({ message: "Error server" }, { status: 404 });
  }
}
