// src\app\layout.tsx
"use client"
import Footer from "@/components/Footer";
import Header from "@/components/Header/Header";
import ScrollToTop from "@/components/ScrollToTop";
import localfont from "next/font/local";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "node_modules/react-modal-video/css/modal-video.css";
import "@/styles/index.css";
import "react-toastify/dist/ReactToastify.css";
import "./global.css";

const inter = Inter({ subsets: ["latin"] });

const beIN = localfont({
  src: [
    {
      path: "../../public/fonts/beIN Normal .ttf",
      weight: "700",
    },
  ],
  variable: "--font-beIN",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html dir="rtl" lang="ar">
      <head />

      <body className={`bg-[#FCFCFC]  dark:bg-black ${beIN.variable}`}>
        <Providers>
        <Header />
          <ToastContainer theme="colored" position="top-center" />
          <main>{children}</main>
          <Footer />
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}

import { Providers } from "./providers";

