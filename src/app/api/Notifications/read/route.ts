// src\app\api\Notifications\read\route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";
import { UpdateStatusNotificationDto } from "@/utils/dtos";


/**
 *  @method PUT
 *  @route  ~/api/Notifications/read
 *  @desc   update notification to read
 *  @access private (only user himself can update account )
 */

export async function PUT(request: NextRequest) {
  try {
    const user = verifyToken(request);
    if (!user) {
      return NextResponse.json(
        { message: " لايوجد إشعارات " },
        { status: 401 },
      );
    }

    if(user.role === "USER"){
      const readNotifications = await prisma.notification.updateMany({
        where: {
          userID: user.id,
          isUserRead: false
        },
        data:{
          isUserRead:true 
        },
      });
      return NextResponse.json(readNotifications,{status: 200})
    }
    if(user.role === "TECHNICAL"){
      const readNotifications = await prisma.notification.updateMany({
        where: {
          maintenanceRequest:{
            technicalID: user.id
          },
          isTechRead: false
        },
        data:{
          isTechRead:true 
        },
      });
      return NextResponse.json(readNotifications,{status: 200})
    }

    return NextResponse.json(
      { message: " لايوجد إشعارات " },
      { status: 401 },
    );

  } catch (error) {
    return NextResponse.json({ message: "خطأ من الخادم" }, { status: 500 });
  }
}
