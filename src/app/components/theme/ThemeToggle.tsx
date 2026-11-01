
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
     
className="box-border inline-flex h-10 w-10 min-h-10 min-w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-neutral-200 bg-white text-neutral-700 transition-colors duration-200 hover:bg-violet-50 hover:text-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800 dark:hover:text-violet-300"

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
