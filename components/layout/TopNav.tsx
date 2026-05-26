"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, PlusCircle, Heart, User, Bell } from "lucide-react";
import { BOTTOM_NAV_ITEMS } from "@/constants/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { appconfig } from "@/constants/config";

const ICON_MAP = {
  Home,
  Search,
  PlusCircle,
  Heart,
  User,
} as const;

export function TopNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:block border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
              <span className="text-zinc-950 font-display font-black text-sm">
                V
              </span>
            </div>
            <span className="font-display font-black text-2xl tracking-tight">
              {appconfig.name}
            </span>
          </Link>

          {/* items */}
          <div className="flex items-center gap-8">
            {BOTTOM_NAV_ITEMS.map((item) => {
              const Icon = ICON_MAP[item.icon as keyof typeof ICON_MAP];
              const isActive = pathname === item.href;
              const isSell = item.href === "/sell";

              if (isSell) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-2 px-5 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold transition-all active:scale-95"
                  >
                    <span>{item.label}</span>
                  </Link>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all hover:bg-zinc-900",
                    isActive
                      ? "text-amber-500 bg-zinc-900"
                      : "text-zinc-400 hover:text-zinc-200",
                  )}
                >
                  <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* right side */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="rounded-xl">
              <Search className="w-5 h-5" />
            </Button>

            <Button variant="ghost" size="icon" className="rounded-xl relative">
              <Bell className="w-5 h-5" />
              <Badge className="absolute -top-1 -right-1 w-4 h-4 p-0 text-[10px] bg-amber-500 text-black">
                3
              </Badge>
            </Button>

            <Link href="/profile">
              <Button variant="ghost" size="icon" className="rounded-xl">
                <User className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
