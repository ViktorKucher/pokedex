import  {DefaultSession} from "next-auth";
import { User } from "./auth";

declare module "next-auth" {
  interface Session {
    user: User & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    signingKey?: string
  }
}
