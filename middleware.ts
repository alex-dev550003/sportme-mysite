import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/home";
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith("/app")) {
    return NextResponse.redirect(new URL(pathname, "https://app.sportme.ro"));
  }

  return NextResponse.next();
}
