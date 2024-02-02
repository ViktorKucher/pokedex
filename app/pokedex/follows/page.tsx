import { FollowsList } from "@/components/Follows";
import { Header } from "@/components/pokedex/header/Header";

export default function Pokedex() {
  return (
    <main className="min-h-screen min-w-screen text-center">
      <Header />
      <FollowsList />
    </main>
  );
}
