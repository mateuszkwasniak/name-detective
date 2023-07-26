import { NextRequest, NextResponse } from "next/server";
import { verify } from "./utils/jwt";

const allowedOrigns = [
  "http://localhost:3000",
  "https://name-detective.vercel.app",
];
const protectedRoutes = ["/search-history"];

export async function middleware(request: NextRequest) {
  const origin = request.headers.get("origin");

  if (origin !== null && !allowedOrigns.includes(origin)) {
    return new NextResponse(JSON.stringify({ message: "Unauthorized" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  if (protectedRoutes.includes(request.nextUrl.pathname)) {
    const accessToken: string | undefined =
      request.cookies.get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      await verify(accessToken, process.env.JWT_SECRET as string);
      return NextResponse.next();
    } catch (error) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}
