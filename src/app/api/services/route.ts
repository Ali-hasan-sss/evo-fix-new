// src\app\api\services\route.ts
import { NextRequest, NextResponse } from "next/server";
import { CreateServiceSchema } from "@/utils/validationSchemas";
import { CreateServiceDto } from "@/utils/dtos";
import  prisma  from "@/utils/db";
import {  Services } from "@prisma/client";


/**
 *  @method GET
 *  @route  ~/api/services
 *  @desc   Get All Services
 *  @access public
 */
export async function GET(request: NextRequest) {
  try {
    const services = await prisma.services.findMany({
      where:{
        isActive: true,
      },
      orderBy: {
        createdAt: 'desc',  // Assuming you have a createdAt field
      },
    })
    return NextResponse.json(services, { status: 200 });
  } catch (error) {
    return NextResponse.json({message: "خطأ من الخادم"}, { status: 500 });
  }
}

/**
 *  @method POST
 *  @route  ~/api/services
 *  @desc   Create New Service
 *  @access public
 */

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CreateServiceDto;

    const validation = CreateServiceSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 },
      );
    }

    const newService: Services = await prisma.services.create({
      data: {
        title: body.title,
        paragraph: body.paragraph,
      },
    });

    return NextResponse.json(newService, { status: 201 });
  } catch (error) {
    return NextResponse.json({message: "خطأ من الخادم"}, { status: 500 });
  }
}
