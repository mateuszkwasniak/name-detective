import "./globals.css";
import { Jost } from "next/font/google";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./auth-provider";

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
    <html lang="en" className="overflow-x-hidden">
      <body
        className={`${jost.className} min-h-screen relative overflow-x-hidden flex flex-col items-center`}
      >
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
