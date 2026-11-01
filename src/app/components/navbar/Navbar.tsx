"use client";

import Link from "next/link";
import { Aperture } from "lucide-react";
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
    if (href === "/#how-it-works") return pathname === "/#how-it-works";
    if (href === "/#about") return pathname === "/#about";

    return pathname === href || pathname.startsWith(`${href}/`);  
  };

  const getNavClass = (active: boolean) =>
    `relative shrink-0 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ${
      active
        ? "bg-violet-50 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300"
        : "text-neutral-600 hover:bg-neutral-50 hover:text-violet-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-violet-300"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200/80 bg-white/95 shadow-sm backdrop-blur-md transition-colors duration-300 dark:border-neutral-800 dark:bg-neutral-950/95">
      <div className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5"
          aria-label="StudioSpace home"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-600 text-white shadow-sm shadow-violet-200 transition-colors dark:shadow-violet-950/40">
            <Aperture size={27} strokeWidth={1.8} />
          </span>

          <span className="text-xl font-bold tracking-tight text-neutral-900 transition-colors dark:text-white sm:text-2xl">
            Studio
            <span className="text-violet-600 dark:text-violet-400">
              Space
            </span>
          </span>
        </Link>

        {/* Main navigation */}
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
                  <span className="absolute inset-x-3 -bottom-[17px] h-0.5 rounded-full bg-violet-600 dark:bg-violet-400" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Theme toggle and authentication / user menu */}
        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />
          <UserInfo />
        </div>
      </div>

      {/* Compact navigation for mobile and tablet */}
      <nav
        aria-label="Mobile navigation"
        className="flex items-center gap-1 overflow-x-auto border-t border-neutral-100 px-3 py-2 transition-colors duration-300 dark:border-neutral-800 lg:hidden"
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
            </Link>
          );
        })}
      </nav>
    </header>
  );
};

export default Navbar;