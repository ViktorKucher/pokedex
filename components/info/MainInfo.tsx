import Imagef from "next/image";
import { Rate } from "antd";
import { AverageRate } from "../Rate";
import { PokemonType } from "@/types/pokemon";
import { Image } from "../ui/Image";

export const MainInfo = ({
  onChangeRate,
  pokemonData,
}: {
  onChangeRate: (rate: number) => void;
  pokemonData?: PokemonType;
}) => {
  return (
    pokemonData && (
      <div className="w-full md:w-auto">
        {pokemonData.picture && (
          <Image src={pokemonData.picture} style={'w-full sm:w-72 h-auto'} alt="profile" />
        )}
        <p className="capitalize">
          #{pokemonData.id} {pokemonData.name}{" "}
        </p>
        <div>
          <span>Rate :</span>
          <Rate
            allowHalf
            defaultValue={pokemonData.ratings?.rate}
            onChange={onChangeRate}
          />
        </div>
        <div className="flex">
          <span>Average rate :</span>
          <AverageRate rate={pokemonData.ratings?.avg} />
        </div>
      </div>
    )
  );
};