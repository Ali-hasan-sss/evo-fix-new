"use client";

import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { DOMAIN } from "@/utils/constants";
const ContactForm = () => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // تحقق من تعبئة الحقول المطلوبة
    if (!email || !subject || !content) {
      toast.error("يرجى ملء جميع الحقول المطلوبة.");
      return;
    }

    setIsLoading(true);

    try {
      await axios.post(`${DOMAIN}/contact-us`, {
        email,
        subject,
        content,
      });

      // رسالة تأكيد الإرسال
      toast.success("تم إرسال رسالتك بنجاح!");

      // إعادة تعيين الحقول بعد الإرسال
      setEmail("");
      setSubject("");
      setContent("");
    } catch (error) {
      console.error("حدث خطأ أثناء إرسال الرسالة:", error);
      toast.error("فشل في إرسال الرسالة. حاول مرة أخرى.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`login mx-auto max-w-md rounded p-6 `}
    >
      <h2 className="mb-4 text-center text-2xl font-bold">اتصل بنا</h2>

      <div className="mb-4">
        <label htmlFor="email" className="mb-2 block">
          البريد الإلكتروني
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full rounded  p-2 outline-none `}
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="subject" className="mb-2 block">
          الموضوع
        </label>
        <input
          type="text"
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className={`w-full rounded  p-2 outline-none`}
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="content" className="mb-2 block">
          المحتوى
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={`w-full rounded  p-2 outline-none `}
          rows={4}
          required
        ></textarea>
      </div>

      <button
        type="submit"
        className="btn-submit mt-4 w-full  px-4 py-2 text-white "
        disabled={isLoading}
      >
        {isLoading ? "جاري الإرسال..." : "إرسال"}
      </button>
    </form>
  );
};

export default ContactForm;
