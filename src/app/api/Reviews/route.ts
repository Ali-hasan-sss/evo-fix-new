// src\app\api\Reviews\route.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/utils/verifyToken";
import prisma from "@/utils/db";
import { CreateReviewDto } from "@/utils/dtos";
import { ReviewSchema } from "@/utils/validationSchemas";

/**
 *  @method POST
 *  @route  ~/api/Reviews
 *  @desc   create a Review of service
 *  @access private (only user logged in can create a Review )
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

    const body = (await request.json()) as CreateReviewDto;

    const validation = ReviewSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 },
      );
    }
   const newReview = await prisma.reviews.create({
      data: {
        maintenanceRequestID: body.maintenanceRequestID,
        ratting: body.ratting,
        comment: body.comment,
      },
      select: {
        maintenanceRequest: {
          select: {
            deviceType: true,
            descProblem:true,
            user:{
              select:{
                fullName:true
              }
            },
            technician:{
              select:{
                fullName:true
              }
            }
          },
        },
        ratting: true,
        comment:true
      },
    });
    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "خطأ من الخادم" }, { status: 500 });
  }
}
