
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save, UserRound } from "lucide-react";
import { toast } from "sonner";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ProfileFormProps {
  userId: string;
  email: string;
  fullName: string;
}

export function ProfileForm({
  userId,
  email,
  fullName,
}: ProfileFormProps) {
  const router = useRouter();

  const [name, setName] = useState(fullName);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      toast.error("Full name is required");
      return;
    }

    if (trimmedName === fullName) {
      toast.info("No changes to save");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();

      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: trimmedName,
        })
        .eq("id", userId)
        .select("id")
        .single();

      if (error) {
        throw error;
      }

      setName(trimmedName);

      toast.success("Profile updated successfully");

      // Refresh server-rendered profile summary
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update profile"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col rounded-2xl border border-[#EAE7F2] bg-white p-5 shadow-sm sm:p-6">
      {/* Form Header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-violet-100">
          <UserRound className="h-6 w-6 text-violet-600" />
        </div>

        <div>
          <h2 className="text-base font-semibold text-[#17112F]">
            Personal Information
          </h2>

          <p className="text-xs text-slate-500">
            Update your account details
          </p>
        </div>
      </div>

      {/* Profile Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-1 flex-col"
      >
        <div className="space-y-5">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="fullName">
              Full Name
            </Label>

            <Input
              id="fullName"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              placeholder="Enter your full name"
              maxLength={100}
              disabled={loading}
              required
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">
              Email Address
            </Label>

            <Input
              id="email"
              type="email"
              value={email}
              disabled
            />

            <p className="text-xs text-slate-500">
              Your email address cannot be changed here.
            </p>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-auto flex justify-end pt-6">
          <Button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto"
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}

            {loading
              ? "Saving..."
              : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}
