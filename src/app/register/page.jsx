"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const Page = () => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const location = form.location.value.trim();
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters!");
      return;
    }

    try {
      setLoading(true);

      const result = await authClient.signUp.email({
        name,
        email,
        password,
        phone,
        location,
      });

      console.log("REGISTER RESULT:", result);

      if (result.error) {
        console.error("BETTER AUTH ERROR:", result.error);

        toast.error(
          result.error.message ||
            result.error.statusText ||
            "Registration failed!"
        );

        return;
      }

      toast.success("Account created successfully!");

      form.reset();

      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 800);
    } catch (error) {
      console.error("REGISTRATION ERROR:", error);

      toast.error(
        error?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f8f5e9] px-4 py-12 text-[#25382d] sm:px-6">
      <div className="mx-auto w-full max-w-2xl">

        {/* Header */}
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="text-3xl font-black tracking-tight text-[#25382d]"
          >
            Pure<span className="text-[#c88a0a]">Nature</span>
          </Link>

          <h1 className="mt-6 text-3xl font-black sm:text-4xl">
            Create Your Account
          </h1>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#68756c] sm:text-base">
            Join PureNature and enjoy pure, fresh and naturally sourced
            products for your everyday life.
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-[28px] border border-[#e5dfcc] bg-white p-5 shadow-[0_15px_50px_rgba(37,56,45,0.08)] sm:p-8 lg:p-10">
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-[#385b4b]"
              >
                Full Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                required
                disabled={loading}
                className="h-12 w-full rounded-xl border border-[#ddd8c8] bg-[#fbfaf5] px-4 text-sm text-[#25382d] outline-none transition placeholder:text-[#9aa49d] focus:border-[#c88a0a] focus:ring-4 focus:ring-[#e5ae2f]/15 disabled:opacity-60"
              />
            </div>

            {/* Email + Phone */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-[#385b4b]"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  disabled={loading}
                  className="h-12 w-full rounded-xl border border-[#ddd8c8] bg-[#fbfaf5] px-4 text-sm text-[#25382d] outline-none transition placeholder:text-[#9aa49d] focus:border-[#c88a0a] focus:ring-4 focus:ring-[#e5ae2f]/15 disabled:opacity-60"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-semibold text-[#385b4b]"
                >
                  Phone Number
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="01XXXXXXXXX"
                  required
                  disabled={loading}
                  className="h-12 w-full rounded-xl border border-[#ddd8c8] bg-[#fbfaf5] px-4 text-sm text-[#25382d] outline-none transition placeholder:text-[#9aa49d] focus:border-[#c88a0a] focus:ring-4 focus:ring-[#e5ae2f]/15 disabled:opacity-60"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label
                htmlFor="location"
                className="mb-2 block text-sm font-semibold text-[#385b4b]"
              >
                Location
              </label>

              <input
                id="location"
                name="location"
                type="text"
                placeholder="Enter your city / area"
                required
                disabled={loading}
                className="h-12 w-full rounded-xl border border-[#ddd8c8] bg-[#fbfaf5] px-4 text-sm text-[#25382d] outline-none transition placeholder:text-[#9aa49d] focus:border-[#c88a0a] focus:ring-4 focus:ring-[#e5ae2f]/15 disabled:opacity-60"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-[#385b4b]"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  required
                  minLength={8}
                  disabled={loading}
                  className="h-12 w-full rounded-xl border border-[#ddd8c8] bg-[#fbfaf5] px-4 pr-12 text-sm text-[#25382d] outline-none transition placeholder:text-[#9aa49d] focus:border-[#c88a0a] focus:ring-4 focus:ring-[#e5ae2f]/15 disabled:opacity-60"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-[#68756c] transition hover:bg-[#f8f5e9]"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>

              <p className="mt-2 text-xs text-[#7b857e]">
                Password must contain at least 8 characters.
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-semibold text-[#385b4b]"
              >
                Confirm Password
              </label>

              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  required
                  minLength={8}
                  disabled={loading}
                  className="h-12 w-full rounded-xl border border-[#ddd8c8] bg-[#fbfaf5] px-4 pr-12 text-sm text-[#25382d] outline-none transition placeholder:text-[#9aa49d] focus:border-[#c88a0a] focus:ring-4 focus:ring-[#e5ae2f]/15 disabled:opacity-60"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  disabled={loading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-[#68756c] transition hover:bg-[#f8f5e9]"
                >
                  {showConfirmPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3 pt-1">
              <input
                id="terms"
                type="checkbox"
                required
                disabled={loading}
                className="mt-1 h-4 w-4 accent-[#c88a0a]"
              />

              <label
                htmlFor="terms"
                className="text-xs leading-5 text-[#68756c]"
              >
                I agree to the{" "}
                <span className="font-semibold text-[#b77a00]">
                  Terms & Conditions
                </span>{" "}
                and{" "}
                <span className="font-semibold text-[#b77a00]">
                  Privacy Policy
                </span>
                .
              </label>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="flex h-12 w-full items-center justify-center rounded-xl bg-[#c88a0a] px-5 text-sm font-bold text-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-[#a87300] hover:shadow-lg active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Creating Account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Login */}
          <div className="mt-7 border-t border-[#ebe6d8] pt-6 text-center">
            <p className="text-sm text-[#68756c]">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-bold text-[#b77a00] transition hover:text-[#385b4b]"
              >
                Login
              </Link>
            </p>
          </div>
        </div>

      </div>
    </main>
  );
};

export default Page;