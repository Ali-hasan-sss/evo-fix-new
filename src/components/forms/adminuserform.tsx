"use client";

import React, { useState, useContext } from "react";
import { toast } from "react-toastify";

interface FormData {
  fullName: string;
  email: string;
  phoneNO: string;
  governorate: string;
  address: string;
  password: string;
  confirmPassword: string;
  specialization?: string;
  services?: string;
}

interface FormErrors {
  fullName: string;
  email: string;
  phoneNO: string;
  governorate: string;
  address: string;
  password: string;
  confirmPassword: string;
  specialization?: string;
  services?: string;
}

interface UserFormProps {
  initialData?: FormData;
  onSubmit: (data: FormData) => void;
  submitButtonLabel?: string;
  isNew?: boolean;
  isUser?: boolean;
  isTechnical?: boolean;
}

const UserForm: React.FC<UserFormProps> = ({
  initialData = {
    fullName: "",
    email: "",
    governorate: "",
    password: "",
    confirmPassword: "",
    phoneNO: "",
    address: "",
    specialization: "",
    services: "",
  },
  onSubmit,
  submitButtonLabel = "التسجيل",
  isNew = true,
  isTechnical = false,
}) => {
  const [formData, setFormData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<FormErrors>({
    fullName: "",
    email: "",
    phoneNO: "",
    governorate: "",
    address: "",
    password: "",
    confirmPassword: "",
    specialization: "",
    services: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      fullName: "",
      email: "",
      phoneNO: "",
      governorate: "",
      address: "",
      password: "",
      confirmPassword: "",
      specialization: "",
      services: "",
    };
    let isValid = true;

    if (!formData.fullName) {
      newErrors.fullName = "اسم المستخدم مطلوب";
      isValid = false;
    }
    if (!formData.email) {
      newErrors.email = "البريد الإلكتروني مطلوب";
      isValid = false;
    }
    if (!formData.phoneNO) {
      newErrors.phoneNO = "رقم الهاتف مطلوب";
      isValid = false;
    }
    if (!formData.governorate) {
      newErrors.governorate = "المحافظة مطلوبة";
      isValid = false;
    }
    if (!formData.address) {
      newErrors.address = "العنوان مطلوب";
      isValid = false;
    }
    if (!isNew && !formData.password) {
      newErrors.password = "كلمة المرور مطلوبة";
      isValid = false;
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "كلمات المرور غير متطابقة";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    } else {
      toast.error("يرجى تصحيح الأخطاء في النموذج");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`p-4 `}>
      <div className="mb-4">
        <label className="mb-1 block">اسم المستخدم</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full rounded border p-2"
        />
        {errors.fullName && (
          <span className="text-sm text-red-500">{errors.fullName}</span>
        )}
      </div>
      {/* باقي حقول النموذج بنفس الطريقة */}
      <div className="mb-4">
        <label className="mb-1 block">البريد الإلكتروني</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full rounded border p-2"
        />
        {errors.email && (
          <span className="text-sm text-red-500">{errors.email}</span>
        )}
      </div>
      <div className="mb-4">
        <label className="mb-1 block">رقم الهاتف</label>
        <input
          type="text"
          name="phoneNO"
          value={formData.phoneNO}
          onChange={handleChange}
          className="w-full rounded border p-2"
        />
        {errors.phoneNO && (
          <span className="text-sm text-red-500">{errors.phoneNO}</span>
        )}
      </div>
      <div className="mb-4">
        <label className="mb-1 block">المحافظة</label>
        <input
          type="text"
          name="governorate"
          value={formData.governorate}
          onChange={handleChange}
          className="w-full rounded border p-2"
        />
        {errors.governorate && (
          <span className="text-sm text-red-500">{errors.governorate}</span>
        )}
      </div>
      <div className="mb-4">
        <label className="mb-1 block">العنوان</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full rounded border p-2"
        />
        {errors.address && (
          <span className="text-sm text-red-500">{errors.address}</span>
        )}
      </div>
      {!isNew && (
        <>
          <div className="mb-4">
            <label className="mb-1 block">كلمة المرور</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded border p-2"
            />
            {errors.password && (
              <span className="text-sm text-red-500">{errors.password}</span>
            )}
          </div>
          <div className="mb-4">
            <label className="mb-1 block">تأكيد كلمة المرور</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full rounded border p-2"
            />
            {errors.confirmPassword && (
              <span className="text-sm text-red-500">
                {errors.confirmPassword}
              </span>
            )}
          </div>
        </>
      )}
      {isTechnical && (
        <div className="mb-4">
          <label className="mb-1 block">التخصص</label>
          <input
            type="text"
            name="specialization"
            value={formData.specialization || ""}
            onChange={handleChange}
            className="w-full rounded border p-2"
          />
          {errors.specialization && (
            <span className="text-sm text-red-500">
              {errors.specialization}
            </span>
          )}
        </div>
      )}
      {isTechnical && (
        <div className="mb-4">
          <label className="mb-1 block">وصف الخدمات</label>
          <textarea
            name="services"
            value={formData.services || ""}
            onChange={handleChange}
            className="w-full rounded border p-2"
          />
          {errors.services && (
            <span className="text-sm text-red-500">{errors.services}</span>
          )}
        </div>
      )}
      <button
        type="submit"
        className="w-full rounded bg-blue-500 p-2 text-white hover:bg-blue-700"
      >
        {submitButtonLabel}
      </button>
    </form>
  );
};

export default UserForm;
