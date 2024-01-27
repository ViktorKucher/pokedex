import { AuthUser } from "@/types/auth";
import { FollowPokemons, PokemonRateType } from "@/types/pokemon";
import { findIndexRate, findAverageRate } from "@/functions/rate";
import { Collection, MongoClient, WithId } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI!);

const connectUserCollection = async (): Promise<Collection<AuthUser>> => {
  await client.connect();
  const db = client.db("pokedex");
  return db.collection<AuthUser>("users");
};

export const findUserEmail = async (
  email: string
): Promise<WithId<AuthUser> | null> =>
  await (await connectUserCollection()).findOne({ email });

export const findUserSocialId = async (
  social_id: string
): Promise<WithId<AuthUser> | null> =>
  await (await connectUserCollection()).findOne({ social_id });

export const createUser = async (user: AuthUser): Promise<WithId<AuthUser>> => {
  const userId = (await (await connectUserCollection()).insertOne(user))
    .insertedId;
  return {
    _id: userId,
    ...user,
  };
};

export const connectPokemonCollection = async (): Promise<
  Collection<PokemonRateType>
> => {
  await client.connect();
  const db = client.db("pokedex");
  return db.collection<PokemonRateType>("pokemons");
};

export const findPokemon = async (
  pokemon_id: string
): Promise<WithId<PokemonRateType> | null> =>
  await (await connectPokemonCollection()).findOne({ pokemon_id });

export const createPokemon = async (pokemon: PokemonRateType) =>
  await (await connectPokemonCollection()).insertOne(pokemon);

export const updateRatePokemon = async (
  pokemon: PokemonRateType,
  user_id: string,
  rate: number
) => {
  const { pokemon_id, ratings } = pokemon;
  const prevRate = findIndexRate(ratings, user_id);
  prevRate >= 0
    ? (ratings[prevRate] = { user_id, rate })
    : ratings.push({ user_id, rate });
  await (
    await connectPokemonCollection()
  ).updateOne({ pokemon_id }, { $set: { ratings } });
};

export const getAverageRate = async (
  pokemon_id: string,
  user_id: string
): Promise<{ rate?: number; avg?: number } | null> => {
  try {
    const res = await (
      await connectPokemonCollection()
    ).findOne({ pokemon_id: pokemon_id.toString() });
    return res ? findAverageRate(res, user_id) : {};
  } catch {
    return null;
  }
};

const connectFollowCollection = async (): Promise<
  Collection<FollowPokemons>
> => {
  await client.connect();
  const db = client.db("pokedex");
  return db.collection<FollowPokemons>("folows");
};

export const addFollows = async (user_id: string, pokemon_id: string) => {
  const data = await findFollowsPokemon(user_id);
  if (!data) {
    await (
      await connectFollowCollection()
    ).insertOne({ user_id, following: [pokemon_id] });
    return { following: [pokemon_id] };
  }
  if (data && data.following && data.following.length >= 0) {
    const following = [...data.following, pokemon_id];
    await (
      await connectFollowCollection()
    ).updateOne({ user_id }, { $set: { following } });
    return { following };
  }
  
};
export const deleteFollows = async (user_id: string, pokemon_id: string) => {
  const data = await findFollowsPokemon(user_id);
  const following = data?.following?.filter((item) => item != pokemon_id);
  await (
    await connectFollowCollection()
  ).updateOne({ user_id }, { $set: { following } });
  return { following };
};

export const findFollowsPokemon = async (
  user_id: string
): Promise<WithId<FollowPokemons> | null> =>
  await (await connectFollowCollection()).findOne({ user_id });
