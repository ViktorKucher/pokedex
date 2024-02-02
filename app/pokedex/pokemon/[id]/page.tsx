"use client";
import { Datails } from "@/components/info/Datails";
import { MainInfo } from "@/components/info/MainInfo";
import { Header } from "@/components/pokedex/header/Header";
import { FilledBox } from "@/components/ui/FilledBox";
import { useDataPokemon } from "@/hooks/usePokemon";
import { Spin } from "antd";
import { useSession } from "next-auth/react";

const PokemonInfo = ({ params }: { params: { id: string } }) => {
  const { data } = useSession();
  const { pokemonData, isloading, setRarings } = useDataPokemon(params.id);
  const onChangeRate = (rate: number) => {
    data?.user && setRarings(params.id, data.user.id, rate);
  };
  if (!isloading) {
    return (
      <div className="flex justify-center items-center min-h-screen min-w-screen text-center">
        <Spin size="large"></Spin>
      </div>
    );
  }
  if (!pokemonData) {
    return <FilledBox />;
  }
  return (
    <div className="min-h-screen min-w-screen">
      <Header />
      {pokemonData && (
        <div className="flex flex-wrap content-center sm:gap-3 px-6 text-black dark:text-white">
          <MainInfo onChangeRate={onChangeRate} pokemonData={pokemonData} />
          <Datails
            types={pokemonData.types}
            abilities={pokemonData.abilities}
            stats={pokemonData.stats}
          />
        </div>
      )}
    </div>
  );
};
export default PokemonInfo;
