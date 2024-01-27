import {
  deleteFollowPokemons,
  getFollowPokemons,
  getPokemonData,
  setFollowPokemons,
} from "@/constants/api";
import { PokemonType } from "@/types/pokemon";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type FollowPokemonStore = {
  isloading: boolean;
  listFollows?: string[];
  pokemons?: PokemonType[];
  initFollowPokemons: (user_id: string) => Promise<any>;
  follow: (pokemon_id: string, user_id: string) => Promise<void>;
  unfollow: (pokemon_id: string, user_id: string) => Promise<void>;
  getAllPokemon:(user_id: string) => Promise<void>;
};

export const useFollowPokemonStore = create<
  FollowPokemonStore,
  [["zustand/persist", unknown]]
>(
  persist(
    (set, get) => ({
      isloading: false,
      follow: async (pokemon_id: string, user_id: string) => {
        set({ isloading: false });
        const listFollows = await setFollowPokemons(pokemon_id, user_id);
        set({ listFollows: listFollows.data, isloading: true });
      },
      unfollow: async (pokemon_id: string, user_id: string) => {
        set({ isloading: false });
        const listFollows = await deleteFollowPokemons(pokemon_id, user_id);
        set({
          listFollows: listFollows.data.pokemons.following,
          isloading: true,
        });
      },
      initFollowPokemons: async (user_id) => {
        const listFollows = await getFollowPokemons(user_id);
        set({
          listFollows: listFollows.data.pokemons
            ? listFollows.data.pokemons.following
            : [],
        });
      },
      getAllPokemon: async (user_id) => {
        const list = get().listFollows;
        if (list?.length) {
          const pokemons = await Promise.all(
            list.map(async (item: string) => {
              const pokemon = await getPokemonData(item, user_id);
              return pokemon.data.pokemon;
            })
          );
          set({ pokemons });
        }
      },
    }),
    {
      name: "follows",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    }
  )
);
