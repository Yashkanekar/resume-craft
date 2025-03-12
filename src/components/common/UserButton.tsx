"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function UserButton() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  if (!session) {
    return (
      <Link href="/login" className="px-4 py-2 text-sm font-medium">
        Sign In
      </Link>
    );
  }

  const toggleMenu = () => setOpen(!open);

  return (
    <div className="relative">
      <button onClick={toggleMenu} className="flex items-center gap-2">
        <Image
          src={session.user?.image || "/default-avatar.png"}
          alt="User Avatar"
          width={35}
          height={35}
          className="rounded-full"
        />
        <span>{session.user?.name || "User"}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 rounded-lg border bg-white p-2 shadow-lg">
          <Link
            href="/profile"
            className="block px-4 py-2 text-sm hover:bg-gray-100"
          >
            Profile
          </Link>
          <Link
            href="/billing"
            className="block px-4 py-2 text-sm hover:bg-gray-100"
          >
            Billing
          </Link>
          <button
            onClick={() => signOut()}
            className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
