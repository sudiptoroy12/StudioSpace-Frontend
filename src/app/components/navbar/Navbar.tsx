"use client";

import Link from "next/link";
import { PanelsTopLeft } from "lucide-react";
import { usePathname } from "next/navigation";
import UserInfo from "./UserInfo";
import ThemeToggle from "../theme/ThemeToggle";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Explore Studios", href: "/studios" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "About Us", href: "/#about" },
];

const Navbar = () => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/#how-it-works" || href === "/#about") return false;

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const getNavClass = (active: boolean) =>
    `relative shrink-0 whitespace-nowrap rounded-xl px-3 py-2 text-sm font-semibold transition-all duration-200 ${
      active
        ? "bg-white/15 text-[#D6B98C]"
        : "text-[#F7F1E8]/85 hover:bg-white/10 hover:text-[#D6B98C]"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full  border-b border-[#D6B98C]/20 bg-gradient-to-r from-[#211629] via-[#39243F] to-[#A78BBA] shadow-md">
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute -right-10 -top-24 h-64 w-64 rounded-full border border-[#D6B98C]/20" />

      <div className="pointer-events-none absolute -right-4 -top-16 h-48 w-48 rounded-full border border-[#D6B98C]/20" />

      <div className="pointer-events-none absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-[#D6B98C]/10 blur-2xl" />

      {/* Main Navbar */}
      <div className="relative mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2.5"
          aria-label="StudioSpace home"
        >
          {/* Logo Icon */}
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D6B98C] text-[#211629] shadow-md shadow-black/10 transition-all duration-300 group-hover:rotate-6 group-hover:scale-105 sm:h-11 sm:w-11">
            <PanelsTopLeft size={26} strokeWidth={2} />
          </span>

          {/* Brand Name */}
          <span className="text-lg font-extrabold tracking-tight text-[#F7F1E8] sm:text-2xl">
            Studio
            <span className="text-[#D6B98C]">Space</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-1 lg:flex"
        >
          {navLinks.map((link) => {
            const active = isActive(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={getNavClass(active)}
              >
                {link.label}

                {active && (
                  <span className="absolute inset-x-3 -bottom-[17px] h-[3px] rounded-full bg-[#D6B98C]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-2 ">
          <ThemeToggle />
          <UserInfo />
        </div>
      </div>

      {/* Mobile and Tablet Navigation */}
      <nav
        aria-label="Mobile navigation"
        className="relative flex items-center gap-1 overflow-x-auto border-t border-white/15 px-3 py-2 lg:hidden"
      >
        {navLinks.map((link) => {
          const active = isActive(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={getNavClass(active)}
            >
              {link.label}

              {active && (
                <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-[#D6B98C]" />
              )}
            </Link>
          );
        })}
      </nav>
    </header>
  );
};

export default Navbar;