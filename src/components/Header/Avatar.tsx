// src\components\Header\Avatar.tsx

import React, { useEffect, useState } from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar,User} from "@nextui-org/react";
import Link from "next/link"
import { toast } from "react-toastify";
import axios from "axios";
import { DOMAIN } from "@/utils/constants";
import { useRouter } from "next/navigation";


export default function AvatarProfile() {
  const [userFullName, setUserFullName] = useState<string | null>(null);
  const router = useRouter()
  const logoutHandler = async ()=>{
    try {
      await axios.get(`${DOMAIN}/api/users/logout`);
      router.replace("/")
      router.refresh()
    } catch (error: any) {
      toast.error(error?.response?.data.message);
    }
  }

  useEffect(() => {
    const checkLoginStatus = async () => {
      const response = (await axios.get(`${DOMAIN}/api/VerifyLogin`)).data;
      setUserFullName(response.name);
    };

    checkLoginStatus();
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
            {/* <p className="font-semibold">Signed in as</p> */}
            {/* <p className="font-semibold">mohammad salman</p> */}
            <Link className="font-semibold" href={"/profile"}>{userFullName}</Link> 
          </DropdownItem>
          {/* <DropdownItem key="user-account">
            <Link href={"/profile"}>حسابي</Link> 
          </DropdownItem> */}
          <DropdownItem key="user-order">طلباتي</DropdownItem>
          <DropdownItem key="dashboard">
            لوحة التحكم
          </DropdownItem>
          <DropdownItem key="reset-password">
            تغيير كلمة المرور
          </DropdownItem>
          {/* <DropdownItem key="system">System</DropdownItem>
          <DropdownItem key="configurations">Configurations</DropdownItem>
          <DropdownItem key="help_and_feedback">
            Help & Feedback
          </DropdownItem> */}
          <DropdownItem key="logout" color="danger" onClick={logoutHandler}>
            تسجيل الخروج
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
