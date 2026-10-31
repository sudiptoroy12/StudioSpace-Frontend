
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  UserRound,
  LayoutDashboard,
  PlusCircle,
  Building2,
  CalendarCheck,
  LogOut,
  ChevronDown,
  LogIn,
  UserPlus,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import UserInfoSkeleton from "./UserInfoSkeleton";

const menuLinks = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Add New Studio",
    href: "/studios/new",
    icon: PlusCircle,
  },
  {
    label: "My Studio Listings",
    href: "/my-studios",
    icon: Building2,
  },
  {
    label: "My Bookings",
    href: "/my-bookings",
    icon: CalendarCheck,
  },
];

const UserInfo = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close the menu when clicking outside or pressing Escape.
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleSignout = async () => {
    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "Unable to sign out.");
        return;
      }

      setIsOpen(false);
      toast.success("You have signed out successfully.");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("Something went wrong while signing out.");
    }
  };

  if (isPending) {
    return <UserInfoSkeleton />;
  }

  // Unauthenticated state
  if (!user) {
    return (
      <div className="flex items-center gap-2 sm:gap-3">
        <Link
          href="/signin"
          className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-100 hover:text-violet-700 sm:px-4"
        >
          <LogIn size={17} />
          <span>Login</span>
        </Link>

        <Link
          href="/signup"
          className="inline-flex items-center gap-1.5 rounded-xl bg-violet-600 px-3 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 sm:px-4"
        >
          <UserPlus size={17} />
          <span>Register</span>
        </Link>
      </div>
    );
  }

  const initial = user.name?.trim().charAt(0).toUpperCase() || "U";

  return (
    <div
      ref={dropdownRef}
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Profile trigger */}
      <button
        type="button"
        onClick={() => setIsOpen((previous) => !previous)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label="Open user menu"
        className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white p-1.5 pr-2 transition hover:border-violet-200 hover:bg-violet-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 sm:gap-2.5 sm:pr-3"
      >
        <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-violet-100 text-sm font-bold text-violet-700">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name || "User avatar"}
              width={36}
              height={36}
              className="h-full w-full object-cover"
            />
          ) : (
            initial
          )}
        </span>

        <span className="hidden max-w-28 truncate text-sm font-semibold text-neutral-800 sm:block">
          {user.name || "My Account"}
        </span>

        <ChevronDown
          size={16}
          className={`text-neutral-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 w-[min(19rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl shadow-neutral-900/10"
        >
          {/* User details */}
          <div className="border-b border-neutral-100 bg-gradient-to-br from-violet-50 to-white px-5 py-4">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-violet-100 text-lg font-bold text-violet-700">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || "User avatar"}
                    width={44}
                    height={44}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  initial
                )}
              </span>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-neutral-900">
                  {user.name || "StudioSpace User"}
                </p>
                <p className="truncate text-xs text-neutral-500">
                  {user.email}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation links */}
          <div className="p-2">
            {menuLinks.map(({ label, href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                role="menuitem"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-neutral-700 transition hover:bg-violet-50 hover:text-violet-700"
              >
                <Icon size={18} className="shrink-0" />
                <span>{label}</span>
              </Link>
            ))}

            <Link
              href="/profile"
              role="menuitem"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-neutral-700 transition hover:bg-violet-50 hover:text-violet-700"
            >
              <UserRound size={18} className="shrink-0" />
              <span>My Profile</span>
            </Link>
          </div>

          {/* Logout */}
          <div className="border-t border-neutral-100 p-2">
            <button
              type="button"
              role="menuitem"
              onClick={handleSignout}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
