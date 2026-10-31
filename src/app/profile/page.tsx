
"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { toast } from "react-toastify";
import {
  Aperture,
  ArrowLeft,
  Camera,
  CheckCircle2,
  ChevronRight,
  CircleUserRound,
  Edit3,
  Mail,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";

const ProfilePage = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [show, setShow] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateProfile = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = String(formData.get("name") ?? "").trim();
    const image = String(formData.get("image") ?? "").trim();

    if (!name) {
      toast.error("Please enter your name.");
      return;
    }

    if (image) {
      try {
        const parsedUrl = new URL(image);

        if (!["http:", "https:"].includes(parsedUrl.protocol)) {
          toast.error("Please enter a valid image URL.");
          return;
        }
      } catch {
        toast.error("Please enter a valid image URL.");
        return;
      }
    }

    setIsUpdating(true);

    try {
      const { error } = await authClient.updateUser({
        name,
        image: image || "",
      });

      if (error) {
        toast.error(error.message || "Unable to update your profile.");
        return;
      }

      toast.success("Your profile has been updated successfully.");
      setShow(false);
    } catch (error) {
      console.error("Profile update failed:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isPending) {
    return (
      <main className="min-h-screen bg-[#F8F7FC] px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-5xl animate-pulse space-y-6">
          <div className="h-5 w-40 rounded bg-neutral-200" />
          <div className="h-52 rounded-3xl bg-white" />
          <div className="h-72 rounded-3xl bg-white" />
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#F8F7FC] px-4 py-12">
        <section className="w-full max-w-md rounded-3xl border border-neutral-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
            <CircleUserRound size={32} />
          </div>

          <h1 className="mt-5 text-2xl font-bold text-neutral-900">
            Sign in to your account
          </h1>

          <p className="mt-2 text-sm leading-6 text-neutral-500">
            Sign in to view and manage your StudioSpace profile.
          </p>

          <Link
            href="/signin"
            className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white transition hover:bg-violet-700"
          >
            Sign In
          </Link>

          <Link
            href="/"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-neutral-600 transition hover:text-violet-700"
          >
            <ArrowLeft size={16} />
            Back to home
          </Link>
        </section>
      </main>
    );
  }

  const initial = user.name?.trim().charAt(0).toUpperCase() || "U";

  return (
    <main className="min-h-screen bg-[#F8F7FC] px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-5xl">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-7 flex items-center gap-2 text-sm"
        >
          <Link
            href="/"
            className="font-medium text-neutral-500 transition hover:text-violet-700"
          >
            Home
          </Link>

          <ChevronRight size={15} className="text-neutral-400" />

          <span className="font-semibold text-violet-700">My Profile</span>
        </nav>

        {/* Page heading */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm font-semibold text-violet-700">
            <Aperture size={18} />
            <span>YOUR STUDIOSPACE ACCOUNT</span>
          </div>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            My Profile
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-500 sm:text-base">
            Manage your personal information and keep your account details up
            to date.
          </p>
        </div>

        {/* Profile banner */}
        <section className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
          <div className="h-28 bg-gradient-to-r from-violet-700 via-violet-600 to-fuchsia-500 sm:h-36">
            <div className="flex h-full items-start justify-end p-5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/15 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
                <ShieldCheck size={15} />
                Account Profile
              </span>
            </div>
          </div>

          <div className="px-5 pb-6 sm:px-8 sm:pb-8">
            <div className="-mt-12 flex flex-col gap-5 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
              {/* Avatar and user details */}
              <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-end">
                <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-3xl border-4 border-white bg-violet-100 text-3xl font-bold text-violet-700 shadow-sm sm:h-28 sm:w-28">
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name || "Profile photo"}
                      width={112}
                      height={112}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    initial
                  )}
                </div>

                <div className="min-w-0 pb-1">
                  <h2 className="break-words text-2xl font-bold text-neutral-900 sm:text-3xl">
                    {user.name || "StudioSpace User"}
                  </h2>

                  <p className="mt-1 break-all text-sm text-neutral-500">
                    {user.email}
                  </p>

                  <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">
                    <CheckCircle2 size={14} />
                    Member
                  </span>
                </div>
              </div>

              {/* Edit profile button */}
              <button
                type="button"
                onClick={() => setShow((previous) => !previous)}
                aria-expanded={show}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-violet-200 bg-white px-4 py-3 text-sm font-semibold text-violet-700 transition hover:border-violet-300 hover:bg-violet-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
              >
                {show ? <X size={17} /> : <Edit3 size={17} />}
                {show ? "Cancel Editing" : "Edit Profile"}
              </button>
            </div>
          </div>
        </section>

        {/* Profile information */}
        <section className="mt-7 rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-8">
          <div className="flex items-start gap-3 border-b border-neutral-100 pb-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
              <UserRound size={22} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-neutral-900">
                Personal Information
              </h2>

              <p className="mt-1 text-sm text-neutral-500">
                Your basic account details.
              </p>
            </div>
          </div>

          {!show ? (
            /* Read-only profile details */
            <div className="grid gap-5 pt-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-neutral-100 bg-neutral-50/80 p-5">
                <div className="flex items-center gap-2 text-sm font-medium text-neutral-500">
                  <UserRound size={17} />
                  Full Name
                </div>

                <p className="mt-3 break-words font-semibold text-neutral-900">
                  {user.name || "Not provided"}
                </p>
              </div>

              <div className="rounded-2xl border border-neutral-100 bg-neutral-50/80 p-5">
                <div className="flex items-center gap-2 text-sm font-medium text-neutral-500">
                  <Mail size={17} />
                  Email Address
                </div>

                <p className="mt-3 break-all font-semibold text-neutral-900">
                  {user.email}
                </p>
              </div>

              <div className="rounded-2xl border border-neutral-100 bg-neutral-50/80 p-5 sm:col-span-2">
                <div className="flex items-center gap-2 text-sm font-medium text-neutral-500">
                  <Camera size={17} />
                  Profile Photo
                </div>

                <p className="mt-3 break-all text-sm font-medium text-neutral-700">
                  {user.image || "No profile photo added"}
                </p>
              </div>
            </div>
          ) : (
            /* Edit profile form */
            <form onSubmit={handleUpdateProfile} className="space-y-6 pt-6">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-neutral-800"
                >
                  Full Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  defaultValue={user.name || ""}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  required
                  maxLength={100}
                  className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-neutral-800"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  value={user.email}
                  readOnly
                  className="w-full cursor-not-allowed rounded-xl border border-neutral-200 bg-neutral-100 px-4 py-3 text-sm text-neutral-500"
                />

                <p className="mt-2 text-xs text-neutral-500">
                  Email changes are not available in this form.
                </p>
              </div>

              <div>
                <label
                  htmlFor="image"
                  className="mb-2 block text-sm font-semibold text-neutral-800"
                >
                  Profile Photo URL
                </label>

                <input
                  id="image"
                  name="image"
                  type="url"
                  defaultValue={user.image || ""}
                  placeholder="https://example.com/photo.jpg"
                  className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
                />

                <p className="mt-2 text-xs leading-5 text-neutral-500">
                  Enter a publicly accessible image URL, or leave it empty to
                  remove your profile photo.
                </p>
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-neutral-100 pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setShow(false)}
                  disabled={isUpdating}
                  className="rounded-xl border border-neutral-200 px-5 py-3 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isUpdating}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isUpdating ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Saving Changes...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={17} />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </section>

        {/* Account navigation */}
        <section className="mt-7 rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-bold text-neutral-900">
            Your StudioSpace
          </h2>

          <p className="mt-1 text-sm text-neutral-500">
            Continue managing your studios and reservations.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Link
              href="/dashboard"
              className="group flex items-center justify-between rounded-2xl border border-neutral-200 p-4 transition hover:border-violet-200 hover:bg-violet-50/60"
            >
              <span className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                  <Aperture size={21} />
                </span>

                <span>
                  <span className="block text-sm font-semibold text-neutral-900">
                    Dashboard
                  </span>
                  <span className="mt-1 block text-xs text-neutral-500">
                    Manage your account
                  </span>
                </span>
              </span>

              <ChevronRight
                size={18}
                className="text-neutral-400 transition group-hover:translate-x-0.5 group-hover:text-violet-700"
              />
            </Link>

            <Link
              href="/my-bookings"
              className="group flex items-center justify-between rounded-2xl border border-neutral-200 p-4 transition hover:border-violet-200 hover:bg-violet-50/60"
            >
              <span className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-fuchsia-100 text-fuchsia-700">
                  <CheckCircle2 size={21} />
                </span>

                <span>
                  <span className="block text-sm font-semibold text-neutral-900">
                    My Bookings
                  </span>
                  <span className="mt-1 block text-xs text-neutral-500">
                    View your reservations
                  </span>
                </span>
              </span>

              <ChevronRight
                size={18}
                className="text-neutral-400 transition group-hover:translate-x-0.5 group-hover:text-violet-700"
              />
            </Link>
          </div>
        </section>

        {/* Footer note */}
        <p className="mt-6 text-center text-xs leading-5 text-neutral-500">
          Your creative journey starts at StudioSpace.
        </p>
      </div>
    </main>
  );
};

export default ProfilePage;
