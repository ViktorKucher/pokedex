"use client";
import { Datails } from "@/components/info/Datails";
import { MainInfo } from "@/components/info/MainInfo";
import { ButtonLink } from "@/components/ui/Button";
import { FilledBox } from "@/components/ui/FilledBox";
import { Loader } from "@/components/ui/Loader";
import { useDataPokemon } from "@/hooks/usePokemon";
import { useSession } from "next-auth/react";

const PokemonInfo = ({ params }: { params: { id: string } }) => {
  const { data } = useSession();
  const { pokemonData, isloading,setRarings } = useDataPokemon(params.id);
  const onChangeRate = (rate: number) => {
    data?.user && setRarings(params.id, data.user.id, rate);
  };
  if (!isloading) {
    return <Loader typeLoading="fullPage" />;
  }
  if (!pokemonData) {
    return <FilledBox />;
  }
  return (
    pokemonData && (
      <div className="flex flex-wrap md:justify-center content-center h-full md:h-screen sm:gap-3 p-2  dark:bg-gray-800">
        <ButtonLink href="/pokedex" style="w-28">
          Return
        </ButtonLink>
        <MainInfo onChangeRate={onChangeRate} pokemonData={pokemonData} />
        <Datails
          types={pokemonData.types}
          abilities={pokemonData.abilities}
          stats={pokemonData.stats}
        />
      </div>
    )
  );
};
export default PokemonInfo;
