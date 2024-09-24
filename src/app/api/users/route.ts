// src\app\api\users\route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";

/**
 *  @method GET
 *  @route  ~/api/users
 *  @desc   get all users
 *  @access private (only admin can show all users) 
 */

export async function GET(request: NextRequest) {
  try {
    const users = await prisma.user.findMany({
      where: {
        role: 'USER'
      },
      select: {
        id: true,
        fullName: true,
        governorate:true,
        email: true,
        phoneNO: true,
        address: true,
        isActive: true,
      }
    });
    const adminToken = verifyToken(request);

    if (adminToken !== null && adminToken.role === "ADMIN"){

      return NextResponse.json(users, { status: 200 });
    }else{
      return NextResponse.json({message: "ليس ليك الصلاحية"}, { status: 403 });

    }
    

  } catch (error) {
    console.error('Error fetching technicians:', error);
    return NextResponse.json({ message: "خطأ في جلب بيانات الفنيين" }, { status: 500 });
  }
}
