import { User } from "@/models/user";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const requestBody: User = await request.json();

    let users: User[] = [];
    const localUsers = cookies().get("users")?.value;

    if (localUsers) {
      users = [...JSON.parse(localUsers)];

      if (users.find((item: User) => item.email === requestBody.email)) {
        return NextResponse.json({}, { status: 400 });
      }
    }
    users.push({ ...requestBody });
    cookies().set("users", JSON.stringify(users));
    return NextResponse.json(requestBody, { status: 201 });
  } catch (error) {
    return NextResponse.json({}, { status: 500 });
  }
};
