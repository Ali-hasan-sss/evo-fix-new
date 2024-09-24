// src\app\api\users\userRequests\route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";

/**
 *  @method GET
 *  @route  ~/api/users/userRequests
 *  @desc   get all user requests
 *  @access private (only user can show him requests)
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

    const requests = await prisma.maintenance_Request.findMany({
      where: {
        userID: user.id,
      },
      select: {
        governorate: true,
        address: true,
        phoneNO: true,
        technician: {
          select:{
            fullName:true
          }
        },
        deviceType: true,
        descProblem: true,
        fee: true,
        payments: {
          select:{
            amount:true
          }
        },
        status:true
      },
      orderBy:{
        createdAt:"desc"
      }
    });

    const countRequest = await prisma.maintenance_Request.count({
      where: {
        userID: user.id,
      }
    })

    if(countRequest < 1){

      return NextResponse.json({message:"لا يوجد طلبات حاليا"}, { status: 400 });
    }else
      return NextResponse.json(requests, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { message: "خطأ في جلب البيانات " },
      { status: 500 },
    );
  }
}
