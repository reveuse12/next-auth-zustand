import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Home</h1>
      <Link href={"/signup"}>Click me to SignUp</Link>
      <p>Welcome to my website!</p>
    </main>
  );
}
