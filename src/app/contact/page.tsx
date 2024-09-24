// src\app\contact\page.tsx
import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: " EvoFix | اتصل بنا ",
  description: "contact with us ",
  // other metadata
};

const ContactPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="اتصل بنا"
        description="إن كان هناك أي حاجة فلا تتردد بالإتصال بنا وسيتم الاستجابة بأســرع وقت ممكن"
      />

      <Contact />
    </>
  );
};

export default ContactPage;
