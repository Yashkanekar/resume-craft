"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useTheme } from "next-themes"; // Import theme hook

export default function UserButton() {
  const { data: session } = useSession();
  const { resolvedTheme } = useTheme(); // Get resolved theme
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen((prev) => !prev);

  return (
    <div className="relative">
      {/* Profile Button */}
      <button
        onClick={toggleMenu}
        className="flex items-center gap-2 rounded-lg p-2 transition-all hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <Image
          src={session?.user?.image || "/default-avatar.png"}
          alt="User Avatar"
          width={35}
          height={35}
          className="rounded-full"
        />
        <span className="text-gray-900 dark:text-gray-100">
          {session?.user?.name || "User"}
        </span>
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div
          className={`absolute right-0 mt-2 w-40 rounded-lg border p-2 shadow-lg ${
            resolvedTheme === "dark"
              ? "border-gray-700 bg-gray-900 text-white"
              : "border-gray-200 bg-white text-black"
          }`}
        >
          <Link
            href="/profile"
            className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Profile
          </Link>
          <button
            onClick={() => signOut()}
            className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
