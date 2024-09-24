// src\app\api\users\Technicals\offers\route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";

/**
 *  @method GET
 *  @route  ~/api/users/Technicals/offers
 *  @desc   get all user requests (just technician offers)
 *  @access private (only technician can show him offers)
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
        technicalID: user.id,
        // status:"PENDING"
      },
      select: {
        id:true,
        governorate: true,
        address: true,
        phoneNO: true,
        user: {
          select:{
            fullName:true
          }
        },
        deviceType: true,
        descProblem: true,
        fee: true,
        status:true,
        payments: {
          select:{
            amount:true
          }
        },
      },
      orderBy:{
        createdAt:'desc'
      }
    });

    const countRequest = await prisma.maintenance_Request.count({
      where: {
        technicalID: user.id,
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
