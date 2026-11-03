
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./lib/auth";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session?.user) {
    const loginUrl = new URL("/signin", request.url);

    // Return the user to the requested page after signing in.
    loginUrl.searchParams.set(
      "callbackURL",
      `${request.nextUrl.pathname}${request.nextUrl.search}`,
    );

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/my-bookings/:path*",
    "/my-listings/:path*",
    "/add-studios/:path*",
    "/studios/edit/:path*",
    "/profile/:path*",
    "/studios/:id",
  ],
};
