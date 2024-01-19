"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button, ButtonLink } from "./ui/Button";
import { Login } from "./Login";
import { Loader } from "./ui/Loader";

export const AuthorizationBody = () => {
  const { data, status } = useSession();
  switch (status) {
    case "loading":
      return <Loader typeLoading="fullPage" />;
    case "unauthenticated":
      return <Login />;
    case "authenticated":
      return (
        <>
          <ButtonLink href="/pokedex">
            Continue with this account: {data.user?.name}
          </ButtonLink>
          <Button onClick={() => signOut({ redirect: false })}>
            Change account
          </Button>
        </>
      );
  }
};

export const Authorization = () => {
  return (
    <div className="flex flex-col m-0 gap-2 w-full max-w-64 items-center p-0 h-screen justify-center">
      <AuthorizationBody />
    </div>
  );
};
