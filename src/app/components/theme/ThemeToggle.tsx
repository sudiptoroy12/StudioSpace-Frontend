
"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();

  const mounted = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="box-border inline-flex h-10 w-10 min-h-10 min-w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#E9E0E9] bg-white text-[#39243F] transition-all duration-200 hover:border-[#A78BBA] hover:bg-[#F7F1E8] hover:text-[#76577F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BBA] focus-visible:ring-offset-2 dark:border-[#49394D] dark:bg-[#39243F] dark:text-[#D6B98C] dark:hover:border-[#A78BBA] dark:hover:bg-[#49394D] dark:hover:text-[#F7F1E8] dark:focus-visible:ring-offset-[#211629]"
    >
      <span className="flex h-5 w-5 shrink-0 items-center justify-center">
        {mounted ? (
          isDark ? (
            <Sun size={19} strokeWidth={2} />
          ) : (
            <Moon size={19} strokeWidth={2} />
          )
        ) : (
          <span className="block h-[19px] w-[19px]" />
        )}
      </span>
    </button>
  );
};

export default ThemeToggle;

