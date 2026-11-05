
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

  // Reusable StudioSpace theme classes
  const pageBackground =
    "min-h-screen bg-[#F7F1E8] text-[#211629] dark:bg-[#211629] dark:text-[#F7F1E8]";

  const card =
    "rounded-3xl border border-[#E8DCCB] bg-white shadow-sm dark:border-[#59465F] dark:bg-[#39243F]";

  const heading = "font-bold text-[#211629] dark:text-[#F7F1E8]";

  const mutedText = "text-[#766B7D] dark:text-[#C6B8CB]";

  const detailCard =
    "rounded-2xl border border-[#E8DCCB] bg-[#F7F1E8]/70 p-5 dark:border-[#59465F] dark:bg-[#211629]/50";

  const inputClass =
    "w-full rounded-xl border border-[#E8DCCB] bg-white px-4 py-3 text-sm text-[#211629] outline-none transition placeholder:text-[#A092A7] focus:border-[#A78BBA] focus:ring-4 focus:ring-[#A78BBA]/15 dark:border-[#59465F] dark:bg-[#211629] dark:text-[#F7F1E8] dark:placeholder:text-[#8F7C98] dark:focus:border-[#D6B98C] dark:focus:ring-[#D6B98C]/10";

  if (isPending) {
    return (
      <main className={`${pageBackground} px-4 py-10 sm:px-6`}>
        <div className="mx-auto max-w-5xl animate-pulse space-y-6">
          <div className="h-5 w-40 rounded bg-[#E8DCCB] dark:bg-[#59465F]" />
          <div className="h-52 rounded-3xl bg-white dark:bg-[#39243F]" />
          <div className="h-72 rounded-3xl bg-white dark:bg-[#39243F]" />
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main
        className={`flex min-h-[70vh] items-center justify-center px-4 py-12 ${pageBackground}`}
      >
        <section className={`${card} w-full max-w-md p-8 text-center`}>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#A78BBA]/15 text-[#39243F] dark:bg-[#D6B98C]/10 dark:text-[#D6B98C]">
            <CircleUserRound size={32} />
          </div>

          <h1 className={`mt-5 text-2xl ${heading}`}>
            Sign in to your account
          </h1>

          <p className={`mt-2 text-sm leading-6 ${mutedText}`}>
            Sign in to view and manage your StudioSpace profile.
          </p>

          <Link
            href="/signin"
            className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-[#39243F] px-5 py-3 font-semibold text-[#F7F1E8] transition hover:bg-[#211629] dark:bg-[#D6B98C] dark:text-[#211629] dark:hover:bg-[#E3CBA5]"
          >
            Sign In
          </Link>

          <Link
            href="/"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#766B7D] transition hover:text-[#A78BBA] dark:text-[#C6B8CB] dark:hover:text-[#D6B98C]"
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
    <main className="relative min-h-screen overflow-hidden bg-[#F7F1E8] px-4 py-10 text-[#211629] dark:bg-[#211629] dark:text-[#F7F1E8] sm:px-6 lg:px-8">

  {/* Background Glow Effects */}
  <div className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full bg-[#D6B98C]/20 blur-3xl dark:bg-[#A78BBA]/10" />

  <div className="pointer-events-none absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-[#A78BBA]/15 blur-3xl dark:bg-[#39243F]/60" />

  {/* Main Content */}
  <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-7 flex items-center gap-2 text-sm"
        >
          <Link
            href="/"
            className={`${mutedText} font-medium transition hover:text-[#A78BBA] dark:hover:text-[#D6B98C]`}
          >
            Home
          </Link>

          <ChevronRight
            size={15}
            className="text-[#A092A7] dark:text-[#8F7C98]"
          />

          <span className="font-semibold text-[#39243F] dark:text-[#D6B98C]">
            My Profile
          </span>
        </nav>

        {/* Page heading */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm font-semibold tracking-wide text-[#A78BBA] dark:text-[#D6B98C]">
            <Aperture size={18} />
            <span>YOUR STUDIOSPACE ACCOUNT</span>
          </div>

          <h1 className={`mt-3 text-3xl tracking-tight sm:text-4xl ${heading}`}>
            My Profile
          </h1>

          <p className={`mt-3 max-w-2xl text-sm leading-6 sm:text-base ${mutedText}`}>
            Manage your personal information and keep your account details up
            to date.
          </p>
        </div>

        {/* Profile banner */}
        <section className={`${card} overflow-hidden`}>
          <div className="relative h-28 overflow-hidden bg-gradient-to-r from-[#211629] via-[#39243F] to-[#A78BBA] sm:h-36">
            <div className="pointer-events-none absolute -right-10 -top-24 h-64 w-64 rounded-full border border-[#D6B98C]/20" />
            <div className="pointer-events-none absolute -right-4 -top-16 h-48 w-48 rounded-full border border-[#D6B98C]/20" />
            <div className="pointer-events-none absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-[#D6B98C]/10 blur-2xl" />

            <div className="relative flex h-full items-start justify-end p-5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#F7F1E8]/30 bg-[#211629]/20 px-3 py-1.5 text-xs font-medium text-[#F7F1E8] backdrop-blur-sm">
                <ShieldCheck size={15} />
                Account Profile
              </span>
            </div>
          </div>

          <div className="px-5 pb-6 sm:px-8 sm:pb-8">
            <div className="-mt-12 flex flex-col gap-5 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
              {/* Avatar and user details */}
              <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-end ">
                <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-3xl border-4 border-white bg-[#A78BBA]/15 text-3xl font-bold text-[#9727b6] shadow-sm dark:border-[#39243F] dark:bg-[#211629] dark:text-[#D6B98C] sm:h-28 sm:w-28 z-10">
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

                <div className="min-w-0 pb-1 z-10">
                  <h2 className={`break-words text-white text-2xl sm:text-3xl ${heading}`}>
                    {user.name || "StudioSpace User"}
                  </h2>

                  <p className={`mt-1 break-all text-sm ${mutedText}`}>
                    {user.email}
                  </p>

                  <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#D6B98C]/20 px-3 py-1 text-xs font-semibold text-[#80602F] dark:bg-[#D6B98C]/10 dark:text-[#D6B98C]">
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
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#D6B98C]/60 bg-white px-4 py-3 text-sm font-semibold text-[#39243F] transition hover:border-[#A78BBA] hover:bg-[#A78BBA]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BBA] dark:border-[#A78BBA]/40 dark:bg-[#211629] dark:text-[#D6B98C] dark:hover:border-[#D6B98C] dark:hover:bg-[#D6B98C]/10"
              >
                {show ? <X size={17} /> : <Edit3 size={17} />}
                {show ? "Cancel Editing" : "Edit Profile"}
              </button>
            </div>
          </div>
        </section>

        {/* Profile information */}
        <section className={`${card} mt-7 p-5 sm:p-8`}>
          <div className="flex items-start gap-3 border-b border-[#E8DCCB] pb-5 dark:border-[#59465F]">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#A78BBA]/15 text-[#39243F] dark:bg-[#D6B98C]/10 dark:text-[#D6B98C]">
              <UserRound size={22} />
            </div>

            <div>
              <h2 className={`text-lg ${heading}`}>
                Personal Information
              </h2>

              <p className={`mt-1 text-sm ${mutedText}`}>
                Your basic account details.
              </p>
            </div>
          </div>

          {!show ? (
            <div className="grid gap-5 pt-6 sm:grid-cols-2">
              <div className={detailCard}>
                <div className={`flex items-center gap-2 text-sm font-medium ${mutedText}`}>
                  <UserRound size={17} />
                  Full Name
                </div>

                <p className={`mt-3 break-words font-semibold ${heading}`}>
                  {user.name || "Not provided"}
                </p>
              </div>

              <div className={detailCard}>
                <div className={`flex items-center gap-2 text-sm font-medium ${mutedText}`}>
                  <Mail size={17} />
                  Email Address
                </div>

                <p className={`mt-3 break-all font-semibold ${heading}`}>
                  {user.email}
                </p>
              </div>

              <div className={`${detailCard} sm:col-span-2`}>
                <div className={`flex items-center gap-2 text-sm font-medium ${mutedText}`}>
                  <Camera size={17} />
                  Profile Photo
                </div>

                <p className="mt-3 break-all text-sm font-medium text-[#39243F] dark:text-[#F7F1E8]">
                  {user.image || "No profile photo added"}
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleUpdateProfile} className="space-y-6 pt-6">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-[#39243F] dark:text-[#F7F1E8]"
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
                  className={inputClass}
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-[#39243F] dark:text-[#F7F1E8]"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  value={user.email}
                  readOnly
                  className="w-full cursor-not-allowed rounded-xl border border-[#E8DCCB] bg-[#F7F1E8] px-4 py-3 text-sm text-[#766B7D] dark:border-[#59465F] dark:bg-[#211629] dark:text-[#A092A7]"
                />

                <p className={`mt-2 text-xs ${mutedText}`}>
                  Email changes are not available in this form.
                </p>
              </div>

              {/* Profile image */}
              <div>
                <label
                  htmlFor="image"
                  className="mb-2 block text-sm font-semibold text-[#39243F] dark:text-[#F7F1E8]"
                >
                  Profile Photo URL
                </label>

                <input
                  id="image"
                  name="image"
                  type="url"
                  defaultValue={user.image || ""}
                  placeholder="https://example.com/photo.jpg"
                  className={inputClass}
                />

                <p className={`mt-2 text-xs leading-5 ${mutedText}`}>
                  Enter a publicly accessible image URL, or leave it empty to
                  remove your profile photo.
                </p>
              </div>

              {/* Form actions */}
              <div className="flex flex-col-reverse gap-3 border-t border-[#E8DCCB] pt-5 dark:border-[#59465F] sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setShow(false)}
                  disabled={isUpdating}
                  className="rounded-xl border border-[#D6B98C]/60 px-5 py-3 text-sm font-semibold text-[#39243F] transition hover:bg-[#E8DCCB] disabled:opacity-50 dark:border-[#A78BBA]/40 dark:text-[#F7F1E8] dark:hover:bg-[#211629]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isUpdating}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#39243F] px-6 py-3 text-sm font-semibold text-[#F7F1E8] shadow-sm transition hover:bg-[#211629] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BBA] focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#D6B98C] dark:text-[#211629] dark:hover:bg-[#E3CBA5] dark:focus-visible:ring-[#D6B98C] dark:focus-visible:ring-offset-[#39243F]"
                >
                  {isUpdating ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-current/40 border-t-current" />
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
        <section className={`${card} mt-7 p-5 sm:p-6`}>
          <h2 className={`text-lg ${heading}`}>
            Your StudioSpace
          </h2>

          <p className={`mt-1 text-sm ${mutedText}`}>
            Continue managing your studios and reservations.
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <Link
              href="/dashboard"
              className="group flex items-center justify-between rounded-2xl border border-[#E8DCCB] p-4 transition hover:border-[#D6B98C] hover:bg-[#F7F1E8] dark:border-[#59465F] dark:hover:border-[#A78BBA] dark:hover:bg-[#211629]/60"
            >
              <span className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#A78BBA]/15 text-[#39243F] dark:bg-[#D6B98C]/10 dark:text-[#D6B98C]">
                  <Aperture size={21} />
                </span>

                <span>
                  <span className={`block text-sm font-semibold ${heading}`}>
                    Dashboard
                  </span>
                  <span className={`mt-1 block text-xs ${mutedText}`}>
                    Manage your account
                  </span>
                </span>
              </span>

              <ChevronRight
                size={18}
                className="text-[#A092A7] transition group-hover:translate-x-0.5 group-hover:text-[#39243F] dark:text-[#8F7C98] dark:group-hover:text-[#D6B98C]"
              />
            </Link>

            <Link
              href="/my-bookings"
              className="group flex items-center justify-between rounded-2xl border border-[#E8DCCB] p-4 transition hover:border-[#D6B98C] hover:bg-[#F7F1E8] dark:border-[#59465F] dark:hover:border-[#A78BBA] dark:hover:bg-[#211629]/60"
            >
              <span className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D6B98C]/20 text-[#80602F] dark:bg-[#D6B98C]/10 dark:text-[#D6B98C]">
                  <CheckCircle2 size={21} />
                </span>

                <span>
                  <span className={`block text-sm font-semibold ${heading}`}>
                    My Bookings
                  </span>
                  <span className={`mt-1 block text-xs ${mutedText}`}>
                    View your reservations
                  </span>
                </span>
              </span>

              <ChevronRight
                size={18}
                className="text-[#A092A7] transition group-hover:translate-x-0.5 group-hover:text-[#39243F] dark:text-[#8F7C98] dark:group-hover:text-[#D6B98C]"
              />
            </Link>
          </div>
        </section>

        {/* Footer note */}
        <p className={`mt-6 text-center text-xs leading-5 ${mutedText}`}>
          Your creative journey starts at StudioSpace.
        </p>
      </div>
    </main>
  );
};

export default ProfilePage;
