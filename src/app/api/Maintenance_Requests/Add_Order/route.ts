// src\app\api\Maintenance_Requests\Add_Order\route.ts
import { NextRequest, NextResponse } from "next/server";
import { Maintenance_RequestSchema } from "@/utils/validationSchemas";
import { CreateMaintenance_RequestDto,CreateNotificationDto } from "@/utils/dtos";
import prisma from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";


/**
 *  @method POST
 *  @route  ~/api/Maintenance_Requests/Add_Order
 *  @desc   Create New Maintenance_Request
 *  @access private (only login user)
 */

export async function POST(request: NextRequest) {
  try {

    const user = verifyToken(request);
    if (!user) {
      return NextResponse.json(
        { message: "ليس لديك الصلاحية " },
        { status: 401 },
      );
    }

    const body = (await request.json()) as CreateMaintenance_RequestDto;

    const validation = Maintenance_RequestSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 },
      );
    }

    const newMaintenance_Request = await prisma.maintenance_Request.create({
      data: {
        deviceType: body.deviceType,
        governorate:body.governorate,
        phoneNO: body.phoneNO,
        address: body.address,
        descProblem: body.descProblem,
        userID: user.id,
        technicalID: body.technicalID,
      },
      select: {
        id:true,
        user:{
          select:{
            fullName:true,
          },
        },
        governorate:true,
        deviceType: true,
        phoneNO: true,
        address: true,
        descProblem: true,
        technician:{
          select:{
            fullName:true
          }
        },
      },
    });
    const Notification  = await prisma.notification.create({
      data:{
        userID: user.id,
        maintenanceRequestID: newMaintenance_Request.id,
        message: `${user.fullName} لقد تم استقبال طلبك، سيتم الاتصال بك بأقرب وقت`
      },
      select:{
        message:true
      }
    })

    return NextResponse.json({newMaintenance_Request , Notification}, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "خطأ من الخادم" }, { status: 500 });
  }
}
