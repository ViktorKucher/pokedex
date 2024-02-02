"use client";
import { PokemonType } from "@/types/pokemon";
import { ButtonLink } from "./Button";
import { AverageRate } from "../Rate";
import { HeartFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useFollowPokemonStore } from "@/store/followsPokemon";
import { useSession } from "next-auth/react";
import { Image } from "./Image";

export const CardPokemon = ({ cardData }: { cardData: PokemonType }) => {
  const [followPokemon, setFollowPokemon] = useState(false);
  const { data } = useSession();
  const { listFollows, follow, unfollow } = useFollowPokemonStore();
  useEffect(() => {
    if (listFollows && listFollows?.length > 0) {
      const findPokemon = listFollows
        ? listFollows.find((value) => value === cardData.id)
        : null;
      findPokemon && setFollowPokemon(true);
    }
  }, [listFollows,cardData]);

  const onFollow = () => {
    if (data?.user.id) {
      if (!followPokemon) {
        follow(cardData.id, data.user.id);
        setFollowPokemon(true);
      } else {
        unfollow(cardData.id, data.user.id);
        setFollowPokemon(false);
      }
    }
  };
  return (
    <section className="relative w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/6 object-contain ">
      <div className="m-1 border-2  rounded-lg p-2 hover:bg-gray-700 bg-gray-800 border-gray-700">
        <Image
          src={cardData.picture}
          alt="profile"
          style="w-full h-auto"
        />
        <span className="text-center capitalize">{cardData.name}</span>
        <ButtonLink href={`/pokedex/pokemon/${cardData.id}`}>
          More details
        </ButtonLink>
      </div>
      <div className=" flex gap-1 absolute top-2 right-2 ">
        <HeartFilled
          onClick={onFollow}
          style={{ color: followPokemon?"red":'white', fontSize: "30px" }}
        />
        <AverageRate rate={cardData.ratings?.avg} />
      </div>
    </section>
  );
};
