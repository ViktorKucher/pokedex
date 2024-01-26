export type StatsType = {
  hp: number;
  attack: number;
  defense: number;
  "special-attack": number;
  "special-defense": number;
  speed: number;
};
export type PokemonType = {
  id: string;
  name: string;
  types: string[];
  picture: string;
  baseExperience: number;
  abilities: string[];
  stats: StatsType;
  ratings?: { rate?: number; avg?: number };
};
export type PokemonDBType = {
  id: string;
  name: string;
  types: string[];
  picture: string;
  baseExperience: number;
  abilities: string[];
  stats: StatsType;
};

export type PokemonRateType = {
  _id?: string;
  pokemon_id: string;
  ratings: { user_id: string; rate: number }[];
};
