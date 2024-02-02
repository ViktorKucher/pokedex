import { ListPokemons } from "@/components/pokedex/body/ListPokemons";
import { Header } from "@/components/pokedex/header/Header";

export default function Pokedex() {
  return (
    <main className="min-h-screen min-w-screen">
      <Header/>
      <ListPokemons />
    </main>
  )
}
