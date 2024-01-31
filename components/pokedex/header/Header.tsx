"use client";
import { SiPokemon } from "react-icons/si";
import { DropMenu } from "./DropMenu";
import { BookmarkCounter } from "../../ui/Bookmark";
import Link from "next/link";
import { useFollowPokemonStore } from "@/store/followsPokemon";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export const Header = () => {
  const { listFollows, initFollowPokemons } = useFollowPokemonStore();
  const { data, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (data?.user) {
      initFollowPokemons(data.user.id);
    }
  }, [data]);
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status]);
  return (
    <header className="flex justify-between items-center gap-1 px-5 py-2 ">
      <div>
        <SiPokemon size={100} color="yellow" />
      </div>
      <div className="flex items-center gap-2">
        <DropMenu />
        <Link href={"/pokedex/follows"}>
          <BookmarkCounter count={listFollows?.length} />
        </Link>
      </div>
    </header>
  );
};
