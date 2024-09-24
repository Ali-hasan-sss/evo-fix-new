// src\app\api\users\Technicals\offers\manageRequests\rejected\[id]\route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";

interface Props {
  params: { id: string };
}


/**
 *  @method PUT
 *  @route  ~/api/users/Technicals/offers/manageRequests/rejected/:id
 *  @desc   update request to rejected status
 *  @access private (only technician can update him offers )
 */

export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const user = verifyToken(request);
    if (!user) {
      return NextResponse.json({ message: " لايوجد طلبات " }, { status: 401 });
    }

    const offer = await prisma.maintenance_Request.findUnique({
      where:{
        id: parseInt(params.id),
        // status:"PENDING"
      }
    })

    if (!offer) {
      return NextResponse.json(
        { message: "لا يوجد طلبات جديدة" },
        { status: 404 },
      );
    }

    if (user.role === "TECHNICAL") {
      const requests = await prisma.maintenance_Request.update({
        where: {
          id: parseInt(params.id)
        },
        data: {
          status: "REJECTED",
        },
      });

      const requestUser = await prisma.maintenance_Request.findUnique({
        where: {
          id: parseInt(params.id)
        },
        select: {
          userID: true,
          user:{
            select:{
              fullName:true
            }
          }
        }
      });

      if (!requestUser || !requestUser.userID) {
        return NextResponse.json(
          { message: "لم يتم العثور على معرف المستخدم" },
          { status: 404 },
        );
      }

      const Notification  = await prisma.notification.create({
        data:{
          userID: requestUser.userID,
          maintenanceRequestID: requests.id,
          message: `${requestUser.user.fullName} لقد تم الاطلاع على الطلب ولكن يؤسفنا ان نخبرك انه عليك تبديل القطعة كاملة وذلك لانه لابمكن صيانتها مطلقا`
        },
        select:{
          message:true
        }
      })

      return NextResponse.json({requests, Notification}, { status: 200 });
    }

    return NextResponse.json({ message: " لايوجد طلبات " }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ message: "خطأ من الخادم" }, { status: 500 });
  }
}
