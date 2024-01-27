import { getAllPoremons, getPokemonData } from "@/constants/api";
import { changeRate } from "@/functions/rate";
import { PokemonType } from "@/types/pokemon";
import { Axios, AxiosError } from "axios";
import { toast } from "sonner";
import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'

type PokemonStore = {
  isloading: boolean;
  limit: number;
  offset: number;
  pokemons?: PokemonType[];
  initPokemons: (user_id: string) => Promise<void>;
  updateOffset: (offset: number) => void;
  updateLimit: (limit: number) => void;
  setRarings: (pokemon_id: string, user_id: string, rate: number) => void;
  findPokemon:(pokemonName: string,user_id:string) => Promise<void>;
};

export const usePokemonStore = create<PokemonStore,[["zustand/persist", unknown]]>(
  persist(
    (set, get) => ({
      isloading: false,
      limit: 5,
      offset: 0,
      updateLimit: (limit) => set({ limit, offset: 0 }),
      updateOffset: (offset) => set({ offset }),
      setRarings: async (pokemon_id, user_id, rate) => {
        const pokemonList = get().pokemons;
        if (pokemonList) {
          const pokemons = await changeRate(pokemonList, pokemon_id, user_id, rate);
          set({ pokemons });
        }
      },
      findPokemon:async (pokemonName:string,user_id:string) => {
        set({ isloading: false });
        await getPokemonData(pokemonName,user_id).then((res)=>{
          set({ pokemons: [res.data.pokemon], isloading: true });
        }).catch((e:AxiosError)=>{
          toast.error(e.message);
          set({ pokemons: [], isloading: true });
          set({ isloading: true });
        })
      },
      initPokemons: async (user_id: string) => {
        set({ isloading: false });
        const res = await getAllPoremons(get().limit, get().offset, user_id);
        set({ pokemons: res.data.pokemons, isloading: true });
      },
    }),
    {
      name: 'pokemons',
      storage: createJSONStorage(() => localStorage),
      skipHydration:true
    },
  ),
);

