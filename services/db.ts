import { AuthUser } from "@/types/auth";
import { Collection, MongoClient, WithId } from "mongodb";
const client = new MongoClient(process.env.MONGODB_URI!);

const connectUserCollection = async (): Promise<Collection<AuthUser>> => {
  await client.connect();
  console.log("connection database")
  const db = client.db("pokedex");
  return db.collection<AuthUser>("users");
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
