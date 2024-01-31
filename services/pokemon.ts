import { PokemonDBType, PokemonType, StatsType } from "@/types/pokemon";
import axios from "axios";
import {
  connectPokemonCollection,
  createPokemon,
  getAverageRate,
  updateRatePokemon,
} from "./db";
import { getPokemonsData } from "@/constants/api";

export const getDataPokemon = async (url: string): Promise<PokemonDBType> => {
  const res = await axios.get(url);
  const dataPokemon = await res.data;
  const types = dataPokemon.types.map(
    ({ type }: { type: { name: string } }) => type.name
  );
  const abilities = dataPokemon.abilities.map(
    ({ ability }: { ability: { name: string } }) => ability.name
  );
  const stats = Object.fromEntries(
    dataPokemon.stats.map(
      ({ base_stat, stat }: { base_stat: string; stat: { name: string } }) => [
        stat.name,
        base_stat,
      ]
    )
  ) as StatsType;
  return {
    id: dataPokemon.id,
    name: dataPokemon.name,
    types,
    picture: dataPokemon.sprites.other["home"].front_default,
    baseExperience: dataPokemon.base_experience,
    abilities,
    stats,
  };
};

export const getPokemons = async (
  limit: number,
  offset: number,
  user_id: string
): Promise<PokemonType[]> => {
  const resault = await getPokemonsData(limit, offset);
  const data = await resault.data.results;
  const promises = await data.map(
    async (pokemon: { name: string; url: string }) => {
      const data = await getDataPokemon(pokemon.url);
      const ratings = await getAverageRate(data.id, user_id);
      return {
        ...data,
        ratings,
      } as PokemonType;
    }
  );
  return await Promise.all(promises);
};

export const updateRate = async (
  pokemon_id: string,
  user_id: string,
  rate: number
) => {
  const foundPokemon = await (
    await connectPokemonCollection()
  ).findOne({ pokemon_id: pokemon_id.toString() });
  if (foundPokemon) {
    await updateRatePokemon(foundPokemon, user_id, rate);
  } else {
    await createPokemon({ pokemon_id, ratings: [{ user_id, rate }] });
  }
};
