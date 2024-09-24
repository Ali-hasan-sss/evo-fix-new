// src\app\api\users\register\route.ts
import { RegisterUserDto } from "@/utils/dtos";
import { RegisterUserSchema } from "@/utils/validationSchemas";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import bcrypt from "bcryptjs";
import { setCookie } from "@/utils/generateToken";

/**
 *  @method POST
 *  @route  ~/api/users/register
 *  @desc   create new account [sign up]
 *  @access public
 */

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as RegisterUserDto;
    const validation = RegisterUserSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (user) {
      return NextResponse.json(
        { message: "هذا الحساب موجود مسبقا" },
        { status: 400 },
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);

    const newUser = await prisma.user.create({
      data: {
        email: body.email,
        governorate: body.governorate,
        fullName: body.fullName,
        password: hashedPassword,
        phoneNO: body.phoneNO,
        address: body.address,
        avatar: body.avatar,
      },
      select: {
        id: true,
        fullName: true,
        governorate:true,
        email: true,
        phoneNO: true,
        role: true,
      },
    });

    const cookie = setCookie({
      id: newUser.id,
      role: newUser.role,
      fullName: newUser.fullName,
    });

    return NextResponse.json(
      { ...newUser, message: "تم تسجيل الحساب بنجاح" },
      { status: 201, headers: { "Set-Cookie": cookie } },
    );

  } catch (error) {
    return NextResponse.json({ message: "خطأ من الخادم" }, { status: 500 });
  }
}
