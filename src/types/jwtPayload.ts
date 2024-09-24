// src\types\jwtPayload.ts

// src\types\jwtPayload.ts
export type JWTPayload = {
  isLoggedIn?: boolean;
  id: number;
  role: string;
  fullName: string;
};

export type JWTPayloadVerify = {
  isLoggedIn: boolean;
  id?: number;
  role?: string;
  fullName?: string;
};