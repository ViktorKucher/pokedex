import { FollowsList } from "@/components/Follows";
import { Header } from "@/components/pokedex/header/Header";
import { ButtonLink } from "@/components/ui/Button";
import { Title } from "@/components/ui/Title";

export default function Pokedex() {
  return (
    <main className="text-center">
      <Header />
      <ButtonLink href="/pokedex" style="w-28">
        Return
      </ButtonLink>
      <Title>Follows</Title>
      <FollowsList />
    </main>
  );
}
