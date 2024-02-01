import { FollowsList } from "@/components/Follows";
import { Header } from "@/components/pokedex/header/Header";

export default function Pokedex() {
  return (
    <main className="text-center">
      <Header />
      <FollowsList />
    </main>
  );
}
