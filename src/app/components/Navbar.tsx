"use client";

import { useContext, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { IoMdRefresh } from "react-icons/io";
import { AuthContext } from "../auth-provider";
import { useRefreshLogin } from "@/hooks/useRefreshLogin";
import { useLogout } from "@/hooks/useLogout";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { auth } = useContext(AuthContext);
  const { refreshLogin } = useRefreshLogin();
  const { logout } = useLogout();

  const handleLogout = async function () {
    try {
      await logout();
    } catch (error: any) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    const refreshLog = async function () {
      try {
        await refreshLogin();
      } catch (error: any) {
        console.log(error?.message);
      }
    };

    refreshLog();
  }, [refreshLogin]);

  return (
    <nav className="w-full fixed top:0 left-0 z-50 flex justify-center border-b border-slate-200 bg-white text-slate-800">
      <div className="w-[90%] md:h-[5rem] xl:w-[70rem] py-5 bg-white flex items-center justify-between md:text-base xl:text-lg text-slate-800">
        <Link
          className="font-bold text-2xl md:text-3xl hover:opacity-70 duration-700 ease-in-out"
          href="/"
        >
          Name <br className="md:hidden" />
          Detective
        </Link>
        <div className="flex gap-5 md:gap-10">
          {auth.name && (
            <p className="invisible w-0 md:flex items-center">
              Hello, {auth.name}
            </p>
          )}

          {auth.name && (
            <>
              {pathname !== "/search-history" && (
                <Link
                  prefetch={false}
                  href="/search-history"
                  className="w-fit text-sm md:text-lg rounded-md px-2 md:px-5 py-1 flex items-center justify-between gap-2 bg-opacity-80 hover:bg-slate-100 duration-700 ease-in-out shadow-md"
                >
                  History
                </Link>
              )}
              {pathname === "/search-history" && (
                <button
                  onClick={() => router.refresh()}
                  className="w-fit text-sm md:text-lg rounded-md px-2 md:px-5 py-1 flex items-center gap-2 bg-opacity-80 hover:bg-slate-100 duration-700 ease-in-out shadow-md"
                >
                  <IoMdRefresh /> Refresh
                </button>
              )}
            </>
          )}

          {auth.name ? (
            <button
              className="w-fit text-sm md:text-lg rounded-md text-slate-800 px-2 md:px-5 py-1 flex items-center justify-between gap-2 bg-opacity-80 hover:bg-slate-100 duration-700 ease-in-out shadow-md"
              onClick={handleLogout}
            >
              Sign out
            </button>
          ) : (
            <Link
              href="/login"
              className="w-fit text-sm md:text-lg rounded-md text-slate-800  px-5 py-1 flex items-center justify-between gap-2 bg-opacity-80 hover:bg-slate-100 duration-700 ease-in-out shadow-md"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
