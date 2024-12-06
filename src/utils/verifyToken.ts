import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
import { JWTPayload } from "@/types/jwtPayload";

// Verify token for API endpoint
export function verifyToken(request: NextRequest): JWTPayload | null {
  try {
    const jwtToken = request.cookies.get("token");
    const token = jwtToken?.value;
    if (!token) return null;
    const privateKey = process.env.JWT_SECRET;
    const userPayload = jwt.verify(token, privateKey) as JWTPayload;
    return userPayload;
  } catch (error) {
    return null;
  }
}

// Verify token for pages
export function verifyTokenForPage(token: string): JWTPayload | null {
  if (!token) return null;

  try {
    const privateKey = process.env.JWT_SECRET;
    const userPayload = jwt.verify(token, privateKey) as JWTPayload;
    return userPayload;
  } catch (error) {
    return null;
  }
}
