// src\app\api\Notifications\techNotifications\route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";

/**
 *  @method GET
 *  @route  ~/api/Notifications/techNotifications
 *  @desc   get all user offers Notifications 
 *  @access private (only technician can show him notification)
 */

export async function GET(request: NextRequest) {
  try {
    const user = verifyToken(request);
    if (!user) {
      return NextResponse.json(
        { message: " لايوجد إشعارات " },
        { status: 401 },
      );
    }

    const Notifications = await prisma.notification.findMany({
      where: {
        maintenanceRequest:{
          technicalID:user.id
        },
        isTechRead:false
      },
      select: {
        maintenanceRequest:{
          select:{
            user:{
              select:{
                fullName:true
              }
            },
            deviceType:true,
            descProblem:true
          }
        },
      },
    });

    const countNotifications = await prisma.notification.count({
      where: {
        maintenanceRequest:{
          technicalID:user.id
        },
      }
    })

    if(countNotifications < 1){

      return NextResponse.json({message:"لا يوجد إشعارات حاليا"}, { status: 400 });
    }else
      return NextResponse.json(Notifications, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { message: "خطأ في جلب البيانات " },
      { status: 500 },
    );
  }
}