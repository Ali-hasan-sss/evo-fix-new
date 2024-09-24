// src\components\UpdateProfile\ServerWrapper.tsx


import { cookies } from "next/headers";
import { verifyTokenForPage } from "@/utils/verifyToken";
import { DOMAIN } from "@/utils/constants";
import UpdateProfile from "./index";

 interface UserData {
  id: string;
  name: string;
  email: string;
  governorate: string;
  phoneNo: string;
  address: string;
}



async function getUserData(userId: string): Promise<UserData> {
  const response = await fetch(`${DOMAIN}/api/users/profile/${userId}`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }
  return response.json();
}

export default async function ServerWrapper() {
  const token = cookies().get("jwtToken")?.value || "";
  const payload = verifyTokenForPage(token);
  const userData = await getUserData(payload.id.toString());

  return <UpdateProfile initialUserData={userData} />;
}
