
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProfileForm } from "@/components/profile/profile-form";

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/login");
  }

  const { data: profile, error: profileError } =
    await supabase
      .from("profiles")
      .select("id, full_name, avatar_url")
      .eq("id", user.id)
      .single();

  if (profileError || !profile) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
        Unable to load your profile.
        {profileError && (
          <p className="mt-2 text-sm">
            {profileError.message}
          </p>
        )}
      </div>
    );
  }

  const displayName = profile.full_name || "Your Profile";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="w-full max-w-5xl space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-[#17112F]">
          Profile Settings
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage your personal information and account.
        </p>
      </div>

      {/* Profile Cards */}
      <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3">
        {/* Left: Profile Summary */}
        <div className="flex h-full flex-col rounded-2xl border border-[#EAE7F2] bg-white p-6 shadow-sm">
          <div className="flex flex-col items-center text-center">
            {/* Avatar */}
            <div className="flex size-20 shrink-0 items-center justify-center rounded-full bg-violet-100 text-2xl font-bold text-violet-600">
              {initial}
            </div>

            {/* Name */}
            <h2 className="mt-4 break-words text-lg font-semibold text-[#17112F]">
              {displayName}
            </h2>

            {/* Email */}
            <p className="mt-1 break-all text-sm text-slate-500">
              {user.email}
            </p>
          </div>

          {/* Account Status */}
          <div className="mt-auto border-t border-[#EAE7F2] pt-5">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm text-slate-500">
                Account Status
              </span>

              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                Active
              </span>
            </div>
          </div>
        </div>

        {/* Right: Profile Form */}
        <div className="min-w-0 lg:col-span-2">
          <ProfileForm
            userId={user.id}
            email={user.email ?? ""}
            fullName={profile.full_name ?? ""}
          />
        </div>
      </div>
    </div>
  );
}
