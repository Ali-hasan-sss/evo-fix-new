// src\app\signup\page.tsx
import { Metadata } from "next";
import SignUp from "@/components/Signup";

export const metadata: Metadata = {
  title: "EvoFix | إنشاء حساب",
  description: "This is Sign Up Page for Evolution Fix",
};

const SignupPage = () => {
  "use client";
  return <SignUp/>
};

export default SignupPage;
