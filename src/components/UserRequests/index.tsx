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
  Chip,Pagination,
} from "@nextui-org/react";
import axios from "axios";
import { DOMAIN } from "@/utils/constants";
import { toast } from "react-toastify";

// Define the status translation mapping
const statusTranslation = {
  APPROVED: "موافق عليه",
  PENDING: "قيد الانتظار",
  REJECTED: "مرفوض",
  UNDERPROCESSING: "قيد المعالجة",
  DONE: "منجز"
};

const statusColorMap: Record<string, ChipProps["color"]>  = {
  DONE: "success",
  REJECTED: "danger",
  PENDING: "warning",
  APPROVED: "primary",
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
  descProblem: string;
  fee: number;
  payments: { amount: number }[];
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
        const response = await axios.get(`${DOMAIN}/api/users/userRequests`);
        setRequests(response.data);
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Error fetching userRequests",
        );
      }
    };

    fetchUserRequests();
  }, []);

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
        <TableColumn>التقني</TableColumn>
        <TableColumn>المحافظة</TableColumn>
        <TableColumn>نوع الجهاز</TableColumn>
        <TableColumn>رقم الجوال</TableColumn>
        <TableColumn>العنوان</TableColumn>
        <TableColumn>وصف المشكلة</TableColumn>
        <TableColumn>حالة الطلب</TableColumn>
        <TableColumn>المصاريف</TableColumn>
        <TableColumn>المدفوعات</TableColumn>
      </TableHeader>
      <TableBody items={items}>
        {items.map((req) => (
          <TableRow key={req.id}>
            <TableCell>{req.technician.fullName}</TableCell>
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

            {/* <TableCell>{translateStatus(req.status)}</TableCell> */}
            <TableCell>{req.fee}</TableCell>
            <TableCell>{getTotalPayments(req.payments)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserRequests;
