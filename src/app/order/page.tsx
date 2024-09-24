// src\app\order\page.tsx
import Breadcrumb from "@/components/Common/Breadcrumb";
import Order from "@/components/Order";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: " EvoFix |  طلب صيانة ",
  description: "Request Order ",
  // other metadata
};

const ContactPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="طلب صيانة"
        description="حدد المشكلة بالتفصيل من فضلك وسيتم مراسلتك فوراً"
      />
      <Order />
    </>
  );
};

export default ContactPage;