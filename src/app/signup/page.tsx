
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
        const message = error.message || "Unable to create your account.";
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
    `flex items-center gap-2 text-xs ${
      isValid ? "text-emerald-600" : "text-gray-500"
    }`;

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-md">
        {/* StudioSpace branding */}
        <div className="mb-7 text-center">
          <div className="mb-5 flex items-center justify-center gap-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-600 text-white shadow-lg shadow-violet-200">
              <Sparkles size={24} />
            </div>

            <span className="text-2xl font-bold tracking-tight text-gray-900">
              Studio<span className="text-violet-600">Space</span>
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Create your account
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Join StudioSpace and discover spaces for your next creative project.
          </p>
        </div>

        {/* Signup card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-7">
          {loading ? (
            <SignupSkeleton />
          ) : (
            <form onSubmit={onSubmit} className="space-y-5">
              {/* Full name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Full name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  placeholder="Enter your full name"
                  className="h-11 w-full rounded-lg border border-gray-200 px-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-violet-600 focus:ring-2 focus:ring-violet-100"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-700"
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
                  className="h-11 w-full rounded-lg border border-gray-200 px-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-violet-600 focus:ring-2 focus:ring-violet-100"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
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
                    className="h-11 w-full rounded-lg border border-gray-200 px-4 pr-12 text-sm outline-none transition placeholder:text-gray-400 focus:border-violet-600 focus:ring-2 focus:ring-violet-100"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-gray-800"
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
                  className="mt-3 rounded-lg bg-gray-50 p-3"
                >
                  <p className="mb-2 text-xs font-semibold text-gray-700">
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
                  className="mb-2 block text-sm font-medium text-gray-700"
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
                    className="h-11 w-full rounded-lg border border-gray-200 px-4 pr-12 text-sm outline-none transition placeholder:text-gray-400 focus:border-violet-600 focus:ring-2 focus:ring-violet-100"
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
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-gray-800"
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
                  className="rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600"
                >
                  {errorMessage}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="h-11 w-full rounded-lg bg-violet-600 font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Create account
              </button>
            </form>
          )}

          {/* Divider */}
          <div className="my-5 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs text-gray-400">OR SIGN UP WITH</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Social signup */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="flex h-10 items-center justify-center gap-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              <span className="text-base font-bold text-blue-500">G</span>
              Google
            </button>

            <button
              type="button"
              onClick={handleGithubLogin}
              className="flex h-10 items-center justify-center gap-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
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

          {/* Login link */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="font-semibold text-violet-600 hover:text-violet-700"
            >
              Sign in
            </button>
          </p>
        </div>

        {/* Back to home */}
        <button
          type="button"
          onClick={() => router.push("/")}
          className="mx-auto mt-5 block text-sm text-gray-400 transition hover:text-gray-600"
        >
          &larr; Back to StudioSpace
        </button>

        <p className="mt-6 text-center text-xs text-gray-400">
          Find your space. Create something extraordinary.
        </p>
      </div>
    </main>
  );
};

export default SignUpPage;
