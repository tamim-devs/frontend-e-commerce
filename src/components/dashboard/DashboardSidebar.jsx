"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Home, PackagePlus, Package, ShoppingBag, Users, Settings, UserRound, LogOut } from "lucide-react";
import { authClient, useSession } from "@/lib/auth-client";

const DashboardSidebar = ({ role: propRole }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const role = propRole || session?.user?.role || "buyer";

  const adminMenu = [
    { name: "Dashboard", href: "/dashboard/admin", icon: Home },
    { name: "Add Product", href: "/dashboard/admin/add-products", icon: PackagePlus },
    { name: "Products", href: "/dashboard/admin/products", icon: Package },
    { name: "Orders", href: "/dashboard/admin/orders", icon: ShoppingBag },
    { name: "Customers", href: "/dashboard/admin/customers", icon: Users },
    { name: "Settings", href: "/dashboard/admin/settings", icon: Settings },
  ];

  const buyerMenu = [
    { name: "Dashboard", href: "/dashboard/buyer", icon: Home },
  ];

  const menuItems = role === "admin" ? adminMenu : buyerMenu;

  const closeSidebar = () => setIsOpen(false);

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      closeSidebar();
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      {/* Mobile Navbar */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-[#e5e7eb] bg-white p-4 md:hidden">
        <Link href="/" onClick={closeSidebar} className="text-2xl font-bold text-[#244b35]">
          PureNature
        </Link>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-2 text-[#244b35] transition hover:bg-green-50"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <button
          type="button"
          onClick={closeSidebar}
          aria-label="Close sidebar overlay"
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-64 flex-col border-r border-[#e5e7eb] bg-white p-5 transition-transform duration-300 md:sticky md:top-0 md:z-10 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="mb-6 flex items-center justify-between">
          <Link href="/" onClick={closeSidebar} className="text-2xl font-bold text-[#244b35]">
            PureNature
          </Link>

          <button
            type="button"
            onClick={closeSidebar}
            className="rounded-lg p-1 text-gray-500 transition hover:bg-gray-100 md:hidden"
            aria-label="Close sidebar"
          >
            <X size={22} />
          </button>
        </div>

        {/* User Profile */}
        <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-5">
          {session?.user?.image ? (
            <img
              src={session.user.image}
              alt={session.user.name || "User"}
              className="h-11 w-11 rounded-full border border-[#dce7df] object-cover"
            />
          ) : (
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-50 text-[#244b35]">
              <UserRound size={23} />
            </div>
          )}

          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-gray-800">
              {session?.user?.name || "User"}
            </p>
            <p className="truncate text-xs text-gray-500">
              {session?.user?.email || ""}
            </p>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#b17b12]">
              {role} account
            </span>
          </div>
        </div>

        {/* Navigation */}
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
          {role === "admin" ? "Admin Menu" : "Buyer Menu"}
        </p>

        <nav className="flex flex-1 flex-col gap-2 overflow-y-auto">
          {menuItems.map(({ name, href, icon: Icon }) => {
            const isActive =
              pathname === href ||
              (href !== `/dashboard/${role}` &&
                pathname.startsWith(`${href}/`));

            return (
              <Link
                key={href}
                href={href}
                onClick={closeSidebar}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  isActive
                    ? "bg-[#244b35] text-white shadow-sm"
                    : "text-gray-600 hover:bg-green-50 hover:text-[#244b35]"
                }`}
              >
                <Icon size={18} />
                <span>{name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Links */}
        <div className="mt-5 space-y-2 border-t border-gray-100 pt-4">
          <Link
            href="/"
            onClick={closeSidebar}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-[#244b35]"
          >
            <Home size={18} />
            Back to Home
          </Link>

          {session && (
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-gray-600 transition hover:bg-red-50 hover:text-red-600"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          )}
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;