// src\middleware.ts
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest){
  const jwtToken = request.cookies.get('jwtToken')
    const token = jwtToken?.value
  if (!token) {
    return NextResponse.json(
      { message: "ليس لديك الصلاحية " },
      { status: 401 },
    );
  }
}

export const config ={
  matcher:['/api/users/profile/:path*']
}