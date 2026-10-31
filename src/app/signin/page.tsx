"use client";

import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Eye, EyeOff, Sparkles } from "lucide-react";

const SignInPage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    setLoading(true);
    setErrorMessage("");

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        const message = "Invalid email address or password.";
        setErrorMessage(message);
        toast.error(message);
        return;
      }

      if (data) {
        form.reset();
        toast.success("Welcome back to StudioSpace!");
        router.push("/");
      }
    } catch {
      const message = "Something went wrong while signing in.";
      setErrorMessage(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/?socialLogin=success",
      });

      if (error) {
        toast.error(error.message || "Google sign-in failed.");
      }
    } catch {
      toast.error("Something went wrong with Google sign-in.");
    }
  };

  const handleGithubLogin = async () => {
    try {
      const { error } = await authClient.signIn.social({
        provider: "github",
        callbackURL: "/?socialLogin=success",
      });

      if (error) {
        toast.error(error.message || "GitHub sign-in failed.");
      }
    } catch {
      toast.error("Something went wrong with GitHub sign-in.");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10 text-gray-900 transition-colors duration-300 dark:bg-neutral-950 dark:text-neutral-100">
      <div className="w-full max-w-md">
        {/* StudioSpace branding */}
        <div className="mb-7 text-center">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="mb-5 inline-flex items-center justify-center gap-2"
            aria-label="StudioSpace home"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-600 text-white shadow-lg shadow-violet-200/60 transition-colors dark:shadow-violet-950/40">
              <Sparkles size={24} />
            </span>

            <span className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Studio<span className="text-violet-600 dark:text-violet-400">Space</span>
            </span>
          </button>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Welcome back
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-neutral-400">
            Sign in to discover creative spaces and manage your studio bookings.
          </p>
        </div>

        {/* Sign-in card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-neutral-800 dark:bg-neutral-900 sm:p-7">
          <form onSubmit={onSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-neutral-300"
              >
                Email address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
                className="h-11 w-full rounded-lg border border-gray-200 bg-white px-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-violet-600 focus:ring-2 focus:ring-violet-100 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder:text-neutral-500 dark:focus:border-violet-500 dark:focus:ring-violet-500/20"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-neutral-300"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  placeholder="Enter your password"
                  className="h-11 w-full rounded-lg border border-gray-200 bg-white px-4 pr-12 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-violet-600 focus:ring-2 focus:ring-violet-100 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder:text-neutral-500 dark:focus:border-violet-500 dark:focus:ring-violet-500/20"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-gray-800 dark:text-neutral-400 dark:hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>

            {/* Error message */}
            {errorMessage && (
              <div
                role="alert"
                className="rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300"
              >
                {errorMessage}
              </div>
            )}

            {/* Sign-in button */}
            <button
              type="submit"
              disabled={loading}
              className="h-11 w-full rounded-lg bg-violet-600 font-semibold text-white shadow-sm transition duration-200 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-white disabled:cursor-not-allowed disabled:opacity-60 dark:focus:ring-offset-neutral-900"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-200 dark:bg-neutral-700" />
            <span className="text-xs text-gray-400 dark:text-neutral-500">
              OR CONTINUE WITH
            </span>
            <div className="h-px flex-1 bg-gray-200 dark:bg-neutral-700" />
          </div>

          {/* Social sign-in */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="flex h-10 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-violet-500/30 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700"
            >
              <span className="text-base font-bold text-blue-500">G</span>
              Google
            </button>

            <button
              type="button"
              onClick={handleGithubLogin}
              className="flex h-10 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-violet-500/30 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-2.13c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.17 1.18a10.98 10.98 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.08.78 2.18v3.24c0 .3.21.66.79.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
              </svg>
              GitHub
            </button>
          </div>

          {/* Sign-up link */}
          <p className="mt-6 text-center text-sm text-gray-500 dark:text-neutral-400">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              onClick={() => router.push("/signup")}
              className="font-semibold text-violet-600 transition hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
            >
              Create an account
            </button>
          </p>
        </div>

        {/* Back to home */}
        <button
          type="button"
          onClick={() => router.push("/")}
          className="mx-auto mt-5 block text-sm text-gray-400 transition hover:text-gray-600 dark:text-neutral-500 dark:hover:text-neutral-300"
        >
          &larr; Back to StudioSpace
        </button>

        <p className="mt-6 text-center text-xs text-gray-400 dark:text-neutral-500">
          Find your space. Create something extraordinary.
        </p>
      </div>
    </main>
  );
};

export default SignInPage;