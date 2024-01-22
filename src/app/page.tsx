import Link from "next/link";

export default function Home() {
  return (
    <main className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-semibold mb-4">Todo App</h1>

        <Link className="border bg-gray-200 py-1 px-3 rounded text-xl" href="/todo">See Todo</Link>
    </main>
  );
}
