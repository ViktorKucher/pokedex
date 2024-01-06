import { LoginAuthorize, RegistrationAuthorize } from "@/types/auth";
import { randomBytes, randomUUID } from "crypto";
import type { AuthOptions, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

export const authConfig: AuthOptions = {
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    Credentials({
      id:'login',
      name: "login",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Name" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials, req) {
        const { username, password } = credentials as LoginAuthorize;
        console.log({ id: "1", username, password })
        const data = { id: "1", username, password }
        return data as User ;
      },
    }),
    Credentials({
      id:'registration',
      name: "registration",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Name" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
        email: { label: "Email", type: "email", placeholder: "Email" },
      },
      async authorize(credentials, req) {
        const { username, password, email } = credentials as RegistrationAuthorize;
        const data = { id: "1", username, password,email}
        return data as User ;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString("hex")
    }
  },
  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
};
