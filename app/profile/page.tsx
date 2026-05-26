"use client";

import {
  User,
  ShieldCheck,
  Car,
  Heart,
  Bell,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  Star,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

const MENU_ITEMS = [
  {
    section: "My Activity",
    items: [
      { icon: Car, label: "My Listings", badge: "3", href: "#" },
      { icon: Heart, label: "Saved Vehicles", badge: "4", href: "/favorites" },
      { icon: Bell, label: "Notifications", badge: "3", href: "#" },
    ],
  },
  {
    section: "Account",
    items: [
      { icon: Settings, label: "Settings", badge: "1", href: "#" },
      { icon: ShieldCheck, label: "Verification", badge: "3", href: "#" },
      { icon: HelpCircle, label: "Help & Support", badge: "4", href: "#" },
    ],
  },
];

export default function ProfilePage() {
  return (
    <>
      <div className="px-4 py-4 w-full max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto">
        {/* Profile card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 mb-5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-amber-500/20 border-2 border-amber-500/40 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-amber-400" />
            </div>
            <div>
              <h2 className="font-display font-black text-lg text-zinc-50">
                Guest User
              </h2>
              <p className="text-xs text-zinc-500">
                Sign in to access all features
              </p>
              <div className="flex items-center gap-1 mt-1.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-3 h-3 fill-amber-400 text-amber-400"
                  />
                ))}
                <span className="text-xs text-zinc-500 ml-1">5.0</span>
              </div>
            </div>
          </div>

          <Separator className="bg-zinc-800 my-4" />

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 text-center">
            {[
              { label: "Listings", value: "3" },
              { label: "Saved", value: "4" },
              { label: "Views", value: "2.4K" },
            ].map((s) => (
              <div key={s.label} className="bg-zinc-800/60 rounded-xl py-2.5">
                <p className="font-display font-black text-base text-zinc-100">
                  {s.value}
                </p>
                <p className="text-[10px] text-zinc-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Menu */}
        {MENU_ITEMS.map((group) => (
          <div key={group.section} className="mb-4">
            <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-2 px-1">
              {group.section}
            </p>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden divide-y divide-zinc-800">
              {group.items.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3.5 hover:bg-zinc-800/60 transition-colors"
                >
                  <div className="w-8 h-8 bg-zinc-800 rounded-xl flex items-center justify-center">
                    <item.icon className="w-4 h-4 text-zinc-400" />
                  </div>
                  <span className="flex-1 text-sm font-semibold text-zinc-200">
                    {item.label}
                  </span>
                  {item.badge && (
                    <span className="bg-amber-500/15 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-500/30">
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight className="w-4 h-4 text-zinc-700" />
                </a>
              ))}
            </div>
          </div>
        ))}

        {/* sign out */}
        <button className="w-full flex items-center gap-3 px-4 py-3.5 bg-zinc-900 border border-zinc-800 rounded-2xl hover:bg-red-500/10 hover:border-red-500/30 transition-all group">
          <div className="w-8 h-8 bg-zinc-800 group-hover:bg-red-500/20 rounded-xl flex items-center justify-center transition-colors">
            <LogOut className="w-4 h-4 text-zinc-400 group-hover:text-red-400 transition-colors" />
          </div>
          <span className="text-sm font-semibold text-zinc-400 group-hover:text-red-400 transition-colors">
            Sign Out
          </span>
        </button>

        <p className="text-center text-[10px] text-zinc-700 mt-6">
          MOTOXEN © 2026. All rights reserved.
        </p>
      </div>
    </>
  );
}
