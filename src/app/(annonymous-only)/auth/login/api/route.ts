import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { apiService } from "@/domain/api/services";
import { assertDecode } from "@/lib/helpers/asserDecode";
import { EmailSessionLoginResponseModel } from "@/domain/login/models";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const idToken = body.idToken;

    const res = await apiService.request({
      endpoint: "/iam/login",
      method: "POST",
      body: { idToken },
    });

    if (!res.ok) {
      throw new Error();
    }

    const resData = assertDecode(
        EmailSessionLoginResponseModel.decode(await res.json()),
        'Failed to decode EmailSessionLoginResponseModel'
    )

    //Add the cookie to the browser
    cookies().set(resData.cookieOptions);
    return NextResponse.json({
        user: resData.user
    }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({}, { status: 401 });
  }
}
