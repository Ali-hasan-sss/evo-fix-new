// src\app\api\Maintenance_Requests\[id]\route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";
// import { UpdateUserDto } from "@/utils/dtos";
// import bcrypt from "bcryptjs";
// import { UpdateUserSchema } from "@/utils/validationSchemas";



interface Props {
  params: { id: string };
}


/**
 *  @method GET
 *  @route  ~/api/Maintenance_Requests/:id
 *  @desc   Get Maintenance_Requests by ID
 *  @access private (only user himself can get him Maintenance_Requests )
 */

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const user = verifyToken(request);
    if (!user) {
      return NextResponse.json(
        { message: "ليس لديك الصلاحية " },
        { status: 401 },
      );
    }
   
    const userFromToken = verifyToken(request);

    if (userFromToken === null || userFromToken.id !== user.id) {
      return NextResponse.json(
        { message: "ليس لديك الصلاحية " },
        { status: 403 },
      );
    }

    const requests = await prisma.maintenance_Request.findUnique({
      where:{
      id:parseInt(params.id),
      userID: user.id,
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

    if(requests === null){
      return NextResponse.json({message:"لا يوجد طلبات "}, { status: 400 });
    }

    return NextResponse.json({ requests }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "خطأ من الخادم" }, { status: 500 });
  }
}
