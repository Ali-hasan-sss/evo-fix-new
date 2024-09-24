// src\components\UpdateProfile\index.tsx
"use client"
import { DOMAIN } from "@/utils/constants";
import { verifyTokenForPage } from "@/utils/verifyToken";
import axios from "axios";
import { cookies } from "next/headers";
import React, { ChangeEvent, FormEvent, useState } from "react";
import {User} from "@prisma/client"

 interface UserData {
  id: string;
  name: string;
  email: string;
  governorate: string;
  phoneNo: string;
  address: string;
}

interface UpdateProfileFormProps {
  initialUserData: UserData;
}

interface FormData extends UserData {
  password: string;
}


const UpdateProfile: React.FC<UpdateProfileFormProps> = ({ initialUserData }) => {
  const [userData, setUserData] = useState<FormData>({
    ...initialUserData,
    password: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`${DOMAIN}/api/users/profile/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        console.log("Profile updated successfully");
        // You might want to show a success message to the user here
      } else {
        console.error("Failed to update profile");
        // You might want to show an error message to the user here
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      // You might want to show an error message to the user here
    }
  };

  return (
    <section id="contact" className="overflow-hidden py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap justify-center">
          <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
            <div className="mb-12 rounded-sm bg-white px-8 py-11 shadow-three dark:bg-gray-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]">
              <form onSubmit={handleSubmit}>
                <div className="-mx-4 flex flex-wrap">
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label htmlFor="name" className="mb-3 block text-sm font-medium text-dark dark:text-white">
                        الاســـم
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={userData.name}
                        onChange={handleInputChange}
                        placeholder="الاسم الكامل"
                        className="border-stroke w-full rounded-md border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label htmlFor="email" className="mb-3 block text-sm font-medium text-dark dark:text-white">
                        البريد الإلكتروني
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleInputChange}
                        placeholder="الإيميل"
                        className="border-stroke w-full rounded-md border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label htmlFor="governorate" className="mb-3 block text-sm font-medium text-dark dark:text-white">
                        المحافظة
                      </label>
                      <input
                        type="text"
                        name="governorate"
                        value={userData.governorate}
                        onChange={handleInputChange}
                        placeholder="المحافظة"
                        className="border-stroke w-full rounded-md border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label htmlFor="phoneNo" className="mb-3 block text-sm font-medium text-dark dark:text-white">
                        رقم الجوال
                      </label>
                      <input
                        type="text"
                        name="phoneNo"
                        value={userData.phoneNo}
                        onChange={handleInputChange}
                        placeholder="رقم الجوال"
                        className="border-stroke w-full rounded-md border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label htmlFor="address" className="mb-3 block text-sm font-medium text-dark dark:text-white">
                        العنوان
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={userData.address}
                        onChange={handleInputChange}
                        placeholder="العنوان"
                        className="border-stroke w-full rounded-md border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label htmlFor="password" className="mb-3 block text-sm font-medium text-dark dark:text-white">
                        كلمة المرور
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={userData.password}
                        onChange={handleInputChange}
                        placeholder="كلمة المرور"
                        className="border-stroke w-full rounded-md border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-none focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <button type="submit" className="rounded-md bg-primary px-9 py-4 text-base font-medium text-white shadow-submit duration-300 hover:bg-primary/90 dark:shadow-submit-dark">
                      تعديل
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

};

export default UpdateProfile;
