import React, { useContext, useState } from "react";
import { ClipLoader } from "react-spinners";
import { RepairRequest } from "@/utils/types";
import Image from "next/image";
import PricingForm from "@/components/forms/costform";
import Modal from "react-modal";
import axios from "axios";
import { DOMAIN } from "@/utils/constants";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";

interface RepairRequestCardProps {
  request: RepairRequest;
  statusMap: { [key: string]: string };
  userRole: "ADMIN" | "SUB_ADMIN" | "USER" | "TECHNICIAN";
  onRequestUpdated: () => void;
}

const RepairRequestCard: React.FC<RepairRequestCardProps> = ({
  request,
  statusMap,
  userRole,
  onRequestUpdated,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const getButtonLabel = () => {
    if (userRole === "TECHNICIAN") {
      if (request.status === "ASSIGNED" && request.isPaidCheckFee === true) {
        return "تسعير الطلب";
      } else if (request.status === "IN_PROGRESS") {
        return "تسليم المهمة";
      } else if (request.status === "PENDING") {
        return "استلام المهمة";
      }
      return null;
    } else if (userRole === "USER" && request.status === "PENDING") {
      return "حذف";
    }
    return null;
  };

  const handleButtonClick = () => {
    if (userRole === "TECHNICIAN" && request.status === "ASSIGNED") {
      setIsModalOpen(true);
    } else if (userRole === "TECHNICIAN" && request.status === "IN_PROGRESS") {
      handleSubmitTask();
    } else if (userRole === "TECHNICIAN" && request.status === "PENDING") {
      handleReceiveTask();
    } else {
      handleDeleteRequest();
    }
  };

  const handleReceiveTask = async () => {
    setIsProcessing(true); // تفعيل حالة التحميل
    try {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
        "$1",
      );

      const response = await axios.put(
        `${DOMAIN}/maintenance-requests/${request.id}/assign`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status === 200) {
        toast.success("تم استلام المهمة بنجاح");
        onRequestUpdated();
      } else {
        toast.error("فشل في استلام المهمة");
      }
    } catch (error) {
      toast.error("خطأ في استلام المهمة");
      console.error("خطأ في استلام المهمة", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmitTask = async () => {
    setIsProcessing(true);
    try {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
        "$1",
      );

      const response = await axios.put(
        `${DOMAIN}/maintenance-requests/${request.id}/complete`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (response.status === 200) {
        toast.success("تم تسليم المهمة بنجاح");
        onRequestUpdated();
      } else {
        toast.error("فشل في تسليم المهمة");
      }
    } catch (error) {
      toast.error("خطأ في تسليم المهمة");
      console.error("خطأ في تسليم المهمة", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeleteRequest = async () => {
    confirmAlert({
      title: "تأكيد الحذف",
      message: "هل أنت متأكد أنك تريد حذف هذا الطلب؟",
      buttons: [
        {
          label: "نعم",
          onClick: async () => {
            setIsDeleting(true);
            try {
              const token = document.cookie.replace(
                /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
                "$1",
              );

              const response = await axios.delete(
                `${DOMAIN}/maintenance-requests/${request.id}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                },
              );

              if (response.status === 200) {
                toast.success("تم حذف الطلب بنجاح");

                // تحديث البيانات في localStorage
                const storedData = localStorage.getItem("repairRequests");
                if (storedData) {
                  const parsedData = JSON.parse(storedData);
                  console.log("قبل الحذف من localStorage:", parsedData);

                  const updatedData = parsedData.filter(
                    (item: RepairRequest) => item.id !== request.id,
                  );

                  console.log("بعد الحذف من localStorage:", updatedData);

                  localStorage.setItem(
                    "repairRequests",
                    JSON.stringify(updatedData),
                  );

                  // تحقق من البيانات في localStorage
                  const newStoredData = localStorage.getItem("repairRequests");
                  console.log(
                    "البيانات المحدثة في localStorage:",
                    JSON.parse(newStoredData || "[]"),
                  );
                }

                // تحديث الطلبات في الواجهة
                onRequestUpdated();
              } else {
                toast.error("فشل في حذف الطلب");
              }
            } catch (error) {
              toast.error("خطأ في حذف الطلب");
              console.error("خطأ في حذف الطلب", error);
            } finally {
              setIsDeleting(false);
            }
          },
        },
        {
          label: "لا",
          onClick: () => {
            toast.info("تم إلغاء الحذف");
          },
        },
      ],
    });
  };

  return (
    <div className={`mb-4 max-w-sm  overflow-hidden rounded-lg shadow-md `}>
      <Image
        src={
          typeof request.deviceImage === "string"
            ? request.deviceImage
            : "/assets/images/default-device.png"
        }
        alt={String(request.deviceType) || "Unknown device"}
        width={500}
        height={300}
        className="h-48 w-full object-cover"
      />
      <div className="p-4">
        <h2 className="mb-2 border-b text-xl font-bold">
          {userRole === "TECHNICIAN"
            ? "طلب صيانة"
            : request.user && request.user.fullName
              ? String(request.user.fullName)
              : "اسم غير معروف"}
        </h2>

        <p className="mb-2 border-b pb-2">
          <strong>المحافظة:</strong>
          <strong className="mr-2">
            {String(request.governorate) || "غير محدد"}
          </strong>
        </p>

        <div className="mb-2 flex justify-between border-b pb-2">
          <p className="border-l pl-2">
            <strong>نوع الجهاز:</strong>{" "}
            {String(request.deviceType) || "غير محدد"}
          </p>
          <p>
            <strong>موديل الجهاز:</strong>{" "}
            {String(request.deviceModel) || "غير معروف"}
          </p>
        </div>

        <p className="mb-2 border-b pb-2">
          <strong> الحالة:</strong>
          <span
            className={`text-sm font-semibold ${
              request.status === "COMPLETED"
                ? "text-green-500"
                : request.status === "IN_PROGRESS"
                  ? "text-yellow-500"
                  : request.status === "REJECTED"
                    ? "text-red-500"
                    : request.status === "QUOTED"
                      ? "text-purple-500"
                      : request.status === "ASSIGNED"
                        ? "text-orange-500"
                        : request.status === "PENDING"
                          ? "text-gray-500"
                          : "text-blue-500"
            }`}
          >
            {statusMap[request.status] || "حالة غير معروفة"}
          </span>
        </p>

        {isExpanded && (
          <div>
            {userRole !== "TECHNICIAN" && (
              <>
                <p className="border-b pb-2">
                  <strong>رقم الهاتف:</strong>{" "}
                  {String(request.user.phoneNO) || "غير متوفر"}
                </p>
                <p className="border-b pb-2">
                  <strong>العنوان:</strong>{" "}
                  {String(request.user.address) || "غير معروف"}
                </p>
              </>
            )}
            <p className="border-b pb-2">
              <strong>وصف المشكلة:</strong>{" "}
              {String(request.problemDescription) || "غير متوفر"}
            </p>
            <p className="border-b pb-2">
              <strong>التكلفة:</strong>
              {request.cost === 0
                ? "غير مسعر بعد"
                : String(request.cost) || "غير متوفر"}
            </p>
            <p className="border-b pb-2">
              <strong>اجور الكشف:</strong>
              <span
                className={`text-sm font-bold ${
                  request.isPaidCheckFee ? "text-green-500" : "text-red-500"
                }`}
              >
                {request.isPaidCheckFee ? "تم الدفع" : "لم يتم الدفع"}
              </span>
            </p>
            <p className="border-b pb-2">
              <strong>الأجور:</strong>
              <span
                className={`text-sm font-bold ${
                  request.isPaid ? "text-green-500" : "text-red-500"
                }`}
              >
                {request.isPaid ? "تم الدفع" : "لم يتم الدفع"}
              </span>
            </p>
          </div>
        )}

        <div className="flex items-center justify-between">
          <button
            className="font-bold text-primary hover:text-gray-500"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "عرض اقل" : "عرض المزيد"}
          </button>
          {getButtonLabel() && (
            <button
              className={`mt-2 rounded-md px-4 py-2 text-white ${
                isDeleting || isProcessing
                  ? "cursor-not-allowed bg-gray-400"
                  : getButtonLabel() === "حذف"
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-blue-500 hover:bg-blue-600"
              }`}
              onClick={handleButtonClick}
              disabled={isDeleting || isProcessing}
            >
              {isDeleting || isProcessing ? (
                <ClipLoader size={20} color="#ffffff" />
              ) : (
                getButtonLabel()
              )}
            </button>
          )}
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Form Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <PricingForm
          requestId={String(request.id)}
          onClose={() => setIsModalOpen(false)}
          onRequestUpdated={onRequestUpdated}
        />
      </Modal>
    </div>
  );
};

export default RepairRequestCard;
