"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/Button";
import { Login } from "./Login";
import { Loader } from "./ui/Loader";

export const Authorization = () => {
  const {data,status} = useSession();
  if(status==='loading'){
    return <Loader typeLoading="fullPage"/>
  }
  return (
    <div className="flex flex-col m-0 gap-2 w-full max-w-64 items-center p-0 h-screen justify-center">
      {status==='authenticated' ? (
        <>
          <Button>
            <Link href="/pokedex">
              Continue with this account: {data.user?.email}
            </Link>
          </Button>
          <Button onClick={() => signOut({redirect:false})}>Change account</Button>
        </>
      ) : (
        <Login />
      )}
    </div>
  );
};
