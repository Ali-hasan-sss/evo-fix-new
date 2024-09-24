// src\app\page.tsx

import AboutSectionOne from "@/components/About/AboutSectionOne";
// import AboutSectionTwo from "@/components/About/AboutSectionTwo";
import Blog from "@/components/Blog";
import Brands from "@/components/Brands";
import ScrollUp from "@/components/Common/ScrollUp";
import Contact from "@/components/Contact";
import Services from "@/components/Services";
import Hero from "@/components/Hero";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Video from "@/components/Video";
import { Metadata } from "next";
import Order from "@/components/Order";
import CheckOut from "@/components/CheckOut";
import Users from "@/components/Users";
import React from "react";
import Stars from "@/components/Stars";
import UserRequests from "@/components/UserRequests";
import TechRequests from "@/components/TechRequest";
import UpdateProfile from "@/components/UpdateProfile";

export const metadata: Metadata = {
  title: "EvoFix",
  description: "evo fix for fix any electrical and electronic devices",
  // other metadata
};

export default function Home() {
  return (
    <div className="snap-y">
      <ScrollUp />
      <Hero />
      <div
        className="taos:scale-[1.2] taos:opacity-0 relative snap-start delay-[300ms] duration-[600ms]"
        data-taos-offset="300"
      >
        <div className="absolute bottom-0 left-0 right-0 z-[-1] h-full w-full rotate-180 bg-[url(/images/video/shape.svg)] bg-cover bg-center bg-no-repeat opacity-30"></div>
        <Services />
      </div>
      <h1 className="grid grid-flow-row justify-center text-3xl font-bold !leading-tight text-black dark:text-white sm:text-4xl md:text-[45px]">
        من نحن
      </h1>
      {/* <Video /> */}
      {/* <Brands /> */}
      <div className="relative">
        <div className="absolute  bottom-0 left-0 right-0 z-[-1] h-full w-full -scale-90 bg-[url(/images/video/shape.svg)] bg-cover bg-center bg-no-repeat opacity-30"></div>
        <AboutSectionOne />
      </div>
      <Testimonials />
      <h1 className="grid grid-flow-row justify-center  text-3xl font-bold !leading-tight text-black dark:text-white sm:text-4xl md:text-[45px]">
        اتصل بنا
      </h1>
      {/* <AboutSectionTwo /> */}
      {/* <Pricing /> */}
      {/* <Blog /> */}
      <div className="relative">
        <div className="-rotate-450 absolute bottom-0 left-0 right-0 z-[-1] h-full w-full bg-[url(/images/video/shape.svg)] bg-cover bg-center bg-no-repeat opacity-30"></div>
        <Contact />
      </div>
      {/* <h1 className="grid grid-flow-row justify-center  text-3xl font-bold !leading-tight text-black dark:text-white sm:text-4xl md:text-[45px]">طلب صيانة</h1>
      <div className="relative">
        <div className="absolute -scale-90 bottom-0 left-0 right-0 z-[-1] opacity-30 h-full w-full bg-[url(/images/video/shape.svg)] bg-cover bg-center bg-no-repeat"></div>
        <Order/>
      </div> */}

      {/* <CheckOut/> */}

      {/* <div className="w-screen h-screen p-8 flex items-start justify-center">
        <Users/>
      </div>
      <div className="w-screen h-screen p-8 flex items-start justify-center">
        <Users/>
      </div>
      <div className="w-screen h-screen p-8 flex items-start justify-center">
        <Users/>
      </div> */}


        
    </div>
  );
}
