import { AuthUser } from "@/types/auth";
import { PokemonRateType } from "@/types/pokemon";
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
