
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  PlusCircle,
  Building2,
  CalendarCheck,
  UserRound,
  LogOut,
  LogIn,
  UserPlus,
  ChevronDown,
} from "lucide-react";
import { toast } from "react-toastify";

import { authClient } from "@/lib/auth-client";
import UserInfoSkeleton from "./UserInfoSkeleton";

const menuLinks = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Add New Studio",
    href: "/add-studios",
    icon: PlusCircle,
  },
  {
    label: "My Studio Listings",
    href: "/my-listings",
    icon: Building2,
  },
  {
    label: "My Bookings",
    href: "/my-bookings",
    icon: CalendarCheck,
  },
];

const menuLinkClass =
  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#75677C] transition hover:bg-[#A78BBA]/15 hover:text-[#39243F] dark:text-[#C5B7CA] dark:hover:bg-[#A78BBA]/10 dark:hover:text-[#D6B98C]";

const UserInfo = () => {
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  // Close dropdown when clicking outside or pressing Escape.
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

  const handleSignOut = async () => {
    try {
      await authClient.signOut();

      setIsOpen(false);
      toast.success("Successfully signed out!");

      router.push("/");
      router.refresh();
    } catch {
      toast.error("Unable to sign out. Please try again.");
    }
  };

  if (isPending) {
    return <UserInfoSkeleton />;
  }

  // Unauthenticated user buttons
  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/signin"
          className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-semibold text-[#39243F] transition hover:bg-[#A78BBA]/15 dark:text-[#D6B98C] dark:hover:bg-[#A78BBA]/10"
        >
          <LogIn size={17} />
          <span className="hidden sm:inline">Login</span>
        </Link>

        <Link
          href="/signup"
          className="flex items-center gap-1.5 rounded-xl bg-[#39243F] px-3 py-2 text-sm font-semibold text-white shadow-sm shadow-[#39243F]/20 transition hover:bg-[#503454] dark:bg-[#D6B98C] dark:text-[#211629] dark:hover:bg-[#E5CCA4]"
        >
          <UserPlus size={17} />
          <span className="hidden sm:inline">Register</span>
        </Link>
      </div>
    );
  }

  const userName = user.name || "User";
  const userEmail = user.email || "";
  const userImage = user.image;

  const initials = userName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      ref={dropdownRef}
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Profile Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="flex items-center gap-2 rounded-xl border border-[#E9E0E9] bg-white px-2 py-1.5 transition hover:border-[#A78BBA] hover:bg-[#F7F1E8] dark:border-[#49394D] dark:bg-[#39243F] dark:hover:border-[#A78BBA] dark:hover:bg-[#49394D]"
      >
        <span className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#E9E0E9] text-sm font-bold text-[#39243F] dark:bg-[#49394D] dark:text-[#D6B98C]">
          {userImage ? (
            <Image
              src={userImage}
              alt={userName}
              fill
              sizes="32px"
              className="object-cover"
            />
          ) : (
            initials
          )}
        </span>

        <span className="hidden max-w-[100px] truncate text-sm font-semibold text-[#211629] dark:text-[#F7F1E8] sm:block">
          {userName}
        </span>

        <ChevronDown
          size={16}
          className={`hidden text-[#75677C] transition-transform duration-200 dark:text-[#C5B7CA] sm:block ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-full z-50 w-64 pt-2">
          <div className="overflow-hidden rounded-2xl border border-[#E9E0E9] bg-white shadow-xl shadow-[#211629]/10 dark:border-[#49394D] dark:bg-[#39243F] dark:shadow-black/30 ">
            {/* User Information */}
            <div className="border-b border-[#E9E0E9] bg-gradient-to-br from-[#F7F1E8] to-white px-4 py-4 dark:border-[#49394D] dark:from-[#49394D] dark:to-[#39243F]">
              <div className="flex items-center gap-3">
                <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#E9E0E9] text-sm font-bold text-[#39243F] dark:bg-[#211629] dark:text-[#D6B98C]">
                  {userImage ? (
                    <Image
                      src={userImage}
                      alt={userName}
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  ) : (
                    initials
                  )}
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-[#211629] dark:text-[#F7F1E8]">
                    {userName}
                  </p>

                  <p className="truncate text-xs text-[#75677C] dark:text-[#C5B7CA]">
                    {userEmail}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="space-y-1 p-2">
              {menuLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={menuLinkClass}
                  >
                    <Icon size={17} />
                    {link.label}
                  </Link>
                );
              })}

              <div className="my-2 border-t border-[#E9E0E9] dark:border-[#49394D]" />

              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className={menuLinkClass}
              >
                <UserRound size={17} />
                My Profile
              </Link>

              <button
                type="button"
                onClick={handleSignOut}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
              >
                <LogOut size={17} />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
