// src\utils\verifyToken.ts
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { JWTPayload, JWTPayloadVerify } from "@/types/jwtPayload";

//verify token fo api endpoint
export function verifyToken(request: NextRequest): JWTPayload | null {
  try {
    const jwtToken = request.cookies.get("jwtToken");
    const token = jwtToken?.value;
    if (!token) return null;
    const privateKey = process.env.JWT_SECRET;
    const userPayload = jwt.verify(token, privateKey) as JWTPayload;
    return userPayload;
  } catch (error) {
    return null;
  }
}



//verify token for pages
export function verifyTokenForPage(token: string): JWTPayload | null {

  try {
    if (!token) return null;
    const privateKey = process.env.JWT_SECRET;
    const userPayload = jwt.verify(token, privateKey) as JWTPayload;
    return userPayload;
  } catch (error) {
    return null;
  }






  // if (!token) {
  //   return { isLoggedIn: false };
  // }
  
  // try {
  //   const privateKey = process.env.JWT_SECRET;
  //   const userPayload = jwt.verify(token, privateKey) as JWTPayloadVerify;
  //   if(!userPayload) return { isLoggedIn: false };
  //   return {
  //     isLoggedIn: true,
  //     id: userPayload.id,
  //     role: userPayload.role,
  //     fullName: userPayload.fullName,
  //   }
  // } catch (error) {
  //   return { isLoggedIn: false };
  // }
}
