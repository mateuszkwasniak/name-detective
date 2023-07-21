import "./globals.css";
import type { Metadata } from "next";
import { Jost } from "next/font/google";
import Navbar from "./components/Navbar";

const jost = Jost({ subsets: ["latin"] });

export const metadata = {
  icons: {
    icon: "/detective.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${jost.className} min-h-screen relative overflow-x-hidden flex flex-col items-center`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
