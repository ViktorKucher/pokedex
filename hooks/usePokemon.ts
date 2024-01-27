import { usePokemonStore } from "@/store/pokemon";
import { PokemonType } from "@/types/pokemon";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useSessionRedirect } from "./useSessionRedirect";

export const useListPokemons = () => {
  const { data } = useSession();
  useEffect(() => {
    usePokemonStore.persist.rehydrate();
  }, []);
  const list = usePokemonStore((state) => state);
  useEffect(() => {
    if (data?.user) {
      list.initPokemons(data?.user.id);
    }
  }, [list.initPokemons, list.limit, list.offset]);
  return list;
};

export const useDataPokemon = (id: string) => {
  const [pokemonData, setPokemonData] = useState<PokemonType>();
  const [isloading, setLoading] = useState(false);
  const { pokemons, setRarings } = useListPokemons();
  useEffect(() => {
    if (!pokemons) return;
    const pokemon = pokemons.find((value) => value.id == id);
    if (pokemonData?.id != id || pokemonData?.ratings != pokemon?.ratings) {
      setLoading(true);
      setPokemonData(pokemon);
    }
  }, [id, pokemons]);
  return { pokemonData, isloading, setRarings };
};
