"use client";
import { PokemonType } from "@/types/pokemon";
import { CardPokemon } from "../../ui/Card";
import { Loader } from "../../ui/Loader";
import { useListPokemons } from "@/hooks/usePokemon";
import { FilledBox } from "@/components/ui/FilledBox";

export const ListPokemons = () => {
  const { isloading, pokemons } = useListPokemons();
  if (!isloading) {
    return <Loader />;
  }
  if (pokemons?.length === 0) {
    return (
      <div>
        <FilledBox />
      </div>
    );
  }
  return (
    <div className="flex flex-wrap object-contain">
      {pokemons?.map((item: PokemonType, index) => (
        <CardPokemon key={index} cardData={item} />
      ))}
    </div>
  );
};
