export type User = {
  id: number;
  fullName: string;
  email: string;
  phoneNO: string;
  isActive: boolean;
  [key: string]: any; // إذا كانت هناك خصائص إضافية غير معروفة
};
