import { BASE_POKEMON_URL } from "@/constants/default";
import { getAverageRate } from "@/services/db";
import { getDataPokemon } from "@/services/pokemon";
import { NextResponse } from "next/server";

export async function GET(req: NextResponse) {
  try {
    const { searchParams } = new URL(req.url);
    const searchData = searchParams.get("searchData");
    const user_id = searchParams.get("user_id");
    if (searchData && user_id) {
      const data = await getDataPokemon(
        `${BASE_POKEMON_URL}pokemon/${searchData.toLocaleLowerCase()}`
      );
      if(!data){
        return NextResponse.json({ message: "Dont found" }, { status: 400 });
      }
      const ratings = await getAverageRate(data.id, user_id);
      return NextResponse.json(
        {
          pokemon: {
            ...data,
            ratings,
          },
        },
        { status: 200 }
      );
    }
    return NextResponse.json({ message: "Error request" }, { status: 400 });
  } catch {
    return NextResponse.json({ message: "Error server" }, { status: 404 });
  }
}
