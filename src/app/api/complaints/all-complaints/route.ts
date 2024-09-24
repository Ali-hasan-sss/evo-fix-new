// src\app\api\complaints\all-complaints\route.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/utils/verifyToken";
import prisma from "@/utils/db";


/**
 *  @method GET
 *  @route  ~/api/complaints/all-complaints
 *  @desc   Get All complaints from users
 *  @access private (only admin can get all complains )
 */

export async function GET(request: NextRequest) {
  try {
    const user = verifyToken(request);
    if (!user) {
      return NextResponse.json(
        { message: "ليس لديك الصلاحية " },
        { status: 401 },
      );
    }

    if(user.role !== "ADMIN"){
      return NextResponse.json(
        { message: "ليس لديك الصلاحية " },
        { status: 401 },
      );
    }

   const Complaints = await prisma.complaints.findMany({
     select:{
      user:{
        select:{
          fullName:true,
        }
      },
      message:true
     }
    });
    return NextResponse.json(Complaints, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "خطأ من الخادم" }, { status: 500 });
  }
}
