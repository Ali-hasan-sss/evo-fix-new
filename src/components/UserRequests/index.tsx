// src\components\UserRequests\index.tsx
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
} from "@nextui-org/react";
import axios from "axios";
import { DOMAIN } from "@/utils/constants";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

// Define the status translation mapping
const statusTranslation = {
  ASSIGNED: "موافق عليه",
  PENDING: "قيد الانتظار",
  REJECTED: "مرفوض",
  IN_BROGRESS: "قيد المعالجة",
  COMPLETED: "منجز",
};

const statusColorMap: Record<string, ChipProps["color"]> = {
  COMPLETED: "success",
  REJECTED: "danger",
  PENDING: "warning",
  ASSIGNED: "primary",
  IN_BROGRESS: "primary",
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
  technician: { fullName: string };
  deviceType: string;
  problemDescription: string;
  cost: number;
  payments: { amount: number }[];
  user: {
    fullName: string;
    phoneNO: string;
  };
}

const UserRequests = () => {
  const [requests, setRequests] = useState<RequestData[]>([]);
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;

  const pages = Math.ceil(requests.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return requests.slice(start, end);
  }, [page, requests]);

  useEffect(() => {
    const fetchUserRequests = async () => {
      try {
        const token = Cookies.get("token");
        const response = await axios.get(
          `${DOMAIN}/api/maintenance-requests/all/user`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );
        setRequests(response.data);
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Error fetching userRequests",
        );
      }
    };

    fetchUserRequests();
  }, []);

  const getTotalPayments = (payments: { amount: number }[] = []) => {
    return payments?.length
      ? payments.reduce((sum, payment) => sum + payment.amount, 0)
      : 0;
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
        <TableColumn>المحافظة</TableColumn>
        <TableColumn>نوع الجهاز</TableColumn>
        <TableColumn>رقم الجوال</TableColumn>
        <TableColumn>وصف المشكلة</TableColumn>
        <TableColumn>حالة الطلب</TableColumn>
        <TableColumn>المصاريف</TableColumn>
        <TableColumn>المدفوعات</TableColumn>
        <TableColumn>دفع الرسوم</TableColumn>
      </TableHeader>
      <TableBody items={items}>
        {items.map((req) => (
          <TableRow key={req.id}>
            <TableCell>{req.governorate}</TableCell>
            <TableCell>{req.deviceType}</TableCell>
            <TableCell>{req.user.phoneNO}</TableCell>
            <TableCell>{req.problemDescription}</TableCell>

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

            {/* <TableCell>{translateStatus(req.status)}</TableCell> */}
            <TableCell>{req.cost}</TableCell>
            <TableCell>{getTotalPayments(req.payments)}</TableCell>
            <TableCell>
              <Button
                onClick={() => console.log(req.id)}
                variant="bordered"
                accessKey={req.id}
              >
                تحويل
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserRequests;
