"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, PlusCircle, Heart, User } from "lucide-react";
import { BOTTOM_NAV_ITEMS } from "@/constants/navigation";
import { cn } from "@/lib/utils";

const ICON_MAP = {
  Home,
  Search,
  PlusCircle,
  Heart,
  User,
} as const;

type IconName = keyof typeof ICON_MAP;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bottom-nav-safe">
      <div className="bg-zinc-900/95 backdrop-blur-xl border-t rounded-t-4xl border-zinc-800/80">
        <div className="flex items-center justify-around px-2 py-2 max-w-lg mx-auto">
          {BOTTOM_NAV_ITEMS.map((item) => {
            const Icon = ICON_MAP[item.icon as IconName];
            const isActive = pathname === item.href;
            const isSell = item.href === "/sell";

            if (isSell) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex flex-col items-center gap-0.5 px-3 -mt-6"
                >
                  <div
                    className={cn(
                      "w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-200",
                      "bg-amber-500 hover:bg-amber-400 active:scale-95",
                    )}
                  >
                    <Icon className="w-6 h-6 text-zinc-950" strokeWidth={2.5} />
                  </div>
                  <span className="text-[10px] font-semibold text-zinc-400 mt-1">
                    {item.label}
                  </span>
                </Link>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all duration-200",
                  "min-w-14 active:scale-95",
                  isActive
                    ? "text-amber-500"
                    : "text-zinc-500 hover:text-zinc-300",
                )}
              >
                <div className="relative">
                  <Icon
                    className={cn("w-5 h-5 transition-all")}
                    strokeWidth={isActive ? 2.5 : 2}
                    fill={isActive ? "currentColor" : "none"}
                  />
                </div>
                <span
                  className={cn(
                    "text-[10px] font-semibold transition-all",
                    isActive ? "text-amber-500" : "text-zinc-600",
                  )}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
