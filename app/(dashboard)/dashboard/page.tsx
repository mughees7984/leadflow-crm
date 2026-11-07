
import {
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Sparkles,
  UsersRound,
  Target,
  UserRoundCheck,
  ClipboardList,
  TrendingUp,
} from "lucide-react";

import Link from "next/link";

const stats = [
  {
    label: "Total Leads",
    value: "1,248",
    change: "+12.5%",
    description: "vs. last month",
    icon: UsersRound,
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    trend: "up",
  },
  {
    label: "Qualified Leads",
    value: "432",
    change: "+8.2%",
    description: "vs. last month",
    icon: Target,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    trend: "up",
  },
  {
    label: "Active Customers",
    value: "856",
    change: "+6.4%",
    description: "vs. last month",
    icon: UserRoundCheck,
    iconBg: "bg-sky-100",
    iconColor: "text-sky-600",
    trend: "up",
  },
  {
    label: "Pending Tasks",
    value: "24",
    change: "+3",
    description: "more than last week",
    icon: ClipboardList,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    trend: "warning",
  },
] as const;

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Dashboard Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            Workspace Overview
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Dashboard
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Here's what's happening with your business today.
          </p>
        </div>

        <Link
          href="/leads"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-violet-500/15 transition-all hover:bg-[#6335D5] hover:shadow-violet-500/25"
        >
          <Plus className="h-4 w-4" />
          Add New Lead
        </Link>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-500/5"
            >
              {/* Icon and arrow */}
              <div className="mb-5 flex items-center justify-between">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.iconBg}`}
                >
                  <Icon
                    className={`h-6 w-6 ${stat.iconColor}`}
                  />
                </div>

                <ArrowUpRight className="h-5 w-5 text-slate-400 transition-colors group-hover:text-primary" />
              </div>

              {/* Label */}
              <p className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </p>

              {/* Value */}
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
                {stat.value}
              </h2>

              {/* Trend */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold ${
                    stat.trend === "warning"
                      ? "bg-amber-50 text-amber-700"
                      : "bg-emerald-50 text-emerald-700"
                  }`}
                >
                  {stat.trend === "warning" ? (
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  ) : (
                    <TrendingUp className="h-3.5 w-3.5" />
                  )}

                  {stat.change}
                </span>

                <span className="text-xs text-muted-foreground">
                  {stat.description}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sales Overview */}
      <div className="grid gap-5 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-7 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-foreground">
                Sales Overview
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Track your leads and sales performance.
              </p>
            </div>

            <div className="rounded-xl bg-violet-50 p-2.5 text-primary">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>

          <div className="mt-8 flex min-h-64 items-center justify-center rounded-xl border border-dashed border-border bg-[#FBFAFE]">
            <div className="text-center">
              <TrendingUp className="mx-auto h-9 w-9 text-violet-300" />

              <p className="mt-3 text-sm font-medium text-foreground">
                Sales analytics coming soon
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                Real data will be displayed here.
              </p>
            </div>
          </div>
        </div>

        {/* Pipeline Overview */}
        <div className="rounded-2xl border border-border bg-card p-7 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-foreground">
                Pipeline Overview
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Your lead conversion stages.
              </p>
            </div>

            <Target className="h-5 w-5 text-primary" />
          </div>

          <div className="mt-8 flex min-h-64 flex-col items-center justify-center rounded-xl bg-[#FBFAFE] p-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100">
              <Target className="h-8 w-8 text-primary" />
            </div>

            <h3 className="mt-5 text-sm font-semibold text-foreground">
              Pipeline insights
            </h3>

            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Your lead pipeline and conversion statistics
              will appear here once connected to Supabase.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
