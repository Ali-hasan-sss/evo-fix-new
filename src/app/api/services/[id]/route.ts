// src\app\api\services\[id]\route.ts
import { NextRequest, NextResponse } from "next/server";
import { UpdateServiceDto } from "@/utils/dtos";
import prisma from "@/utils/db";

interface Props {
  params: {
    id: string;
  };
}


/**
 *  @method GET
 *  @route  ~/api/service/:id
 *  @desc   Get single Service By Id
 *  @access public
 */
export async function GET(request: NextRequest, { params }: Props) {
  try {
    const service = await prisma.services.findUnique({
      where: {
        id: parseInt(params.id),
        isActive: true,
      },
    });
    if (!service) {
      return NextResponse.json(
        { message: "هذه الخدمة غير موجودة" },
        { status: 404 },
      );
    }

    return NextResponse.json(service, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "خطأ من الخادم" }, { status: 500 });
  }
}

/**
 *  @method PUT
 *  @route  ~/api/service/:id
 *  @desc   Get single Service By Id And updated to make it un active
 *  @access public
 */
export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const service = await prisma.services.findUnique({
      where: {
        id: parseInt(params.id),
        isActive: true
      },
    });
    if (!service) {
      return NextResponse.json(
        { message: "هذه الخدمة غير موجودة" },
        { status: 404 },
      );
    }
    const body = (await request.json()) as UpdateServiceDto;
    const updateService = await prisma.services.update({
      where: {
        id: parseInt(params.id),
      },
      data: {
        title: body.title,
        paragraph: body.paragraph,
        isActive: body.isActive,
      },
    });
    return NextResponse.json(updateService, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "خطأ من الخادم" }, { status: 500 });
  }
}
