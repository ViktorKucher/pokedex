import { AuthUser, NextAuthType, Result, User } from "@/types/auth";
import { createUser, findUserEmail, findUserSocialId } from "./db";
import bcryptjs from "bcryptjs";
import { WithId } from "mongodb";
import {GEN_SALT_SIZE} from "@/constants/default";

export const login = async (
  userEmail: string,
  userPassword: string
): Promise<Result<User>> => {
  const user = await findUserEmail(userEmail);
  if (user) {
    if (!user.password) {
      return {
        data: { message: "This is a social account" },
        status: 400,
      };
    }
    const validPassword = await bcryptjs.compare(userPassword, user.password);
    if (!validPassword) {
      return {
        data: { message: "Wrong password" },
        status: 400,
      };
    }
    const { password, _id, ...data } = user;
    return {
      data: {
        id: _id.toString(),
        ...data,
      },
      status: 200,
    };
  } else {
    return {
      data: { message: "Don't find a user with this email" },
      status: 400,
    };
  }
};

export const registration = async (
  userEmail: string,
  userPassword: string,
  userName: string
): Promise<Result<User>> => {
  const isUser = await findUserEmail(userEmail);
  if (isUser) {
    return {
      data: { message: "User with this email already exists" },
      status: 400,
    };
  }
  const salt = await bcryptjs.genSalt(GEN_SALT_SIZE);
  const hashedPassword = await bcryptjs.hash(userPassword, salt);
  const user = await createUser({
    name: userName,
    email: userEmail,
    password: hashedPassword,
  });
  if (user) {
    return {
      data: {
        id: user._id,
        name: userName,
        email: userEmail,
      },
      status: 200,
    };
  } else {
    return {
      data: {
        message: "Error registration",
      },
      status: 400,
    };
  }
};

export const socialCreateOrFind = async (
  user?: AuthUser | null
): Promise<WithId<AuthUser> | null> => {
  try {
    if (user && user.social_id) {
      const userFound = await findUserSocialId(user.social_id);
      if (userFound) {
        if (userFound.password) return null;
        return userFound;
      }

      return await createUser(user);
    }
    return null;
  } catch {
    return null;
  }
};

export const authAuthorization = async (
  provider: string,
  { id, email, name, image }: NextAuthType
): Promise<User | null> => {
  const socialData = {
    google:
      email && name && image
        ? { social_id: id, name, picture: image, email }
        : null,
    facebook: name && image ? { social_id: id, name, picture: image } : null,
  };
  const socialUser = await socialCreateOrFind(
    socialData[provider as keyof typeof socialData]
  );
  if (socialUser) {
    const { _id, password, ...data } = socialUser;
    return {
      id: _id,
      ...data,
    } as User;
  }
  return null;
};
