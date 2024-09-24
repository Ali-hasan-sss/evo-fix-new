// src\app\profile\page.tsx

import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";
import UserRequests from "@/components/UserRequests";
import UpdateProfile from "@/components/UpdateProfile";
import TechRequests from "@/components/TechRequest";
import { cookies } from "next/headers";
import { verifyTokenForPage } from "@/utils/verifyToken";

export const metadata: Metadata = {
  title: "Next.js Profile | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Profile page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const Profile = () => {
  const token = cookies().get("jwtToken")?.value || "";
  const payload = verifyTokenForPage(token);

  return (
    <div className=" max-w-242.5 mx-auto">
      <Breadcrumb pageName={payload.fullName} description="الصفحة الشخصية" />

      <div className=" container relative overflow-hidden rounded-sm bg-white pb-16 pt-[120px] dark:bg-bg-color-dark md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]">
        {payload.role === "TECHNICAL" ? (
          <>
            <div>
              <h1 className="mb-8 flex justify-center text-3xl">الطلبات</h1>
              <TechRequests />
            </div>
          </>
        ) : (
          <>
            <div>
              <h1 className="mb-8 flex justify-center text-3xl">طلباتي</h1>
              <UserRequests />
            </div>
          </>
        )}

        <div>
          <h1 className="mt-8 flex justify-center text-3xl">
            المعلومات الشخصية
          </h1>
          <UpdateProfile />
        </div>
      </div>
    </div>
  );
};

export default Profile;
