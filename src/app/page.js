import Particles from "@/components/ui/particles";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href={"/signup"}>Click me to SignUp</Link>
      <Link href={"/login"}>Already a User?</Link>
      <div className="relative flex h-[400px] w-full items-center justify-center overflow-hidden rounded-lg border bg-background p-4 md:shadow-xl">
        <span className="pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-7xl font-semibold leading-none text-transparent dark:from-white dark:to-black md:text-9xl">
          Admin Dashboard
        </span>
        <Particles
          className="absolute bg-slate-300 inset-0"
          quantity={150}
          ease={80}
          color={"#0000"}
          refresh
        />
      </div>
    </main>
  );
}
