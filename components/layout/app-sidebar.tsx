
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Contact,
  ListTodo,
  ChartNoAxesCombined,
  Settings,
  Zap,
  Sparkles,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";

const navigation: {
  title: string;
  href: string;
  icon: LucideIcon;
}[] = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Leads", href: "/leads", icon: Contact },
  { title: "Customers", href: "/customers", icon: Users },
  { title: "Tasks", href: "/tasks", icon: ListTodo },
  { title: "Reports", href: "/reports", icon: ChartNoAxesCombined },
];

export function AppSidebar({
  onNavigate,
}: {
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <aside className="relative flex h-full flex-col overflow-hidden bg-[#17112F] text-white">
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-violet-600/20 blur-[80px]" />

      {/* Logo */}
      <Link
        href="/dashboard"
        onClick={onNavigate}
        className="relative z-10 flex h-20 items-center gap-3 border-b border-white/10 px-6"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-pink-500 shadow-lg shadow-violet-500/20">
          <Zap className="h-5 w-5 fill-white" />
        </div>

        <div>
          <h2 className="text-lg font-bold tracking-tight">
            LeadFlow CRM
          </h2>
          <p className="text-[11px] text-violet-200/50">
            Sales Workspace
          </p>
        </div>
      </Link>

      {/* Navigation */}
      <nav className="relative z-10 flex-1 space-y-1 px-4 py-7">
        <p className="mb-4 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-200/40">
          Workspace
        </p>

        {navigation.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href ||
            pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all ${
                active
                  ? "bg-gradient-to-r from-[#7546EB] to-[#934AE6] text-white shadow-lg shadow-violet-900/30"
                  : "text-violet-100/65 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className="h-[19px] w-[19px]" />
              <span className="flex-1">{item.title}</span>

              {active && <ChevronRight className="h-4 w-4" />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="relative z-10 space-y-4 p-4">
        <Link
          href="/settings"
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-violet-100/65 transition-colors hover:bg-white/10 hover:text-white"
        >
          <Settings className="h-[19px] w-[19px]" />
          Settings
        </Link>

        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-violet-600/40 to-pink-500/20 p-5">
          <Sparkles className="mb-3 h-6 w-6 text-pink-300" />

          <h3 className="text-sm font-semibold">
            Work smarter
          </h3>

          <p className="mt-2 text-xs leading-relaxed text-violet-100/65">
            AI-powered insights are coming to your workspace.
          </p>
        </div>
      </div>
    </aside>
  );
}
