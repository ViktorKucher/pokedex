import { StatsType } from "@/types/pokemon";
import { Abilities} from "./Abilities";
import { StatsPokemon } from "./Stats";
import { Types } from "./Types";

export const Datails = ({types,abilities,stats}:{types:string[],abilities:string[],stats:StatsType}) => (
  <div className="flex flex-col">
    <Types list={types} />
    <Abilities list={abilities} />
    <StatsPokemon stats={stats} />
  </div>
);
