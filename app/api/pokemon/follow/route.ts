import { addFollows, deleteFollows, findFollowsPokemon } from "@/services/db";
import { NextResponse } from "next/server";

export async function GET(req: NextResponse) {
  try {
    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get("user_id");
    if (user_id) {
      const pokemons = await findFollowsPokemon(user_id);
      return NextResponse.json({ pokemons }, { status: 200 });
    }
    return NextResponse.json({ message: "Error request" }, { status: 400 });
  } catch {
    return NextResponse.json({ message: "Error server" }, { status: 404 });
  }
}

export async function PUT(req: Request) {
  try {
    const { pokemon_id, user_id } = await req.json();
    const data = await addFollows(user_id, pokemon_id);
    const res = data?.following
    return NextResponse.json(res, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Error server" }, { status: 404 });
  }
}
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get("user_id");
    const pokemon_id = searchParams.get("pokemon_id");
    if (user_id && pokemon_id) {
      const pokemons = await deleteFollows(user_id,pokemon_id);
      return NextResponse.json({ pokemons }, { status: 200 });
    }
    return NextResponse.json({ message: "Error request" }, { status: 400 });
  } catch {
    return NextResponse.json({ message: "Error server" }, { status: 404 });
  }
}
