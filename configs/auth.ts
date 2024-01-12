import { LoginAuthorize, RegistrationAuthorize, User } from "@/types/auth";
import { randomBytes, randomUUID } from "crypto";
import type { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { authAuthorization, login, registration } from "@/services/auth";

type FacebookProfile = {
  id: string;
  name: string;
  email?: string;
  picture: {
    data: {
      url: string;
    };
  };
};
type GoogleProfile = {
  sub: string;
  name: string;
  email: string;
  picture: string;
};

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
        const resault = await login(email, password);
        if (resault.data["message" as keyof typeof resault.data]) {
          throw new Error(resault.data["message" as keyof typeof resault.data]);
        }
        return resault.data as User;
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
        const resault = await registration(email, password, name);
        if (resault.data["message" as keyof typeof resault.data]) {
          throw new Error(resault.data["message" as keyof typeof resault.data]);
        }
        return resault.data as User;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString("hex");
    },
  },
  callbacks: {
    async jwt({ token, user, account }) {
      console.log("account");
      console.log(account);
      console.log("user");
      console.log(user);
      if (user) {
        if (account?.type=== "oauth" && account?.provider) {
            const { id, name, image, email } = user;
            const socialUser = await authAuthorization(
              account.provider,
              {
                id,
                email,
                name,
                image,
              }
            );
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
      session.user = token.user;
      return session;
    },
  },
};
