import { AuthUser } from "@/types/auth";
import { Collection, MongoClient, WithId } from "mongodb";
const client = new MongoClient(process.env.MONGODB_URI!);
const db = client.db("pokedex");
const userCollection = db.collection<AuthUser>("users");

const connectUserCollection = async (): Promise<Collection<AuthUser>> => {
  await client.connect();
  const db = client.db("pokedex");
  const userCollection = db.collection<AuthUser>("users");
  return userCollection;
};

export const findUserEmail = async (
  email: string
): Promise<WithId<AuthUser> | null> =>
  (await (await connectUserCollection()).findOne({ email })) || null;

export const findUserSocialId = async (
  social_id: string
): Promise<WithId<AuthUser> | null> =>
  (await (await connectUserCollection()).findOne({ social_id })) || null;

export const createUser = async (user: AuthUser): Promise<WithId<AuthUser>> => {
  const userId = (await (await connectUserCollection()).insertOne(user))
    .insertedId;
  return {
    _id: userId,
    ...user,
  };
};
