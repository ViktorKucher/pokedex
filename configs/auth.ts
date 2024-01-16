import {
  FacebookProfile,
  LoginAuthorize,
  RegistrationAuthorize,
  User,
} from "@/types/auth";
import { randomBytes, randomUUID } from "crypto";
import type { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { authAuthorization, login, registration } from "@/services/auth";
import {ENCODING, MAX_AGE_NUMBER, SIZE_TOKEN, STRATEGY_TOKEN, UPDATE_AGE_NUMBER} from "@/constants/default";

export const authConfig: AuthOptions = {
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
      profile(profile: FacebookProfile) {
        return {
          id: profile.id,
          name: profile.name,
          image: profile.picture.data.url,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    Credentials({
      id: "login",
      name: "login",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        const { email, password } = credentials as LoginAuthorize;
        const result = await login(email, password);
        if (result.data["message" as keyof typeof result.data]) {
          throw new Error(result.data["message" as keyof typeof result.data]);
        }
        return result.data as User;
      },
    }),
    Credentials({
      id: "registration",
      name: "registration",
      credentials: {
        name: { label: "Username", type: "text", placeholder: "Name" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
        email: { label: "Email", type: "email", placeholder: "Email" },
      },
      async authorize(credentials) {
        const { name, password, email } = credentials as RegistrationAuthorize;
        const result = await registration(email, password, name);
        if (result.data["message" as keyof typeof result.data]) {
          throw new Error(result.data["message" as keyof typeof result.data]);
        }
        return result.data as User;
      },
    }),
  ],
  session: {
    strategy: STRATEGY_TOKEN,
    maxAge: MAX_AGE_NUMBER,
    updateAge: UPDATE_AGE_NUMBER,
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(SIZE_TOKEN).toString(ENCODING);
    },
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        if (account?.type === "oauth" && account?.provider) {
          const { id, name, image, email } = user;
          const socialUser = await authAuthorization(account.provider, {
            id,
            email,
            name,
            image,
          });
          if (socialUser) {
            token.user = socialUser;
          }
        } else {
          token.user = user;
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as User;
      return session;
    },
  },
};
