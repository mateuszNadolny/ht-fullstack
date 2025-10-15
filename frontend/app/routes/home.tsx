import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Habit PERN App" },
    {
      name: "description",
      content: "Very cool self-hosted habit app made with PERN stack!",
    },
  ];
}

export default function Home() {
  const user = "cipen";
  return (
    <main className="flex flex-col items-center justify-center pt-16 pb-4">
      <h1 className="text-woodsmoke-50  text-4xl tracking-tight font-bold pb-4">
        Daily Habits 🪴
      </h1>
      <p className="text-woodsmoke-100 text-xl tracking-tight">{`Welcome back, ${user}`}</p>
    </main>
  );
}
