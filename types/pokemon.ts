export type StatsType = {
  hp: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
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
};
