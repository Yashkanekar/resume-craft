import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

// Define public routes (accessible without authentication)
const publicRoutes = ["/", "/sign-in", "/sign-up"];

export async function middleware(req: NextRequest) {
  const session = await auth();
  const { pathname } = req.nextUrl;

  // Allow public routes without authentication
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // If no session, redirect to login
  if (!session) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.url)); //req.url contains the full original req url and new URL just create a new url object and the path adjusts accordingly to full og req(domain)/login
  }

  // Allow access if user is authenticated
  return NextResponse.next();
}

// Apply middleware to all routes except static files and API
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
