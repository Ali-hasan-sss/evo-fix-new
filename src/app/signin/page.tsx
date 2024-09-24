// src\app\signin\page.tsx
import { Metadata } from "next";
import Login from "@/components/login";

export const metadata: Metadata = {
  title: "EvoFix | تسجيل الدخول",
  description: "login into Evolution Fix",
  // other metadata
};

const SigninPage = () => {
  "use client";
  return <Login />;
};

export default SigninPage;
