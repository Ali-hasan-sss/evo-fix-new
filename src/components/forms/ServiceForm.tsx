import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
interface ServiceFormProps {
  initialData?: {
    title: string;
    description: string;
    serviceImage?: File | null;
  };
  onSubmit: (data: {
    title: string;
    description: string;
    serviceImage: File | null;
  }) => void;
  onClose: () => void;
}

const ServiceForm: React.FC<ServiceFormProps> = ({
  initialData,
  onSubmit,
  onClose,
}) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || "",
  );
  const [serviceImage, setServiceImage] = useState<File | null>(
    initialData?.serviceImage || null,
  );
  const [preview, setPreview] = useState<string | null>(null);
  useEffect(() => {
    // تحديث رابط المعاينة عند تغيير الصورة
    if (serviceImage) {
      const imagePreviewUrl = URL.createObjectURL(serviceImage);
      setPreview(imagePreviewUrl);

      // تنظيف الرابط عند مغادرة المكون
      return () => URL.revokeObjectURL(imagePreviewUrl);
    } else {
      setPreview(null); // إذا لم يكن هناك صورة
    }
  }, [serviceImage]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setServiceImage(event.target.files[0]);
    }
  };

  const handleRemoveImage = () => {
    setServiceImage(null); // إزالة الصورة
    setPreview(null); // إعادة تعيين رابط المعاينة
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({ title, description, serviceImage });
  };

  return (
    <div className={`rounded p-4 shadow-lg `}>
      <h3 className="mb-4 text-xl font-semibold">
        {initialData ? "تعديل الخدمة" : "إضافة خدمة جديدة"}
      </h3>
      <form onSubmit={handleSubmit} className={`p-2 `}>
        <div className="mb-4">
          <label className="mb-1 block font-medium">عنوان الخدمة</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className={`w-full rounded border p-2 `}
            placeholder="أدخل عنوان الخدمة"
          />
        </div>
        <div className="mb-4">
          <label className="mb-1 block font-medium">وصف الخدمة</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className={`w-full rounded border p-2 `}
            placeholder="أدخل وصف الخدمة"
          />
        </div>
        <div className="mb-4">
          <label className="mb-1 block font-medium">صورة الخدمة</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full"
          />
          {preview && ( // عرض المعاينة إذا كانت موجودة
            <div className="mt-4">
              <Image
                src={preview}
                alt="معاينة الصورة"
                width={200}
                height={200}
                className="h-auto rounded"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="mt-2 rounded bg-red-500 px-4 py-2 text-white"
              >
                إزالة الصورة
              </button>
            </div>
          )}
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={onClose}
            className="rounded bg-red-400 px-4 py-2 text-gray-700"
          >
            إلغاء
          </button>
          <button
            type="submit"
            className="rounded bg-blue-500 px-4 py-2 text-white"
          >
            {initialData ? "حفظ " : "إضافة الخدمة"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServiceForm;
