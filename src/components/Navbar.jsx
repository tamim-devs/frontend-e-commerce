"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  LogOut,
  Menu,
  ShoppingBag,
  X,
  UserRound,
} from "lucide-react";
import { authClient, useSession } from "@/lib/auth-client";
import MyNavLink from "@/components/MyNavLink";
import { useCart } from "@/context/CartContext";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const { totalItems } = useCart();

  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const dashboardPath =
    session?.user?.role === "admin"
      ? "/dashboard/admin"
      : "/dashboard/buyer";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setDropdownOpen(false);
    setIsOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await authClient.signOut();
    setDropdownOpen(false);
    setIsOpen(false);
    router.push("/login");
    router.refresh();
  };

  const avatar = session?.user?.image;
  const userName = session?.user?.name || "User";
  const userEmail = session?.user?.email || "";

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#e8e2d2] bg-[#f8f5e9]/90 px-5 py-3.5 backdrop-blur-xl sm:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-black tracking-tight text-[#25382d] sm:text-3xl"
        >
          Pure<span className="text-[#c88a0a]">Nature</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <MyNavLink href="/">Home</MyNavLink>
          <MyNavLink href="/products">Products</MyNavLink>
          <MyNavLink href="/contact">Contact</MyNavLink>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Desktop Cart */}
          <Link
            href="/cart"
            aria-label={`Shopping cart, ${totalItems} items`}
            className="relative hidden h-10 items-center gap-2 rounded-xl border border-[#d9d2bd] bg-white px-3.5 text-sm font-semibold text-[#385b4b] transition hover:border-[#c88a0a] hover:text-[#a87300] sm:flex"
          >
            <ShoppingBag size={18} />
            <span>Cart</span>

            {totalItems > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#c88a0a] px-1 text-xs font-bold text-white">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Logged Out Actions */}
          {!session ? (
            <div className="hidden items-center gap-2 sm:flex">
              <Link
                href="/login"
                className="rounded-xl px-4 py-2.5 text-sm font-semibold text-[#385b4b] transition hover:bg-white hover:text-[#a87300]"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-xl bg-[#c88a0a] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#a87300]"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            /* Profile Dropdown */
            <div className="relative hidden sm:block" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-label="Open profile menu"
                aria-expanded={dropdownOpen}
                className="flex cursor-pointer items-center justify-center rounded-full outline-none transition hover:scale-105 focus-visible:ring-2 focus-visible:ring-[#c88a0a] focus-visible:ring-offset-2"
              >
                {avatar ? (
                  <img
                    src={avatar}
                    alt={userName}
                    className="h-10 w-10 rounded-full border-2 border-[#c88a0a] object-cover shadow-sm"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#c88a0a] bg-white text-[#385b4b]">
                    <UserRound size={21} />
                  </div>
                )}
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 z-[60] mt-3 w-64 overflow-hidden rounded-2xl border border-[#e8e2d2] bg-[#fffdf7] py-2 shadow-2xl">
                  {/* User Information */}
                  <div className="mb-1.5 border-b border-[#e8e2d2] px-4 py-3">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#a87300]">
                      {session.user?.role || "User"} Account
                    </p>

                    <p className="mt-1 truncate text-sm font-bold text-[#25382d]">
                      {userName}
                    </p>

                    <p className="mt-0.5 truncate text-xs text-[#7c8278]">
                      {userEmail}
                    </p>
                  </div>

                  {/* Dashboard */}
                  <Link
                    href={dashboardPath}
                    onClick={() => setDropdownOpen(false)}
                    className="flex w-full items-center gap-3 px-4 py-3 text-sm font-semibold text-[#385b4b] transition hover:bg-[#f8f5e9] hover:text-[#a87300]"
                  >
                    <LayoutDashboard size={17} />
                    My Dashboard
                  </Link>

                  {/* Profile */}
                  <Link
                    href={dashboardPath}
                    onClick={() => setDropdownOpen(false)}
                    className="flex w-full items-center gap-3 px-4 py-3 text-sm font-semibold text-[#385b4b] transition hover:bg-[#f8f5e9] hover:text-[#a87300]"
                  >
                    <UserRound size={17} />
                    Profile Settings
                  </Link>

                  <div className="my-1.5 border-t border-[#e8e2d2]" />

                  {/* Logout */}
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                  >
                    <LogOut size={17} />
                    Log Out
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#d9d2bd] bg-white text-[#25382d] transition hover:border-[#c88a0a] hover:bg-[#c88a0a] hover:text-white md:hidden"
          >
            {isOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mt-4 rounded-2xl border border-[#e8e2d2] bg-[#fffdf7] p-3 shadow-xl md:hidden">
          <div className="flex flex-col gap-1">
            <MyNavLink
              href="/"
              className="rounded-xl px-4 py-3 transition hover:bg-[#f8f5e9]"
            >
              Home
            </MyNavLink>

            <MyNavLink
              href="/products"
              className="rounded-xl px-4 py-3 transition hover:bg-[#f8f5e9]"
            >
              Products
            </MyNavLink>

       

            <MyNavLink
              href="/contact"
              className="rounded-xl px-4 py-3 transition hover:bg-[#f8f5e9]"
            >
              Contact
            </MyNavLink>

            <Link
              href="/cart"
              className="flex items-center justify-between rounded-xl px-4 py-3 font-medium text-[#385b4b] transition hover:bg-[#f8f5e9]"
            >
              <span className="flex items-center gap-3">
                <ShoppingBag size={18} />
                Cart
              </span>

              {totalItems > 0 && (
                <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-[#c88a0a] px-1.5 text-xs font-bold text-white">
                  {totalItems}
                </span>
              )}
            </Link>

            {session ? (
              <>
                {/* Mobile User Information */}
                <div className="my-2 flex items-center gap-3 rounded-xl border border-[#e8e2d2] bg-[#f8f5e9] p-3">
                  {avatar ? (
                    <img
                      src={avatar}
                      alt={userName}
                      className="h-11 w-11 rounded-full border-2 border-[#c88a0a] object-cover"
                    />
                  ) : (
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#c88a0a] bg-white text-[#385b4b]">
                      <UserRound size={22} />
                    </div>
                  )}

                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-[#25382d]">
                      {userName}
                    </p>
                    <p className="truncate text-xs text-[#7c8278]">
                      {userEmail}
                    </p>
                    <p className="mt-0.5 text-[10px] font-bold uppercase text-[#a87300]">
                      {session.user?.role || "User"} Account
                    </p>
                  </div>
                </div>

                <Link
                  href={dashboardPath}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-[#385b4b] transition hover:bg-[#f8f5e9]"
                >
                  <LayoutDashboard size={18} />
                  My Dashboard
                </Link>

                <Link
                  href={dashboardPath}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-[#385b4b] transition hover:bg-[#f8f5e9]"
                >
                  <UserRound size={18} />
                  Profile Settings
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-red-100 px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-50"
                >
                  <LogOut size={17} />
                  Log Out
                </button>
              </>
            ) : (
              <div className="mt-2 grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  className="rounded-xl border border-[#d9d2bd] bg-white px-4 py-3 text-center text-sm font-bold text-[#385b4b] transition hover:bg-[#f8f5e9]"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="rounded-xl bg-[#c88a0a] px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-[#a87300]"
                >
                  Sign Up
                </Link>
              </div>
            )}

            <Link
              href="/products"
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#c88a0a] px-5 py-3 font-bold text-white transition hover:bg-[#a87300]"
            >
              <ShoppingBag size={17} />
              Shop Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;