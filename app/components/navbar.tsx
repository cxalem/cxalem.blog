"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path === "/posts" && pathname.startsWith("/posts")) return true;
    if (path === "/about" && pathname === "/about") return true;
    return false;
  };

  return (
    <nav className="fixed top-4 sm:top-8 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white/60 dark:bg-neutral-800/90 backdrop-blur-sm rounded-full border border-neutral-300/50 dark:border-neutral-700/50 px-8 shadow-lg">
        <div className="flex items-center space-x-1">
          <Link
            href="/posts"
            className={`px-4 sm:px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              isActive("/posts")
                ? "bg-black/10 dark:bg-white/10 text-black dark:text-white shadow-sm"
                : "text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
            }`}
          >
            blog
          </Link>
          <Link
            href="/about"
            className={`px-4 sm:px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              isActive("/about")
                ? "bg-black/10 dark:bg-white/10 text-black dark:text-white shadow-sm"
                : "text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
            }`}
          >
            about
          </Link>
        </div>
      </div>
    </nav>
  );
}
