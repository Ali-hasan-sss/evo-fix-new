// src\components\Header\Notifications.tsx

import React, { useEffect, useState  } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import axios from "axios";
import { DOMAIN } from "@/utils/constants";
import { Notification } from "@prisma/client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const formatMessage = (message) => {
  const words = message.split(" ");
  let formattedMessage = "";

  for (let i = 0; i < words.length; i++) {
    formattedMessage += words[i] + " ";
    if ((i + 1) % 8 === 0) {
      formattedMessage += "<br />"; // إضافة سطر جديد بعد كل 5 كلمات
    }
  }
  return formattedMessage;
};

const Notifications = () => {
  const router = useRouter()
  const [notification, setNotification] = useState<Notification[]>([]);
  // const [unreadNotifications, setUnreadNotifications] = useState(notification.length > 0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showBadge, setShowBadge] = useState(true); 
   // دالة لجعل الإشعارات مقروءة عبر API
  //  const markNotificationsAsRead = async () => {
  //   try {
  //     const response = await axios.put(`${DOMAIN}/api/Notifications/read`); // استدعاء API لجعل الإشعارات مقروءة
  //     if (response.status === 200) {
  //       setUnreadNotifications(false); // إذا كان الطلب ناجحًا، حدد الإشعارات كمقروءة
  //     }
  //   } catch (error) {
      
  //   }
  // };

    // عند فتح قائمة الإشعارات
    const handleOpenNotifications = async () => {
      setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown state
      setShowBadge(false); 
      // setUnreadNotifications(false); // جعل الشارة تختفي
      // await markNotificationsAsRead(); // استدعاء دالة قراءة الإشعارات
    router.refresh()
    };



  // Fetch the data when the component is mounted
  useEffect(() => {
    const userNotifications = async () => {
      try {
        const response = await axios.get(
          `${DOMAIN}/api/Notifications/userNotifications`,
        );
        setNotification(response.data); // Store the fetched technicians in state
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Error fetching technicians",
        );
      }
    };

    userNotifications();
  }, []);
  

  const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0";

  return (
    <Dropdown >
    
      <DropdownTrigger>
        <Button onClick={handleOpenNotifications} className="bg-transparent">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
            />
          </svg>
          {notification && showBadge && (
            <span
              className="absolute  top-0 right-0 flex h-3 w-3 items-center justify-center rounded-full bg-red-600 text-white text-xs font-bold"
              style={{ width: "10px", height: "10px", top: "5px", right: "28px" }}
            >
              {/* {notification.length} */}
            </span>
          )}
        </Button>
      </DropdownTrigger>
      <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
      <DropdownSection title="الإشعارات">
        {notification.length === 0 ? (
          <DropdownItem className="text-center">
            لا توجد إشعارات حالياً
          </DropdownItem>
        ) : (
          notification.map((notifi) => {
            return (
              <DropdownItem
                key={notifi.id}
                className="break-words"
                description={
                  <>
                    <span dangerouslySetInnerHTML={{ __html: formatMessage(notifi.message) }} />
                    <br />
                    {/* <small>{formattedDate}</small> */}
                    <hr className="my-4 text-gray-400"/>
                  </>
                }
                >
                {/* <div className="font-bold">{notifi.title}</div> */}
              </DropdownItem>
            );
          })
        )}
      </DropdownSection>
    </DropdownMenu>
    </Dropdown>
  );
};

export default Notifications;
