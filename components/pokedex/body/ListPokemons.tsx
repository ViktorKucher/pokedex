import { PokemonType } from "@/types/pokemon";
import { CardPokemon } from "../../ui/Card";
import { Loader } from "../../ui/Loader";
import { useListPokemons } from "@/hooks/usePokemon";

export const ListPokemons = () => {
  const {isloading,pokemons} = useListPokemons()
  return (
    <div className="flex flex-wrap object-contain">
      {isloading ? (
        pokemons?.map((item: PokemonType, index) => {
          return <CardPokemon key={index} data={item} />;
        })
      ) : (
        <Loader />
      )}
    </div>
  );
};
