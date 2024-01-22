import { BASE_POKEMON_URL } from "@/constants/default";
import { getDataPokemon } from "@/services/pokemon";
import { NextResponse } from "next/server";

export async function GET(req: NextResponse) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (id) {
      const resault = await getDataPokemon(`${BASE_POKEMON_URL}pokemon/${id}`);
      return NextResponse.json({pokemon:resault},{status:200});
    }
    return NextResponse.json({ message: "Error request" }, { status: 400 });
  } catch {
    return NextResponse.json({ message: "Error server" }, { status: 404 });
  }
}