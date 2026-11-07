
"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Eye, EyeOff, LockKeyhole } from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleLogin(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const supabase = createClient();

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      setEmail("");
      setPassword("");

      router.replace("/dashboard");
      router.refresh();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Login failed."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
  setEmail("");
  setPassword("");
}, []);

  return (
    <div>
      <div className="mb-9">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-[#7546EB]">
          <LockKeyhole className="h-6 w-6" />
        </div>

        <h2 className="text-3xl font-bold tracking-tight text-[#17112F]">
          Welcome back
        </h2>

        <p className="mt-3 text-sm text-slate-500">
          Enter your credentials to access your workspace.
        </p>
      </div>

      <form onSubmit={handleLogin} autoComplete="off" className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@company.com"
            // autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 rounded-xl border-slate-200 bg-white px-4 focus-visible:ring-[#7546EB]"
            required
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <span className="text-xs text-slate-400">
              Forgot password?
            </span>
          </div>

          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 rounded-xl border-slate-200 bg-white px-4 pr-12 focus-visible:ring-[#7546EB]"
              required
            />

            <Button
              type="button"
              variant="ghost"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#7546EB]"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {errorMessage && (
          <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-600">
            {errorMessage}
          </p>
        )}

        <Button
          type="submit"
          disabled={loading}
          className="h-12 w-full rounded-xl bg-[#7546EB] font-semibold text-white shadow-lg shadow-violet-500/15 transition-all hover:bg-[#6335D5] hover:shadow-violet-500/25"
        >
          {loading ? "Signing in..." : "Sign in"}
          {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-slate-500">
        New to LeadFlow?{" "}
        <Link
          href="/signup"
          className="font-semibold text-[#7546EB] hover:underline"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
}
