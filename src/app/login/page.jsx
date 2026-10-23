"use client";

import React, { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const Page = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;

    const email = form.email.value.trim();
    const password = form.password.value;

    if (!email || !password) {
      toast.error("Please fill in all fields!");
      return;
    }

    try {
      setLoading(true);

      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });
  

      console.log("LOGIN DATA:", data);
      console.log("LOGIN ERROR:", error);




      if (error) {
        toast.error(error.message || "Invalid email or password!");
        return;
      }

      toast.success("Login successful!");

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    toast("Password reset feature coming soon.", {
      icon: "🔐",
    });
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8f5e9] px-4 py-12 text-[#25382d] sm:px-6">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="text-3xl font-black tracking-tight text-[#25382d]"
          >
            Pure<span className="text-[#c88a0a]">Nature</span>
          </Link>

          <h1 className="mt-7 text-3xl font-black tracking-tight sm:text-4xl">
            Welcome Back
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#68756c] sm:text-base">
            Login to your PureNature account and continue shopping
            naturally.
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-[28px] border border-[#e5dfcc] bg-white p-5 shadow-[0_15px_50px_rgba(37,56,45,0.08)] sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
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

            {/* Password */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-[#385b4b]"
                >
                  Password
                </label>

           
              </div>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                  disabled={loading}
                  className="h-12 w-full rounded-xl border border-[#ddd8c8] bg-[#fbfaf5] px-4 pr-12 text-sm text-[#25382d] outline-none transition placeholder:text-[#9aa49d] focus:border-[#c88a0a] focus:ring-4 focus:ring-[#e5ae2f]/15 disabled:opacity-60"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-[#68756c] transition hover:bg-[#f8f5e9]"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Remember */}
            <div className="flex items-center">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                disabled={loading}
                className="h-4 w-4 cursor-pointer rounded border-[#d9d2bd] accent-[#c88a0a]"
              />

              <label
                htmlFor="remember"
                className="ml-2 cursor-pointer text-sm text-[#68756c]"
              >
                Remember me
              </label>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="flex h-12 w-full items-center justify-center rounded-xl bg-[#c88a0a] px-5 text-sm font-bold text-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:bg-[#a87300] hover:shadow-lg active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </button>
          </form>

          {/* Register */}
          <div className="mt-7 border-t border-[#ebe6d8] pt-6 text-center">
            <p className="text-sm text-[#68756c]">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="font-bold text-[#b77a00] transition hover:text-[#385b4b]"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>

        {/* Security */}
        <p className="mt-5 text-center text-xs text-[#89938c]">
          🔒 Your account information is securely protected.
        </p>
      </div>
    </main>
  );
};

export default Page;