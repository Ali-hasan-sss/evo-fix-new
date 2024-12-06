"use client";

import React, { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import Tabs from "@/components/usercomponents/Tabs";
import RepairRequestCard from "@/components/usercomponents/RepairRequestCard";
import { RepairRequest } from "@/utils/types";
import axios from "axios";
import { DOMAIN } from "@/utils/constants";
import { FaAngleDoubleDown, FaSync } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import Breadcrumb from "@/components/Common/Breadcrumb";

const RepairRequests: React.FC = () => {
  const [repairRequests, setRepairRequests] = useState<RepairRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("available");

  // للتعامل مع السحب
  const statusMap: { [key: string]: string } = {
    PENDING: "قيد الانتظار",
    IN_PROGRESS: "جارٍ التنفيذ",
    COMPLETED: "مكتمل",
    REJECTED: "مرفوض",
    ASSIGNED: "قيد التسعير",
    QUOTED: "انتظار القبول",
  };

  // تعريف التبويبات
  const tabs = [
    { label: "جميع الطلبات", key: "available" },
    { label: " الطلبات المعلقة", key: "pending" },
    { label: "قيد التسعير", key: "assigned" },
    { label: "قيد الاصلاح", key: "in_progress" },
    { label: "الطلبات المنجزة", key: "completed" },
    { label: "الطلبات المرفوضة", key: "rejected" },
  ];

  // دالة لجلب البيانات من الخادم أو من الـ localStorage إذا كانت موجودة
  const fetchRepairRequests = async () => {
    setLoading(true);
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      const response = await axios.get<RepairRequest[]>(
        `${DOMAIN}/maintenance-requests/all/user`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (Array.isArray(response.data)) {
        setRepairRequests(response.data);

        if (typeof window !== "undefined") {
          localStorage.setItem("repairRequests", JSON.stringify(response.data)); // حفظ البيانات في localStorage
        }

        toast.success("تم تحديث الطلبات بنجاح.");
      } else {
        console.warn("البيانات المستلمة ليست مصفوفة.");
      }
    } catch (error) {
      console.error("حدث خطأ أثناء جلب البيانات:", error);
      toast.error("حدث خطأ أثناء جلب البيانات.");
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  // تحميل البيانات من localStorage عند التحميل الأول
  useEffect(() => {
    const storedRequests = localStorage.getItem("repairRequests");
    if (storedRequests) {
      setRepairRequests(JSON.parse(storedRequests));
    } else {
      fetchRepairRequests();
    }
  }, []);

  // التصفية حسب التبويب النشط
  const getFilteredRequests = (): RepairRequest[] => {
    switch (activeTab) {
      case "pending":
        return repairRequests.filter(
          (req) => req.status.toUpperCase() === "PENDING",
        );
      case "assigned":
        return repairRequests.filter(
          (req) => req.status.toUpperCase() === "ASSIGNED",
        );
      case "in_progress":
        return repairRequests.filter(
          (req) => req.status.toUpperCase() === "IN_PROGRESS",
        );
      case "completed":
        return repairRequests.filter(
          (req) => req.status.toUpperCase() === "COMPLETED",
        );
      case "rejected":
        return repairRequests.filter(
          (req) => req.status.toUpperCase() === "REJECTED",
        );
      case "available":
      default:
        return repairRequests;
    }
  };

  const filteredRequests = getFilteredRequests();

  // التعامل مع السحب
  const handleRefresh = async (): Promise<void> => {
    setIsRefreshing(true);
    await fetchRepairRequests();
  };

  return (
    <div
      className="relative   flex w-full flex-col pt-5"
      style={{ minHeight: "90vh" }}
    >
      <Breadcrumb
        pageName="طلباتي"
        description="تصفح جميع الطلبات وتتبع حالة كل منهم"
      />
      <div className="mb-4 flex w-full items-center ">
        <button
          onClick={handleRefresh}
          className={` z-50 flex h-10 w-10 items-center rounded px-2 py-1 text-white hover:text-gray-600 `}
          disabled={isRefreshing}
        >
          {isRefreshing ? (
            <ClipLoader color="#4A90E2" size={20} />
          ) : (
            <FaSync className="mr-1" />
          )}
        </button>
      </div>

      <div className="w-full flex-grow rounded p-2">
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="grid gap-3 p-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredRequests.length === 0 ? (
            <p>لا توجد طلبات في هذا التبويب.</p>
          ) : (
            filteredRequests.map((request) => (
              <RepairRequestCard
                userRole={"USER"}
                key={request.id}
                request={request}
                statusMap={statusMap}
                onRequestUpdated={handleRefresh}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RepairRequests;
