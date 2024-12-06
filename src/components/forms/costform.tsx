import React, { useContext, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { DOMAIN } from "@/utils/constants";
import { ClipLoader } from "react-spinners";

interface PricingFormProps {
  requestId: string;
  onClose: () => void;
  onRequestUpdated: () => void;
}

const PricingForm: React.FC<PricingFormProps> = ({
  requestId,
  onClose,
  onRequestUpdated,
}) => {
  const [cost, setCost] = useState<number | "">("");
  const [resultCheck, setResultCheck] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    // التحقق من أن التكلفة رقم صحيح وأن وصف العطل ليس فارغًا
    if (cost === "" || Number(cost) < 0 || resultCheck.trim() === "") {
      setError("يجب إدخال تكلفة صالحة ووصف العطل");
      return;
    }

    try {
      setIsLoading(true);
      const token = Cookies.get("token");
      await axios.put(
        `${DOMAIN}/maintenance-requests/${requestId}/quote`,
        {
          cost: Number(cost), // التأكد من إرسال التكلفة كـ number
          resultCheck,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      onRequestUpdated();
      onClose();
    } catch (err) {
      console.error("خطأ أثناء تسعير الطلب:", err);
      setError("حدث خطأ أثناء تسعير الطلب.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center `}>
      <div className={` w-full max-w-md rounded p-6 shadow-md`}>
        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label htmlFor="cost" className="mb-2 block font-bold">
              التكلفة
            </label>
            <input
              type="number"
              id="cost"
              value={cost}
              onChange={(e) => setCost(Number(e.target.value))}
              className={`w-full rounded border p-2  text-black`}
              placeholder="أدخل التكلفة"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="resultCheck" className="mb-2 block font-bold">
              وصف العطل
            </label>
            <textarea
              id="resultCheck"
              value={resultCheck}
              onChange={(e) => setResultCheck(e.target.value)}
              className={`w-full rounded border p-2  text-black`}
              placeholder="أدخل وصف العطل"
            />
          </div>

          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

          <div className="mt-4 flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
              disabled={isLoading}
            >
              إغلاق
            </button>
            <button
              type="submit"
              className="flex items-center justify-center rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              disabled={isLoading}
            >
              {isLoading ? <ClipLoader color="#fff" size={20} /> : "ارسال"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PricingForm;
