import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";
import UserRequests from "@/components/UserRequests";
import UpdateProfile from "@/components/UpdateProfile";
import TechRequests from "@/components/TechRequest";
import { cookies } from "next/headers";
import { verifyTokenForPage } from "@/utils/verifyToken";
import Status from "@/components/Status";

export const metadata: Metadata = {
  title: "Next.js Profile | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Profile page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const Profile = () => {
  const token = cookies().get("token")?.value || "";
  const payload = verifyTokenForPage(token);

  if (!payload) {
    // يمكن عرض رسالة خطأ أو توجيه المستخدم إلى صفحة تسجيل الدخول
    return <div>خطأ في تحميل بيانات المستخدم. يرجى تسجيل الدخول مجددًا.</div>;
  }

  return (
    <div className="max-w-242.5 mx-auto">
      <Breadcrumb
        pageName={payload.fullName || "الاسم غير متاح"}
        description="الصفحة الشخصية"
      />

      <div>
        <Status />
      </div>

      <div className="container relative overflow-hidden rounded-sm bg-white pb-16 pt-[120px] dark:bg-bg-color-dark md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]">
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
        </div>
      </div>
    </div>
  );
};

export default Profile;
