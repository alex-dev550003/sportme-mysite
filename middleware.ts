import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/app-showcase/")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/app")) {
    return NextResponse.redirect(new URL(pathname, "https://app.sportme.ro"));
  }

  const response = NextResponse.next();
  const country = request.headers.get("x-vercel-ip-country")?.toUpperCase();
  if (request.headers.get("accept")?.includes("text/html") && country && /^[A-Z]{2}$/.test(country) && request.cookies.get("sportmeVisitorCountry")?.value !== country) {
    response.cookies.set("sportmeVisitorCountry", country, {
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
  }
  return response;
}
