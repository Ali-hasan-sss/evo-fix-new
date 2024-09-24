// src\app\api\Notifications\userNotifications\route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";

/**
 *  @method GET
 *  @route  ~/api/Notifications/userNotifications
 *  @desc   get all user request Notifications 
 *  @access private (only user can show him notification)
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
        userID: user.id,
        isUserRead:false
      },
      select: {
        maintenanceRequest:{
          select:{
            technician:{
              select:{
                fullName:true
              }
            },
            deviceType:true
          }
        },
        message:true,
      },
      orderBy: {
        createdAt: 'desc',  // Assuming you have a createdAt field
      },
    });

    const countNotifications = await prisma.notification.count({
      where: {
        userID: user.id,
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