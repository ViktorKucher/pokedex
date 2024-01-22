'use client'
import { usePokemonStore } from '@/store/pokemon';
import { useRouter } from 'next/router';

const PokemonInfo = ({params}:{params:{id:string}}) => {
    const {pokemons} = usePokemonStore((state) => state);
    const pokemonData = pokemons?.find((item)=>item.id=params.id)
  return (
    <div>
      Details:{JSON.stringify(pokemonData)}
    </div>
  );
};
export default PokemonInfo;