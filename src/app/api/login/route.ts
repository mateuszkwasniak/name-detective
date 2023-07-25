import { User } from "@/mongo/models/User";
import { connectMongo } from "@/utils/mongoConfig";
import { HydratedDocument } from "mongoose";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { sign } from "@/utils/jwt";

export async function POST(request: Request) {
  try {
    const user: UserLoginData = await request.json();

    if (!user.login || !user.password) {
      return new NextResponse(
        JSON.stringify({ message: "Login or password is missing." }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    await connectMongo();

    const existingUser: HydratedDocument<IUser> | null = await User.findOne({
      login: user.login,
    }).exec();

    if (!existingUser) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid login or password" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const isPasswordValid = await bcrypt.compare(
      user.password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid login or password" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const accessToken: string = await sign(
      { name: existingUser.name },
      process.env.JWT_SECRET as string
    );

    return new NextResponse(
      JSON.stringify({ message: "Welcome!", name: existingUser.name }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": `accessToken=${accessToken}; Path=/; HttpOnly; SameSite=Strict`,
        },
      }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({
        message: "Something went wrong, please try again later.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
