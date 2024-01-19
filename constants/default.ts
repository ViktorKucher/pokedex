import axios from "axios";

export const EMPTY_STRING = "";

export const MIN_LENGTH_YUP_NAME = 6;

export const MIN_LENGTH_YUP_PASSWORD = 8;

export const GEN_SALT_SIZE = 10;

export const MAX_AGE_NUMBER = 30 * 24 * 60 * 60;

export const UPDATE_AGE_NUMBER = 24 * 60 * 60;

export const ENCODING = "hex";

export const STRATEGY_TOKEN = "jwt";

export const SIZE_TOKEN = 32;

export const POKEMON_API = axios.create({
    baseURL: "https://pokeapi.co/api/v2/",
  });