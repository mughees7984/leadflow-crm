
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Eye, EyeOff, UserRoundPlus } from "lucide-react";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignupPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function handleSignup(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const supabase = createClient();

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
          emailRedirectTo: `${window.location.origin}/auth/confirm`,
        },
      });

      if (error) throw error;

      if (data.session) {
        router.replace("/dashboard");
        router.refresh();
      } else {
        setSuccessMessage(
          "Signup request received. Please check your email to confirm your account."
        );
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Signup failed."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="mb-8">
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-[#7546EB]">
          <UserRoundPlus className="h-6 w-6" />
        </div>

        <h2 className="text-3xl font-bold tracking-tight text-[#17112F]">
          Create your account
        </h2>

        <p className="mt-3 text-sm text-slate-500">
          Start managing your leads and customers in one place.
        </p>
      </div>

      <form onSubmit={handleSignup} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full name</Label>
          <Input
            id="fullName"
            placeholder="Your full name"
            autoComplete="name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="h-12 rounded-xl border-slate-200 bg-white px-4"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@company.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 rounded-xl border-slate-200 bg-white px-4"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>

          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="At least 8 characters"
              autoComplete="new-password"
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 rounded-xl border-slate-200 bg-white px-4 pr-12"
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

          <p className="text-xs text-slate-400">
            Use a strong password with at least 8 characters.
          </p>
        </div>

        {errorMessage && (
          <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-600">
            {errorMessage}
          </p>
        )}

        {successMessage && (
          <p role="status" className="rounded-xl bg-green-50 p-3 text-sm text-green-700">
            {successMessage}
          </p>
        )}

        <Button
          type="submit"
          disabled={loading}
          className="h-12 w-full rounded-xl bg-[#7546EB] font-semibold text-white shadow-lg shadow-violet-500/15 hover:bg-[#6335D5]"
        >
          {loading ? "Creating account..." : "Create account"}
          {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-[#7546EB] hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
