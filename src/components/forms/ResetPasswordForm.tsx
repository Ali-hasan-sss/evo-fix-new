import React, { useContext, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DOMAIN } from "@/utils/constants";

interface ResetPasswordFormProps {
  onClose: () => void;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // تحقق من صحة البريد الإلكتروني
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // دالة لمعالجة إرسال الفورم
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // التحقق من صحة البريد الإلكتروني
    if (!validateEmail(email)) {
      toast.error("يرجى إدخال بريد إلكتروني صحيح");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${DOMAIN}/users/request-reset-password`, {
        email,
      });
      toast.success(
        "تم إرسال طلب استعادة كلمة المرور بنجاح، يرجى التحقق من بريدك الإلكتروني",
      );
      onClose();
    } catch (error) {
      toast.error("حدث خطأ أثناء إرسال الطلب، يرجى المحاولة لاحقًا");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`mx-auto max-w-md rounded-lg p-6 shadow-md `}>
      <h2 className="mb-4 text-center text-2xl font-semibold">
        استعادة كلمة المرور
      </h2>
      <form onSubmit={handleSubmit}>
        <label
          htmlFor="email"
          className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          البريد الإلكتروني
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600"
          placeholder="example@example.com"
          required
        />
        <button
          type="submit"
          className="btn-submit mt-4 w-full"
          disabled={loading}
        >
          {loading ? "جاري الإرسال..." : "إرسال"}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ResetPasswordForm;
