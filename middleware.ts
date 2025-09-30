import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth/verifyToken";
import { cookies } from "next/headers";
export async function middleware(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  
  const payload = await verifyToken(token);
  
  if (!payload) {    
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/api/protected/:path*", "/chat/:path*"],
};