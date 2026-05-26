import type { Metadata } from "next";
import { Syne, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { BottomNav } from "@/components/layout/BottomNav";
import { appconfig } from "@/constants/config";
import { Header } from "@/components/layout/Header";
import { TopNav } from "@/components/layout/TopNav";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: appconfig.name + " - " + appconfig.tagline,
  description: appconfig.description,
  keywords: [
    "cars",
    "vehicles",
    "marketplace",
    "buy car",
    "sell car",
    "Sri Lanka",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${syne.variable} ${jakarta.variable}`}>
      <body className="bg-zinc-950 text-zinc-50 antialiased">
        <Header />
        <TopNav />
        <main className="min-h-screen pb-20 md:pb-8 pt-2 md:pt-4">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
