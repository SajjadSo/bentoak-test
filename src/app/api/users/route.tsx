import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const token = cookies().get("token")?.value;
  if (token) {
    return NextResponse.json(JSON.parse(token).fullname, { status: 200 });
  }
  return NextResponse.json({}, { status: 500 });
};
