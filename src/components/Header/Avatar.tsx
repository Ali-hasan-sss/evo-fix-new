import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  User,
} from "@nextui-org/react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { JWTPayload } from "@/types/jwtPayload";

export default function AvatarProfile() {
  const [userFullName, setUserFullName] = useState<string | null>(null);
  const router = useRouter();

  const logoutHandler = async () => {
    try {
      localStorage.setItem("userToken", "false");
      localStorage.removeItem("userInfo");
      localStorage.removeItem("repairRequests");
      router.replace("/");
      router.refresh();
    } catch (error: any) {
      toast.error(error?.response?.data.message);
    }
  };

  const getUserInfoFromLocalStorage = () => {
    try {
      // جلب معلومات المستخدم من الـ localStorage
      const userInfoString = localStorage.getItem("userInfo");

      if (!userInfoString) {
        toast.error("لا توجد معلومات مستخدم مخزنة! الرجاء تسجيل الدخول أولاً.");
        return null; // إعادة null إذا لم تكن المعلومات موجودة
      }

      // تحويل البيانات من نص إلى كائن JavaScript
      const userInfo: JWTPayload = JSON.parse(userInfoString);

      // التأكد من أن الكائن يحتوي على خاصية 'name'
      if (userInfo) {
        setUserFullName(userInfo.name || userInfo.fullName); // تعيين الاسم المتاح
      }

      console.log("معلومات المستخدم:", userInfo);

      // إعادة معلومات المستخدم
      return userInfo;
    } catch (error) {
      toast.error("حدث خطأ أثناء استخراج معلومات المستخدم من الـ localStorage");
      return null;
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      getUserInfoFromLocalStorage();
    }
  }, []);

  return (
    <div className={`flex items-center gap-4`}>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <Link className="font-semibold" href={"/profile"}>
              {userFullName || "الاسم غير متاح"}{" "}
              {/* إظهار "الاسم غير متاح" إذا لم يتم تحميل الاسم */}
            </Link>
          </DropdownItem>
          <DropdownItem
            key="user-order"
            onClick={() => router.push("/user-order")}
          >
            طلباتي
          </DropdownItem>
          <DropdownItem key="dashboard">لوحة التحكم</DropdownItem>
          <DropdownItem key="reset-password">تغيير كلمة المرور</DropdownItem>
          <DropdownItem key="logout" color="danger" onClick={logoutHandler}>
            تسجيل الخروج
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
