"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/Button";
import { Login } from "./Login";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const Authorization = () => {
  const router = useRouter();
  const session = useSession();
  useEffect(() => {
    if (session.data?.user) {
      router.push("/pokedex");
    }
  }, [session, router]);
  return (
    <div className="flex flex-col m-0 gap-2">
      {session.data ? (
        <>
          <Button>
            <Link href="/pokedex">
              Continue with this account: {session.data.user?.name}
            </Link>
          </Button>
          <Button onClick={() => signOut()}>Change account</Button>
        </>
      ) : (
        <Login />
      )}
    </div>
  );
};
