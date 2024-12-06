import React, { useState, useContext } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";
import { DOMAIN } from "@/utils/constants";

import SyriatelImage from "../assets/images/syriatel.jpeg";
import MTNImage from "../assets/images/mtn.jpeg";
import { ClipLoader } from "react-spinners";

interface PaymentFormProps {
  requestId: number | null;
  closeModal: () => void;
  update: () => void;
  isInspectionPayment: boolean;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  requestId,
  closeModal,
  update,
  isInspectionPayment,
}) => {
  const [step, setStep] = useState(1);
  const [typePaid, setTypePaid] = useState<string | null>(null);
  const [OperationNumber, setOperationNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [CheckFee, setCheckFee] = useState("");
  const [textMessage, setTextMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // جلب حالة الوضع (دارك/لايت)

  const handleTypeSelect = (type: string) => {
    setTypePaid(type);
    setStep(2); // الانتقال للخطوة الثانية
  };

  const handleBack = () => {
    setStep(1); // العودة للخطوة الأولى
  };

  const handleSubmit = async () => {
    const finalAmount = isInspectionPayment ? Number(CheckFee) : Number(amount);
    const operationNum = Number(OperationNumber);

    if (
      !operationNum ||
      finalAmount <= 0 ||
      !textMessage.trim() ||
      !typePaid ||
      !requestId
    ) {
      toast.error("يرجى تعبئة جميع الحقول بشكل صحيح");
      return;
    }

    const token = Cookies.get("token");

    const paymentData = {
      typePaid,
      OperationNumber: operationNum,
      ...(isInspectionPayment
        ? { CheckFee: finalAmount }
        : { amount: finalAmount }),
      textMessage,
    };

    const apiUrl = isInspectionPayment
      ? `${DOMAIN}/maintenance-requests/${requestId}/accept_check`
      : `${DOMAIN}/epaid/${requestId}`;

    setIsLoading(true);
    try {
      await axios.post(apiUrl, paymentData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("تمت عملية الدفع بنجاح");
      closeModal();
      update();
    } catch (error: unknown) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.data &&
        (error.response.data as { message?: string }).message
      ) {
        const errorMessage = (error.response.data as { message: string })
          .message;
        toast.error(`حدث خطأ: ${errorMessage}`);
      } else {
        toast.error("حدث خطأ أثناء عملية الدفع");
      }
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`mx-auto w-full max-w-[500px] px-4 py-6 sm:max-w-md`}>
      {step === 1 ? (
        <div className="flex items-center justify-center gap-8">
          <div
            className="cursor-pointer overflow-hidden rounded-full"
            onClick={() => handleTypeSelect("SYRIATEL_CACH")}
          >
            <Image
              src={SyriatelImage}
              alt="Syriatel Payment"
              width={150}
              height={150}
              className="h-24 w-40 rounded-[50%] object-cover"
            />
          </div>
          <div
            className="cursor-pointer overflow-hidden rounded-full"
            onClick={() => handleTypeSelect("MTN_CACH")}
          >
            <Image
              src={MTNImage}
              alt="MTN Payment"
              width={150}
              height={150}
              className="h-24 w-40 rounded-[50%] object-cover"
            />
          </div>
        </div>
      ) : (
        <div className="text-center">
          <Image
            src={typePaid === "SYRIATEL_CACH" ? SyriatelImage : MTNImage}
            alt="Selected Payment"
            width={150}
            height={150}
            className="mx-auto mb-2 mt-2 h-40 w-40 object-contain"
          />
          <div className="mb-4 w-full">
            <label className={`mb-2 block text-sm font-bold `}>
              رقم عملية التحويل
            </label>
            <input
              type="number"
              value={OperationNumber}
              onChange={(e) => setOperationNumber(e.target.value)}
              className={`focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none `}
            />
          </div>
          <div className="mb-4 w-full">
            <label className={`mb-2 block text-sm font-bold `}>المبلغ</label>
            <input
              type="number"
              value={isInspectionPayment ? CheckFee : amount}
              onChange={(e) =>
                isInspectionPayment
                  ? setCheckFee(e.target.value)
                  : setAmount(e.target.value)
              }
              className={`focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none `}
            />
          </div>
          <div className="mb-4 w-full">
            <label className={`mb-2 block text-sm font-bold `}>
              نص رسالة التحويل
            </label>
            <textarea
              value={textMessage}
              onChange={(e) => setTextMessage(e.target.value)}
              className={`focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none `}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              className="focus:shadow-outline rounded bg-gray-500 px-4 py-2 font-bold text-white hover:bg-gray-700 focus:outline-none"
            >
              رجوع
            </button>
            <button
              onClick={handleSubmit}
              className="focus:shadow-outline rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700 focus:outline-none disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? (
                <ClipLoader size={20} color={"#ffffff"} />
              ) : (
                "إتمام عملية الدفع"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
