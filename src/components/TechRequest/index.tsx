// src\components\TechRequest\index.tsx
"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  ChipProps,
  Chip,
  Pagination,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import axios from "axios";
import { DOMAIN } from "@/utils/constants";
import { toast } from "react-toastify";
import { VerticalDotsIcon } from "../Users/VerticalDotsIcon";

// Define the status translation mapping
const statusTranslation = {
  APPROVED: "موافق عليه",
  PENDING: "قيد الانتظار",
  REJECTED: "مرفوض",
  UNDERPROCESSING: "قيد المعالجة",
  DONE: "منجز",
};

// Helper function to translate status
const translateStatus = (status: keyof typeof statusTranslation) => {
  return statusTranslation[status] || status;
};

interface RequestData {
  id: string;
  governorate: string;
  phoneNO: string;
  address: string;
  status: keyof typeof statusTranslation;
  user: { fullName: string };
  deviceType: string;
  descProblem: string;
  fee: number;
  payments: { amount: number }[];
}

const statusColorMap: Record<string, ChipProps["color"]> = {
  DONE: "success",
  REJECTED: "danger",
  PENDING: "warning",
  APPROVED: "primary",
};


const TechRequests = () => {
  const [requests, setRequests] = useState<RequestData[]>([]);

  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;

  const pages = Math.ceil(requests.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return requests.slice(start, end);
  }, [page, requests]);


  const fetchTechRequests = async () => {
    try {
      const response = await axios.get(
        `${DOMAIN}/api/users/Technicals/offers`,
      );
      setRequests(response.data);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Error fetching TechRequests",
      );
    }
  };


  useEffect(() => {
    fetchTechRequests();
  }, []);

  const handleAction = async (action: string, id: string) => {
    try {
      switch (action) {
        case 'APPROVED':
          await axios.put(`${DOMAIN}/api/users/Technicals/offers/manageRequests/approved/${id}`);
          toast.success("تم استلام الطلب بنجاح");
          break;
        case 'UNDERPROCESSING':
          await axios.put(`${DOMAIN}/api/users/Technicals/offers/manageRequests/underProcess/${id}`);
          toast.success("تم بدء معالجة الطلب");
          break;
        case 'REJECTED':
          await axios.put(`${DOMAIN}/api/users/Technicals/offers/manageRequests/rejected/${id}`);
          toast.warning("تم رفض الطلب");
          break;
        case 'DONE':
          await axios.put(`${DOMAIN}/api/users/Technicals/offers/manageRequests/done/${id}`);
          toast.success("تم تسليم الطلب");
          break;
        default:
          throw new Error("إجراء غير معروف");
      }
      // Refresh the requests list after action
      fetchTechRequests();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || `خطأ في تنفيذ الإجراء: ${action}`
      );
    }
  };

  const getTotalPayments = (payments: { amount: number }[]) => {
    return payments.reduce((sum, payment) => sum + payment.amount, 0);
  };

  return (
    
    <Table 
      aria-label="Example table with client side pagination"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            // isCompact
            showControls
            showShadow
            color="primary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
      classNames={{
        wrapper: "min-h-[222px]",
      }}
    >
      <TableHeader>
        <TableColumn>المستخدم</TableColumn>
        <TableColumn>المحافظة</TableColumn>
        <TableColumn>نوع الجهاز</TableColumn>
        <TableColumn>رقم الجوال</TableColumn>
        <TableColumn>العنوان</TableColumn>
        <TableColumn>وصف المشكلة</TableColumn>
        <TableColumn>حالة الطلب</TableColumn>
        <TableColumn>المصاريف</TableColumn>
        <TableColumn>المدفوعات</TableColumn>
        <TableColumn>الإجراءات</TableColumn>
      </TableHeader>
      <TableBody items={items}>

        {items.map((req) => (
          <TableRow key={req.id}>
            <TableCell>{req.user.fullName}</TableCell>
            <TableCell>{req.governorate}</TableCell>
            <TableCell>{req.deviceType}</TableCell>
            <TableCell>{req.phoneNO}</TableCell>
            <TableCell>{req.address}</TableCell>
            <TableCell>{req.descProblem}</TableCell>
            <TableCell>
              <Chip
                className="capitalize"
                color={statusColorMap[req.status]}
                size="sm"
                variant="flat"
              >
                {translateStatus(req.status)}
              </Chip>
            </TableCell>
            <TableCell>{req.fee}</TableCell>
            <TableCell>{getTotalPayments(req.payments)}</TableCell>
            <TableCell>
            <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu onAction={(key) => handleAction(key as string, req.id)}>
                <DropdownItem key={'APPROVED'}>تأكيد الطلب</DropdownItem>
                <DropdownItem key={'UNDERPROCESSING'}>بدء الصيانة</DropdownItem>
                <DropdownItem key={'REJECTED'} className="text-danger" color="danger">رفض الطلب</DropdownItem>
                <DropdownItem key={'DONE'}>إنهاء الطلب</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
            </TableCell>
          </TableRow>
        ))}

      </TableBody>
    </Table>
  );
};

export default TechRequests;
