"use client";
import { AverageRate } from "@/components/Rate";
import { FilledBox } from "@/components/ui/FilledBox";
import { Loader } from "@/components/ui/Loader";
import { listStyleType } from "@/constants/list";
import { useDataPokemon } from "@/hooks/usePokemon";
import { Rate } from "antd";
import { useSession } from "next-auth/react";
import Image from "next/image";

const PokemonInfo = ({ params }: { params: { id: string } }) => {
  const { data } = useSession();
  const { pokemonData, isloading, setRarings } = useDataPokemon(params.id);
  const onChangeRate = (rate: number) => {
    data?.user && setRarings(params.id, data.user.id, rate);
  };
  if (!isloading) {
    return <Loader typeLoading="fullPage" />;
  }
  if(!pokemonData){
    return <FilledBox/>
  }
  return (
    pokemonData && (
      <div className="flex flex-wrap sm:justify-center content-center h-screen sm:gap-3 p-2  dark:bg-gray-800">
        <div>
          <Image
            src={pokemonData.picture}
            alt="profile"
            width="0"
            height="0"
            sizes="100vw"
            className="w-full sm:w-72 h-auto"
            loading="lazy"
          />
          <p className="capitalize">
            #{pokemonData.id} {pokemonData.name}{" "}
          </p>
          <div>
            Rate :
            <Rate
              allowHalf
              defaultValue={pokemonData.ratings?.rate}
              onChange={onChangeRate}
            />
          </div>
          <div className="flex">Average rate :<AverageRate rate={pokemonData.ratings?.avg} /></div>
        </div>
        <div className="fle flex-col">
          {pokemonData.types.length && (
            <div className="flex flex-col gap-2">
              <div>Types: </div>
              <div className="flex flex-row gap-2">
                {pokemonData.types.map((item, index) => {
                  const color = listStyleType[item as keyof typeof listStyleType]
                  return (
                    <div
                      className={`p-1 rounded-lg ${color}`}
                      key={index}
                    >
                      {item}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {pokemonData.abilities.length && (
            <div className="flex flex-row gap-2 my-3">
              <div>Abilities: </div>
              {pokemonData.abilities.map((item, index) => {
                return <div key={index}>{item}</div>;
              })}
            </div>
          )}
          <div className="bg-blue-600 rounded-md p-2 uppercase">
            <div>Stats</div>
            <div>hp: {pokemonData.stats.hp}</div>
            <div>attack: {pokemonData.stats.attack}</div>
            <div>defense: {pokemonData.stats.defense}</div>
            <div>speed: {pokemonData.stats.speed}</div>
            <div>special attack: {pokemonData.stats["special-attack"]}</div>
            <div>special defense: {pokemonData.stats["special-defense"]}</div>
          </div>
        </div>
      </div>
    )
  );
};
export default PokemonInfo;
