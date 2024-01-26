import { setRate } from "@/constants/api";
import { PokemonRateType, PokemonType } from "@/types/pokemon";
import { WithId } from "mongodb";

export const findAverageRate = (
    res: WithId<PokemonRateType>,
    user_id: string
  ) => {
    const ratings = res.ratings.map((item) => item.rate);
    const sum = ratings.reduce((sum, current) => sum + current);
    const rate = res.ratings.find((value) => value.user_id === user_id)?.rate;
    return { rate, avg: sum / ratings.length };
  };
  export const findIndexRate = (
    ratings: {
      user_id: string;
      rate: number;
    }[],
    user_id: string
  ) => ratings.findIndex((item) => item.user_id == user_id);
  
  export const changeRate = async (pokemons:PokemonType[],pokemon_id:string,user_id:string,rate:number)=>{
    const ratings = await setRate(pokemon_id,user_id,rate)
    return pokemons?.map((item) => {
      if ((item.id = pokemon_id)) {
        item.ratings = ratings.data;
      }
      return item;
    })
  }