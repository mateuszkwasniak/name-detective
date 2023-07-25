import { NextResponse } from "next/server";
import { connectMongo } from "@/utils/mongoConfig";
import { User } from "@/mongo/models/User";
import { verify } from "@/utils/jwt";
import { HydratedDocument } from "mongoose";

export async function refreshLogin(accessToken: string): Promise<NextResponse> {
  const { name } = await verify(accessToken, process.env.JWT_SECRET as string);

  await connectMongo();

  const foundUser: HydratedDocument<IUser> = await User.findOne({
    name,
  }).exec();

  if (!foundUser) {
    return new NextResponse(JSON.stringify({ message: "User not found." }), {
      status: 403,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return new NextResponse(
    JSON.stringify({
      message: "Re-logged",
      name,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
