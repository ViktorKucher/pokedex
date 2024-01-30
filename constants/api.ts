import axios from "axios";
import { BASE_POKEMON_URL, LOCAL_POKEMON_URL } from "./default";

export const getAllPoremons = async (
  limit: number,
  offset: number,
  user_id: string
) =>
  await axios.get(
    `${LOCAL_POKEMON_URL}all?limit=${limit}&offset=${offset}&user_id=${user_id}`
  );

export const setRate = async (
  pokemon_id: string,
  user_id: string,
  rate: number
) =>
  await axios.put(`${LOCAL_POKEMON_URL}rate`, {
    pokemon_id,
    user_id,
    rate,
  });

export const getPokemonsData = async (limit: number, offset: number) =>
  await axios.get(`${BASE_POKEMON_URL}pokemon?limit=${limit}&offset=${offset}`);

export const getPokemonData = async (searchData: string, user_id?: string) =>
  await axios.get(
    `${LOCAL_POKEMON_URL}?searchData=${searchData}&user_id=${user_id}`
  );

export const getFollowPokemons = async (user_id: string) =>
  await axios.get(
    `${LOCAL_POKEMON_URL}/follow?user_id=${user_id}`
  );
  
export const setFollowPokemons = async (pokemon_id: string, user_id: string) =>
  await axios.put(`${LOCAL_POKEMON_URL}/follow`, {
    pokemon_id,
    user_id,
  });

export const deleteFollowPokemons = async (
  pokemon_id: string,
  user_id: string
) =>
  await axios.delete(
    `${LOCAL_POKEMON_URL}/follow?pokemon_id=${pokemon_id}&user_id=${user_id}`
  );
