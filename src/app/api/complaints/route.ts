// src\app\api\complaints\route.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/utils/verifyToken";
import prisma from "@/utils/db";
import { CreateComplaintDto } from "@/utils/dtos";
import { ComplaintSchema } from "@/utils/validationSchemas";

/**
 *  @method POST
 *  @route  ~/api/complaints
 *  @desc   create a complaint to EvoFix admin
 *  @access private (only user logged in can create a complain )
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

    const body = (await request.json()) as CreateComplaintDto;

    const validation = ComplaintSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 },
      );
    }

   const newComplaint = await prisma.complaints.create({
      data: {
        userID: user.id,
        message: body.message,
      },
      select: {
        user: {
          select: {
            fullName: true,
          },
        },
        message: true,
      },
    });
    return NextResponse.json(newComplaint, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "خطأ من الخادم" }, { status: 500 });
  }
}
