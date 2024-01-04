import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  cookies().delete("token");
  return NextResponse.json({}, { status: 201 });
};
