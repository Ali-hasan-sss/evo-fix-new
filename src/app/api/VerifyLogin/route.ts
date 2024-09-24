// src\app\api\VerifyLogin\route.ts
import { cookies } from "next/headers";
import { verifyTokenForPage } from "@/utils/verifyToken";
import { NextRequest, NextResponse } from "next/server";

/**
 *  @method GET
 *  @route  ~/api/VerifyLogin
 *  @desc   check if logged in
 *  @access public
 */

export async function GET(request: NextRequest) {
  const token = cookies().get("jwtToken")?.value || "";
  const payload = verifyTokenForPage(token);
  if (payload) {
    return NextResponse.json({success:true,name:payload.fullName}, { status: 200 });
  }
  return NextResponse.json({success:false}, { status: 401 });
}
