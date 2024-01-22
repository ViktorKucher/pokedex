import { PokemonType } from "@/types/pokemon";
import axios from "axios";
import { create } from "zustand";

type PokemonStore = {
    isloading:boolean,
    limit:number,
    offset:number
    pokemons?:PokemonType[],
    initPokemons:VoidFunction,
    updateOffset:(offset:number)=>void
    updateLimit:(limit:number)=>void
}

export const usePokemonStore = create<PokemonStore>((set,get)=>({
    isloading:false,
    limit:5,
    offset:0,
    updateLimit:(limit)=>set({limit}),
    updateOffset:(offset)=>set({offset}),
    initPokemons:async ()=> {
        set({isloading:false})
        const pokemons = await axios.get(`/api/pokemon/all?limit=${get().limit}&offset=${get().offset}`)
        console.log(pokemons.data.pokemons)
        set({pokemons:pokemons.data.pokemons,isloading:true})
    }
}));
