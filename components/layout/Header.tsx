"use client";

import Link from "next/link";
import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { appconfig } from "@/constants/config";

export function Header() {
  return (
    <header className="md:hidden sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-800/60">
      <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center">
            <span className="text-zinc-950 font-display font-black text-sm leading-none">
              V
            </span>
          </div>
          <span className="font-display font-black text-xl tracking-tight text-zinc-50">
            {appconfig.name}
          </span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link href="/browse">
            <Button
              variant="ghost"
              size="icon"
              className="w-9 h-9 text-zinc-400 hover:text-zinc-50 hover:bg-zinc-800 rounded-xl"
            >
              <Search className="w-4.5 h-4.5" />
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="w-9 h-9 text-zinc-400 hover:text-zinc-50 hover:bg-zinc-800 rounded-xl relative"
          >
            <Bell className="w-4.5 h-4.5" />
            <Badge className="absolute -top-0.5 -right-0.5 w-4 h-4 p-0 flex items-center justify-center text-[9px] bg-amber-500 text-zinc-950 border-0 font-bold">
              3
            </Badge>
          </Button>
        </div>
      </div>
    </header>
  );
}
