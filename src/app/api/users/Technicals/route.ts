// src\app\api\users\Technicals\route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";


/**
 *  @method GET
 *  @route  ~/api/users/Technicals
 *  @desc   get all technical users
 *  @access public 
 */

export async function GET(request: NextRequest) {
  try {
    const technicians = await prisma.user.findMany({
      where: {
        role: 'TECHNICAL'
      },
      select: {
        id: true,
        fullName: true,
        governorate:true,
        email:true,
        phoneNO:true,
        // Add any other fields you want to return
      }
    });

    return NextResponse.json(technicians, { status: 200 });
  } catch (error) {
    console.error('Error fetching technicians:', error);
    return NextResponse.json({ message: "خطأ في جلب بيانات الفنيين" }, { status: 500 });
  }
}
