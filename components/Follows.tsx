"use client";
import { CardPokemon } from "@/components/ui/Card";
import { useFollowPokemonStore } from "@/store/followsPokemon";
import { PokemonType } from "@/types/pokemon";
import { Spin } from "antd";
import { useSession } from "next-auth/react";
import { Suspense, useEffect } from "react";

export const FollowsList = () => {
  const { data } = useSession();
  const { pokemons, getAllPokemon } = useFollowPokemonStore();
  useEffect(() => {
    data?.user.id && getAllPokemon(data.user.id);
  }, []);
  return (
    <Suspense
      fallback={
        <div className="m-20">
          <Spin tip="Loading" size="large">
            <div className="content" />
          </Spin>
        </div>
      }
    >
      <div className="flex flex-wrap object-contain">
        {pokemons?.map((item: PokemonType, index) => (
          <CardPokemon key={index} cardData={item} />
        ))}
      </div>
    </Suspense>
  );
};
