"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  Eye,
  EyeOff,
  Check,
  Circle,
  Sparkles,
} from "lucide-react";
import { SignupSkeleton } from "../components/SignupSkeleton";

const SignUpPage = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");

  // Password requirements
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasMinLength = password.length >= 6;

  const passwordIsValid =
    hasUppercase && hasLowercase && hasMinLength;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const confirmPassword = String(
      formData.get("confirmPassword") ?? ""
    );

    setErrorMessage("");

    if (!passwordIsValid) {
      setErrorMessage(
        "Please meet all password requirements before continuing."
      );
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        image: "",
        callbackURL: "/",
      });

      if (error) {
        const message =
          error.message || "Unable to create your account.";
        setErrorMessage(message);
        toast.error(message);
        return;
      }

      if (data) {
        form.reset();
        setPassword("");
        toast.success("Your StudioSpace account has been created!");
        router.push("/");
      }
    } catch {
      const message =
        "Something went wrong while creating your account.";
      setErrorMessage(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // Google signup
  const handleGoogleLogin = async () => {
    try {
      const { error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/?socialLogin=success",
      });

      if (error) {
        toast.error(error.message || "Google signup failed.");
      }
    } catch {
      toast.error("Something went wrong with Google signup.");
    }
  };

  // GitHub signup
  const handleGithubLogin = async () => {
    try {
      const { error } = await authClient.signIn.social({
        provider: "github",
        callbackURL: "/?socialLogin=success",
      });

      if (error) {
        toast.error(error.message || "GitHub signup failed.");
      }
    } catch {
      toast.error("Something went wrong with GitHub signup.");
    }
  };

  const passwordRuleClass = (isValid: boolean) =>
    `flex items-center gap-2 text-xs transition-colors ${
      isValid
        ? "text-emerald-600 dark:text-emerald-400"
        : "text-gray-500 dark:text-neutral-400"
    }`;

  const inputClass =
    "h-11 w-full rounded-lg border border-gray-200 bg-white px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-violet-600 focus:ring-2 focus:ring-violet-100 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder:text-neutral-500 dark:focus:border-violet-500 dark:focus:ring-violet-500/20";

  const visibilityButtonClass =
    "absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-gray-800 dark:text-neutral-400 dark:hover:text-white";

  const labelClass =
    "mb-2 block text-sm font-medium text-gray-700 dark:text-neutral-300";

  const socialButtonClass =
    "flex h-10 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-violet-500/30 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700";

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
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-600 text-white shadow-lg shadow-violet-200/60 dark:shadow-violet-950/40">
              <Sparkles size={24} />
            </span>

            <span className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Studio
              <span className="text-violet-600 dark:text-violet-400">
                Space
              </span>
            </span>
          </button>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Create your account
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-neutral-400">
            Join StudioSpace and discover spaces for your next creative project.
          </p>
        </div>

        {/* Signup card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-colors duration-300 dark:border-neutral-800 dark:bg-neutral-900 sm:p-7">
          {loading ? (
            <SignupSkeleton />
          ) : (
            <form onSubmit={onSubmit} className="space-y-5">
              {/* Full name */}
              <div>
                <label htmlFor="name" className={labelClass}>
                  Full name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  placeholder="Enter your full name"
                  className={inputClass}
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className={labelClass}>
                  Email address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className={labelClass}>
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrorMessage("");
                    }}
                    placeholder="Create a strong password"
                    aria-describedby="password-requirements"
                    className={`${inputClass} pr-12`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className={visibilityButtonClass}
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>

                {/* Live password requirements */}
                <div
                  id="password-requirements"
                  className="mt-3 rounded-lg border border-gray-100 bg-gray-50 p-3 transition-colors dark:border-neutral-800 dark:bg-neutral-800/70"
                >
                  <p className="mb-2 text-xs font-semibold text-gray-700 dark:text-neutral-300">
                    Your password must contain:
                  </p>

                  <ul className="space-y-2">
                    <li className={passwordRuleClass(hasUppercase)}>
                      {hasUppercase ? (
                        <Check size={15} />
                      ) : (
                        <Circle size={13} />
                      )}
                      At least one uppercase letter (A–Z)
                    </li>

                    <li className={passwordRuleClass(hasLowercase)}>
                      {hasLowercase ? (
                        <Check size={15} />
                      ) : (
                        <Circle size={13} />
                      )}
                      At least one lowercase letter (a–z)
                    </li>

                    <li className={passwordRuleClass(hasMinLength)}>
                      {hasMinLength ? (
                        <Check size={15} />
                      ) : (
                        <Circle size={13} />
                      )}
                      At least 6 characters
                    </li>
                  </ul>
                </div>
              </div>

              {/* Confirm password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className={labelClass}
                >
                  Confirm password
                </label>

                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    minLength={6}
                    placeholder="Re-enter your password"
                    className={`${inputClass} pr-12`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword((prev) => !prev)
                    }
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                    className={visibilityButtonClass}
                  >
                    {showConfirmPassword ? (
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

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="h-11 w-full rounded-lg bg-violet-600 font-semibold text-white transition duration-200 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-white disabled:cursor-not-allowed disabled:opacity-60 dark:focus:ring-offset-neutral-900"
              >
                Create account
              </button>
            </form>
          )}

          {/* Divider */}
          <div className="my-5 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-200 dark:bg-neutral-700" />
            <span className="text-xs text-gray-400 dark:text-neutral-500">
              OR SIGN UP WITH
            </span>
            <div className="h-px flex-1 bg-gray-200 dark:bg-neutral-700" />
          </div>

          {/* Social signup */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className={socialButtonClass}
            >
              <span className="text-base font-bold text-blue-500">G</span>
              Google
            </button>

            <button
              type="button"
              onClick={handleGithubLogin}
              className={socialButtonClass}
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-2.13c0-.3-.21-.65-.78-.55-4.57-1.52-7.86-5.83-7.86-10.91C.5 5.65 5.65.5 12 .5Zm0 0C18.35.5 23.5 5.65 23.5 12a11.51 11.51 0 0 1-7.86 10.91c-.58.11-.79-.25-.79-.55v-3.24c0-1.1-.37-1.82-.78-2.18 2.56-.29 5.25-1.26 5.25-5.68 0-1.26-.45-2.29-1.19-3.1.12-.29.52-1.47-.11-3.06 0 0-.97-.31-3.17 1.18a10.98 10.98 0 0 0-5.77 0C6.88 4.79 5.91 5.1 5.91 5.1c-.63 1.59-.23 2.77-.11 3.06-.74.81-1.19 1.84-1.19 3.1 0 4.41 2.68 5.4 5.23 5.69-.33.29-.63.79-.73 1.54-.66.29-2.33.8-3.36-.96 0 0-.61-1.11-1.77-1.19 0 0-1.13-.01-.08.71 0 0 .76.36 1.28 1.69 0 0 .67 2.24 3.87 1.54v2.13c0 .3-.21.65-.78.55C3.79 21.39.5 17.08.5 12 .5 5.65 5.65.5 12 .5Z" />
              </svg>
              GitHub
            </button>
          </div>

          {/* Login link */}
          <p className="mt-6 text-center text-sm text-gray-500 dark:text-neutral-400">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="font-semibold text-violet-600 transition hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
            >
              Sign in
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

export default SignUpPage;