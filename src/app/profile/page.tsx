"use client";

import axios from "axios";
import Breadcrumb from "@/components/Common/Breadcrumb";
import { Metadata } from "next";
import UserRequests from "@/components/UserRequests";
import TechRequests from "@/components/TechRequest";
import Status from "@/components/Status";
import { cookies } from "next/headers";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { DOMAIN } from "@/utils/constants";

/* export const metadata: Metadata = {
  title: "Next.js Profile | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Profile page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};  */

const Profile = async () => {
  const [payload, setPayload] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("token");
        if (typeof window !== "undefined") {
          const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

          // التحقق من أن userInfo يحتوي على id
          if (!userInfo?.id) {
            throw new Error("لا يمكن العثور على معرف المستخدم");
          }

          const response = await axios.get(
            `${DOMAIN}/api/users/${userInfo.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            },
          );

          setPayload(response.data);
        }
      } catch (err) {
        setError(err.message || "خطأ أثناء جلب البيانات.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>جاري التحميل...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-242.5 mx-auto">
      <Breadcrumb
        pageName={payload?.fullName || "الاسم غير متاح"}
        description="الصفحة الشخصية"
      />

      <div>
        <Status />
      </div>

      <div className="container relative overflow-hidden rounded-sm bg-white pb-16 pt-[120px] dark:bg-bg-color-dark md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]">
        {payload?.role === "TECHNICAL" ? (
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
