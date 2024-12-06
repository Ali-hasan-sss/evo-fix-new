// src\components\Header\Header.tsx
import Image from "next/image";
import Link from "next/link";
import React from "react";
const Header = () => {
  return (
    <header className="header relative flex h-14 w-full items-center justify-between px-16">
      <div className="logo w-40">
        <div className="w-60 max-w-full px-4 xl:mr-12">
          <Link
            href="/"
            // className={`header-logo block w-full ${
            //   sticky ? "py-5 lg:py-2" : "py-8"
            // } `}
          >
            <Image
              src="/images/logo/logo-2.svg"
              alt="logo"
              width={140}
              height={30}
              className="w-full dark:hidden"
            />
            <Image
              src="/images/logo/logo.svg"
              alt="logo"
              width={140}
              height={30}
              className="hidden w-full dark:block"
            />
          </Link>
        </div>
      </div>

      <nav className="navbar">
        <ul className="navbar-links flex">
          <Link href={"/"}>
            <li className="navbar-link px-4">الرئيسية</li>
          </Link>
          <Link href={"/"}>
            <li className="navbar-link px-4">الخدمات</li>
          </Link>
          <Link href={"/"}>
            <li className="navbar-link px-4">من نحن</li>
          </Link>
          <Link href={"/"}>
            <li className="navbar-link px-4">اتصل بنا</li>
          </Link>
        </ul>
        <div className="navbar-menu">
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
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>
      </nav>

      <div className="flex">
        <Link className="px-4" href={"/"}>
          تسجيل الدخول
        </Link>
        <Link className="px-4" href={"/"}>
          إنشاء حساب
        </Link>
      </div>
    </header>
  );
};

export default Header;
