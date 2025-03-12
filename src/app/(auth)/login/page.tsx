"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Sign in with GitHub</h1>
        <button
          onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
        >
          Sign in with GitHub
        </button>
      </div>
    </div>
  );
}
