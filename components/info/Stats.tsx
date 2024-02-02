type StatsType = {
    hp:number,
    attack:number,
    defense:number,
    speed:number,
    'special-attack':number,
    'special-defense':number
}
export const StatsPokemon = ({stats}:{stats:StatsType}) => (
  <div className="bg-blue-600 rounded-md p-2 uppercase text-white">
    <div>Stats</div>
    <div>hp: {stats.hp}</div>
    <div>attack: {stats.attack}</div>
    <div>defense: {stats.defense}</div>
    <div>speed: {stats.speed}</div>
    <div>special attack: {stats["special-attack"]}</div>
    <div>special defense: {stats["special-defense"]}</div>
  </div>
);
