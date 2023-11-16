import "server-only";

import { SESSION_COOKIE_NAME } from "@/domain/user/constants";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  cookies().delete(SESSION_COOKIE_NAME);
  return NextResponse.json({}, { status: 200 });
}
