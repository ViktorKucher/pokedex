
import { FollowsList } from "@/components/Follows";
import { Header } from "@/components/pokedex/header/Header";
import { Title } from "@/components/ui/Title";

export default function Pokedex() {
  return (
    <main className="text-center">
      <Header/>
      <Title>Follows</Title>
      <FollowsList/>
    </main>
  );
}
