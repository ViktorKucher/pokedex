import { PokemonType } from "@/types/pokemon";
import Image from "next/image";
import { ButtonLink } from "./Button";

export const CardPokemon = ({data}:{data: PokemonType}) => {
  return (
    <div className="relative w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/6 object-contain ">
      <div className="m-1 border-2 border-gray-200 rounded-lg p-2 dark:hover:bg-gray-700 dark:bg-gray-800 dark:border-gray-700">
        <Image
          src={data.picture}
          alt="profile" 
          width="0"
          height="0"
          sizes="100vw"
          className="w-full h-auto"
          loading="lazy"
        />
        <p className="text-center capitalize">{data.name}</p>
        <ButtonLink href={`/pokedex/pokemon/${data.id}`}>More details</ButtonLink>
      </div>
    </div>
  );
};
