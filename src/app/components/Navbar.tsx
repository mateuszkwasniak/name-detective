"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav
      className="md:w-[70rem] md:mb-[5%] py-5 flex items-center justify-between text-lg
    text-slate-800"
    >
      <Link
        className="font-bold text-3xl text-slate-800 hover:opacity-70 duration-700 ease-in-out"
        href="/"
      >
        NameDetective
      </Link>
      <div className="flex gap-10">
        <p>Hello, Guest</p>
        <Link href="/login">Sign in</Link>
      </div>
    </nav>
  );
}
