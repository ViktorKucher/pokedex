import { BASE_POKEMON_URL } from "@/constants/default";
import { PokemonType, StatsType } from "@/types/pokemon";
import axios from "axios";

export const getDataPokemon = async (url: string): Promise<PokemonType> => {
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
    picture: dataPokemon.sprites.other['official-artwork'].front_default,
    baseExperience: dataPokemon.base_experience,
    abilities,
    stats,
  };
};

export const getPokemons = async (
  limit: string,
  offset: string
): Promise<PokemonType[]> => {
  const resault = await axios.get(
    `${BASE_POKEMON_URL}pokemon?limit=${limit}&offset=${offset}`
  );
  const data = await resault.data.results;
  const promises = await data.map(
    async (pokemon: { name: string; url: string }) => {
      return await getDataPokemon(pokemon.url);
    }
  );
  return await Promise.all(promises);
};
