import { PokemonType } from "@/types/pokemon";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getPokemonData, setRate } from "@/constants/api";

export const useDataPokemon = (id: string) => {
  const { data } = useSession();
  const [pokemonData, setPokemonData] = useState<PokemonType>();
  const [isloading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(false);
    getPokemonData(id, data?.user.id)
      .then((res) => {
        setPokemonData(res.data.pokemon);
        setLoading(true);
      })
      .catch(() => {
        setLoading(true);
      });
  }, [id, data?.user.id]);
  
  const setRarings = async (
    pokemon_id: string,
    user_id: string,
    rate: number
  ) => {
    if (pokemonData) {
      const ratings = await setRate(pokemon_id, user_id, rate);
      setPokemonData((prev) => {
        if (prev) {
          return { ...prev, ratings: ratings.data };
        }
      });
    }
  };
  return { pokemonData, isloading, setRarings };
};
