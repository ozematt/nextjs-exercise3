import type { Metadata } from "next";
import { Fugaz_One, Open_Sans } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { AuthProvider } from "@/context/AuthContext";

const openSans = Open_Sans({ subsets: ["latin"] });
const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "Next.js App",
  description: "Broodl - track your mood every day of the year",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const header = (
    <header className="p-4 sm:p-8 flex items-center justify-between gap-4">
      <Link href={"/"}>
        <h1 className={"text-base sm:text-lg textGradient " + fugaz.className}>
          Broodl
        </h1>
      </Link>
      {/* <Logout /> */}
    </header>
  );

  const footer = (
    <footer className="p-4 sm:p-8 grid place-items-center">
      <Link href={"https://youtu.be/lkjrUW8fI40"} target="_blank" className="">
        <p
          className={
            "text-indigo-500 duration-200 hover:text-white hover:bg-indigo-500  " +
            fugaz.className
          }
        >
          Built by Smoljames 💛
        </p>
      </Link>
    </footer>
  );

  return (
    <html lang="en">
      <AuthProvider>
        <body
          className={
            "w-full max-w-[1000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col text-slate-800 " +
            openSans.className
          }
        >
          {header}
          {children}
          {footer}
        </body>
      </AuthProvider>
    </html>
  );
}
