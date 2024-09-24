// src\app\api\Reviews\all-Reviews\route.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/utils/verifyToken";
import prisma from "@/utils/db";


/**
 *  @method GET
 *  @route  ~/api/Reviews/all-Reviews
 *  @desc   Get All Reviews from users
 *  @access private (only admin can get all Reviews )
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

   const Reviews = await prisma.reviews.findMany({
     select:{
      maintenanceRequest: {
        select: {
          deviceType: true,
          descProblem:true,
          user:{
            select:{
              fullName:true
            }
          },
          technician:{
            select:{
              fullName:true
            }
          }
        },
      },
      ratting: true,
      comment:true,
      createdAt:true
     }
    });
    return NextResponse.json(Reviews, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "خطأ من الخادم" }, { status: 500 });
  }
}
