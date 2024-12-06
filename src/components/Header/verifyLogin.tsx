// src\components\Header\verifyLogin.tsx

import { cookies } from "next/headers";
import { verifyTokenForPage } from "@/utils/verifyToken";
import ClientHeader from "./clientHeader"; // Renamed to follow convention

export default function ServerHeader() {
  const token = cookies().get("jwtToken")?.value || "";
  const payload = verifyTokenForPage(token);

  return <ClientHeader isLoggedIn={payload} />; // Added return statement and fixed JSX
}
