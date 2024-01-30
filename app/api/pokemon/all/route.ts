import { BASE_POKEMON_URL } from "@/constants/default";
import { getAverageRate } from "@/services/db";
import { getDataPokemon } from "@/services/pokemon";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req: NextResponse) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = searchParams.get("limit");
    const offset = searchParams.get("offset");
    const user_id = searchParams.get("user_id");
    if (limit && offset && user_id) {
      const listPokemons = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`)
      const listPokemonsResault = listPokemons.data.results
      const resault = await Promise.all(listPokemonsResault.map(async (item:{name:string,url:string})=>{
        const data = await getDataPokemon(
          `${BASE_POKEMON_URL}pokemon/${item.name}`
        );
        const ratings = await getAverageRate(data.id, user_id);
        return {
          ...data,ratings
        }
      }))
      return NextResponse.json(resault, { status: 200 });
    }
    return NextResponse.json({ message: "Error request" }, { status: 400 });
  } catch {
    return NextResponse.json({ message: "Error server" }, { status: 404 });
  }
}
