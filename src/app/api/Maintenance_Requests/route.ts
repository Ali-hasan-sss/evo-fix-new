// src\app\api\Maintenance_Requests\route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";

/**
 *  @method GET
 *  @route  ~/api/Maintenance_Requests
 *  @desc   get all user requests
 *  @access private (only admin can show all offers)
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

    const countRequest = await prisma.maintenance_Request.count();

    if (countRequest < 1) {
      return NextResponse.json(
        { message: "لا يوجد طلبات حاليا" },
        { status: 400 },
      );
    }

    if (user.role === "ADMIN") {
      const requests = await prisma.maintenance_Request.findMany({
        select: {
          governorate: true,
          address: true,
          phoneNO: true,
          user: {
            select: {
              fullName: true,
              email: true,
              phoneNO: true,
            },
          },
          deviceType: true,
          descProblem: true,
          status:true,
          technician: {
            select: {
              fullName: true,
              email: true,
              phoneNO: true,
            },
          },
          fee: true,
          payments: {
            select: {
              amount: true,
              paymentState: true,
              paymentDate: true,
            },
          },
          createdAt: true,
        },
      });
      return NextResponse.json(requests, { status: 200 });
    }

    if(user.role === "TECHNICAL"){
      const TechRequests = await prisma.maintenance_Request.findMany({
        where:{
          technicalID: user.id
        },
      select: {
        governorate: true,
        address: true,
        phoneNO: true,
        user: {
          select: {
            fullName: true,
            email: true,
            phoneNO: true,
          },
        },
        deviceType: true,
        descProblem: true,
        status:true,
        fee: true,
        payments: {
          select: {
            amount: true,
            paymentState: true,
            paymentDate: true,
          },
        },
        createdAt: true,
      },
    });
    return NextResponse.json(TechRequests, { status: 200 });
    }

    return NextResponse.json(
      { message: "غير مصرح لك بالوصول" },
      { status: 403 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "خطأ في جلب البيانات " },
      { status: 500 },
    );
  }
}
