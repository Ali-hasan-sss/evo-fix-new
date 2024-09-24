// src\app\about\page.tsx
import AboutSectionOne from "@/components/About/AboutSectionOne";
// import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Breadcrumb from "@/components/Common/Breadcrumb";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "EvoFix | من نحن",
  description: "This is About Page for EvoFix ",
  // other metadata
};

const AboutPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="من نحن"
        description="نحن منصة Evolution Fix نهدف إلى تقديم خدمات صيانة الأجهزة الكهربائية والإلكترونية، كما أن هدفنا خلق خدمة موثوقة ذات أداء عالي وعامل وقت مهم في جميع أنحاء المحافظات السورية "
      />
      <AboutSectionOne />
      {/* <AboutSectionTwo /> */}
    </>
  );
};

export default AboutPage;
