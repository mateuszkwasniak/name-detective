"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="w-full fixed top:0 z-50 flex justify-center border-b border-slate-200">
      <div className="md:w-[90%] h-[5rem] xl:w-[70rem] py-5 bg-white flex items-center justify-between md:text-base xl:text-lg text-slate-800">
        <Link
          className="font-bold text-3xl text-slate-800 hover:opacity-70 duration-700 ease-in-out"
          href="/"
        >
          Name Detective
        </Link>
        <div className="flex gap-10">
          <p className="flex items-center text-slate-800">Hello, Guest</p>
          <Link
            href="/login"
            className="w-fit text-lg rounded-full text-slate-800  px-5 py-1 flex items-center justify-between gap-2 bg-opacity-80 hover:bg-slate-100 duration-700 ease-in-out shadow-md"
          >
            Sign in
          </Link>
        </div>
      </div>
    </nav>
  );
}
