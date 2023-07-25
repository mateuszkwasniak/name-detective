import { NextRequest, NextResponse } from "next/server";
import { refreshLogin } from "@/lib/refreshLogin";

export async function GET(request: NextRequest) {
  const accessToken: string | undefined =
    request.cookies.get("accessToken")?.value;

  if (!accessToken) {
    return new NextResponse(
      JSON.stringify({ message: "No access token provided" }),
      {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  try {
    const response = await refreshLogin(accessToken);
    return response;
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify("Re-logging failed."), {
      status: 401,
      headers: {
        "Content-Type": "appication/json",
      },
    });
  }
}
