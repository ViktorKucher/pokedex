import { usePokemonStore } from "@/store/pokemon";
import { PokemonType } from "@/types/pokemon";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export const useListPokemons = () => {
  const { data } = useSession();
  const list = usePokemonStore((state) => state);
  const initPokemons = list.initPokemons;
  useEffect(() => {
    data && initPokemons(data?.user.id);
  }, [initPokemons,list.limit,list.offset, data]);
  return list;
};

export const useDataPokemon = (id: string) => {
  const [pokemonData, setPokemonData] = useState<PokemonType>();
  const [isloading, setLoading] = useState(false);
  const { pokemons, setRarings } = useListPokemons();
  useEffect(() => {
    if (!pokemons) return;
    const pokemon = pokemons.find((value) => value.id == id);
    if (
      pokemonData?.id != id ||
      pokemonData?.ratings != pokemon?.ratings
    ) {
      setLoading(false);
      setPokemonData(pokemon);
    } else {
      setLoading(true);
    }
  }, [pokemonData, id, pokemons]);
  return { pokemonData, isloading, setRarings };
};
