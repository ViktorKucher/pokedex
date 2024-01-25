import { getAllPoremons } from "@/constants/api";
import { changeRate } from "@/functions/rate";
import { PokemonType } from "@/types/pokemon";
import { create } from "zustand";

type PokemonStore = {
  isloading: boolean;
  limit: number;
  offset: number;
  pokemons?: PokemonType[];
  initPokemons: (user_id: string) => Promise<void>;
  updateOffset: (offset: number) => void;
  updateLimit: (limit: number) => void;
  setRarings: (pokemon_id: string, user_id: string, rate: number) => void;
};

export const usePokemonStore = create<PokemonStore>((set, get) => ({
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
  initPokemons: async (user_id: string) => {
    set({ isloading: false });
    const res = await getAllPoremons(get().limit, get().offset, user_id);
    set({ pokemons: res.data.pokemons, isloading: true });
  },
}));
