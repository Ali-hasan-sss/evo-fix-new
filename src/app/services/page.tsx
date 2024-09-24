// src\app\services\page.tsx
import React from 'react'
import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";
import Services from '@/components/Services';

export const metadata: Metadata = {
  title: " EvoFix |  خدماتنا ",
  description: "Request Order ",
  // other metadata
};
const page = () => {
  return (
    <>
      <Breadcrumb
        pageName="خدماتنا"
        description="اطلب الخدمة التي تحتاجها وسيتم المعالجة بالوقت والأداء المناسب"
      />
      <Services/>
    </>
  )
}

export default page