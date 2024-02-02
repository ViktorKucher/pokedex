import { Authorization } from "@/components/Authorization";

export default function HomePage() {
  return (
    <main className="flex justify-center bg-white dark:bg-black">
      <Authorization />
    </main>
  );
}
