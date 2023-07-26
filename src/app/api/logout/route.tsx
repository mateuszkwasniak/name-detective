import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const accessToken: string | undefined =
    request.cookies.get("accessToken")?.value;

  if (!accessToken) {
    return new NextResponse(JSON.stringify({ message: "Logged out" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } else {
    return new NextResponse(JSON.stringify({ message: "Logged out" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": `accessToken=""; HttpOnly; Path=/; Max-Age=${0}; SameSite=Strict; Secure`,
      },
    });
  }
}
