
import Link from "next/link";
import { ArrowUpRight, ChartNoAxesCombined, Sparkles, Zap } from "lucide-react";
import type { ReactNode } from "react";

export default function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="grid min-h-screen bg-[#F8F7FC] lg:grid-cols-2">
      {/* Branding panel */}
      <div className="relative hidden overflow-hidden bg-[#17112F] p-12 text-white lg:flex lg:flex-col lg:justify-between">
        {/* Decorative gradients */}
        <div className="pointer-events-none absolute -right-32 top-24 h-96 w-96 rounded-full bg-violet-600/40 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-28 -left-20 h-96 w-96 rounded-full bg-pink-500/30 blur-[100px]" />

        <Link href="/" className="relative z-10 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-pink-500 shadow-lg shadow-violet-500/20">
            <Zap className="h-6 w-6 fill-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight">
            LeadFlow CRM
          </span>
        </Link>

        <div className="relative z-10 max-w-lg">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-violet-100">
            <Sparkles className="h-4 w-4 text-pink-300" />
            Your sales workspace, reimagined
          </div>

          <h1 className="text-5xl font-bold leading-[1.12] tracking-tight xl:text-6xl">
            Turn every lead into an{" "}
            <span className="bg-gradient-to-r from-violet-300 via-fuchsia-300 to-pink-300 bg-clip-text text-transparent">
              opportunity.
            </span>
          </h1>

          <p className="mt-7 max-w-md text-lg leading-relaxed text-violet-100/70">
            Manage relationships, organize your pipeline, and grow
            your business from one beautiful workspace.
          </p>

          <div className="mt-10 flex items-center gap-3 text-sm text-violet-200">
            <ChartNoAxesCombined className="h-5 w-5" />
            <span>Smarter workflows. Stronger relationships.</span>
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>

        <p className="relative z-10 text-sm text-violet-200/50">
          © 2026 LeadFlow CRM
        </p>
      </div>

      {/* Form panel */}
      <div className="flex min-h-screen flex-col">
        <div className="flex items-center gap-2 p-6 lg:hidden">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#7546EB] text-white">
            <Zap className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold text-[#17112F]">
            LeadFlow CRM
          </span>
        </div>

        <div className="flex flex-1 items-center justify-center px-6 py-12 sm:px-10">
          <div className="w-full max-w-[420px]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
