import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { requireAuth } from "./lib/auth/auth";
export async function middleware(req: NextRequest) {
  try {
    await requireAuth();
  } catch {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/api/protected/:path*", "/chat/:path*"],
};