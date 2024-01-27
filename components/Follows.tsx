"use client";

import { Header } from "@/components/pokedex/header/Header";
import { CardPokemon } from "@/components/ui/Card";
import { Title } from "@/components/ui/Title";
import { useFollowPokemonStore } from "@/store/followsPokemon";
import { PokemonType } from "@/types/pokemon";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export const FollowsList =()=> {
  const { data } = useSession();
  const { pokemons, getAllPokemon } = useFollowPokemonStore();
  useEffect(() => {
    data?.user.id && getAllPokemon(data.user.id);
  }, []);
  return (
      <div className="flex flex-wrap object-contain">
        {pokemons?.map((item: PokemonType, index) => (
          <CardPokemon key={index} cardData={item} />
        ))}
      </div>
  );
}
