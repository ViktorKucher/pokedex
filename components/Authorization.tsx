"use client";
import { signOut, useSession } from "next-auth/react";
import { Button, ButtonLink } from "./ui/Button";
import { Login } from "./Login";
import { Spin } from "antd";

export const AuthorizationBody = () => {
  const { data, status } = useSession();
  switch (status) {
    case "loading":
      return (
        <div className="flex justify-center items-center min-h-screen min-w-screen text-center">
          <Spin size="large"></Spin>
        </div>
      );
    case "unauthenticated":
      return <Login />;
    case "authenticated":
      return (
        <>
          <ButtonLink href="/pokedex">
            Continue with this account: {data.user?.name}
          </ButtonLink>
          <Button
            onClick={() => signOut({ redirect: false, callbackUrl: "/" })}
          >
            Change account
          </Button>
        </>
      );
  }
};

export const Authorization = () => {
  return (
    <div className="flex flex-col m-0 gap-2 w-full max-w-64 items-center p-0 h-screen justify-center bg-white dark:bg-black">
      <AuthorizationBody />
    </div>
  );
};
