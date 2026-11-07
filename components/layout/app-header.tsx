
"use client";

import { useState } from "react";
import {
  Bell,
  Search,
  Menu,
  ChevronDown,
  UserRound,
  LogOut,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";

import { AppSidebar } from "./app-sidebar";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface AppHeaderProps {
  email: string;
}

export function AppHeader({ email }: AppHeaderProps) {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const displayName = email.split("@")[0];

  const handleLogout = async () => {
    const supabase = createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout failed:", error.message);
      return;
    }

    router.replace("/login");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-[#EAE7F2] bg-white/90 px-4 backdrop-blur-xl sm:px-8">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label="Open navigation"
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>

        <div className="hidden w-80 items-center gap-3 rounded-xl border border-[#EAE7F2] bg-[#F8F7FC] px-4 py-2.5 md:flex">
          <Search className="h-4 w-4 text-slate-400" />
          <span className="text-sm text-slate-400">
            Search your workspace...
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Notifications"
          className="rounded-xl text-slate-500"
        >
          <Bell className="h-5 w-5" />
        </Button>

        <div className="hidden h-8 w-px bg-slate-200 sm:block" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex items-center gap-3 rounded-xl p-1 transition-colors hover:bg-slate-50"
            >
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-violet-100 font-semibold text-[#7546EB]">
                  {displayName.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="hidden text-left sm:block">
                <p className="max-w-40 truncate text-sm font-semibold text-[#17112F]">
                  {displayName}
                </p>
                <p className="text-xs text-slate-400">
                  My Account
                </p>
              </div>

              <ChevronDown className="hidden h-4 w-4 text-slate-400 sm:block" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem disabled>
              <UserRound className="mr-2 h-4 w-4" />
              My Profile
            </DropdownMenuItem>

            <DropdownMenuItem
              onSelect={handleLogout}
              className="text-red-600 focus:text-red-600"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent
          side="left"
          className="w-72 border-none bg-[#17112F] p-0"
        >
          <SheetTitle className="sr-only">
            Main navigation
          </SheetTitle>

          <AppSidebar onNavigate={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>
    </header>
  );
}
