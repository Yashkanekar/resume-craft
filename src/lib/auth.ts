import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma"; // only if you're using Prisma

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [Github,Google],
  adapter: PrismaAdapter(prisma), // optional but recommended if using DB
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id; // this makes session.user.id available!
      }
      return session;
    },
  },
});
