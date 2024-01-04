import { User } from "@/models/user";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const requestBody: User = await request.json();
    const localUsers = cookies().get("users")?.value;

    if (localUsers) {
      const users: any[] = [...JSON.parse(localUsers)];

      const userFound = users.find(
        (item: User) => item.email === requestBody.email && item.password === requestBody.password
      );

      if (!userFound) {
        return NextResponse.json({}, { status: 404 });
      }

      cookies().set("token", JSON.stringify({ fullname: userFound.firstname + userFound.lastname }));
      return NextResponse.json(requestBody, { status: 200 });
    } else {
      return NextResponse.json({}, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({}, { status: 500 });
  }
};
