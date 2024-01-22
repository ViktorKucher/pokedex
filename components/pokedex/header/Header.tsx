"use client";
import { SiPokemon } from "react-icons/si";
import { DropMenu } from "./DropMenu";
import { BookmarkCounter } from "../../ui/Bookmark";

export const Header = () => {
  return (
    <header className="flex justify-between items-center gap-1 px-5 py-2 ">
      <div>
        <SiPokemon size={100} color="yellow" />
      </div>
      <div className="flex items-center gap-2">
        <DropMenu />
        <BookmarkCounter count={99} />
      </div>
    </header>
  );
};
