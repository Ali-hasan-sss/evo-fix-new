/*
  Warnings:

  - The values [tECHNICAL] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "Governorates" AS ENUM ('دمشق', 'ريف دمشق', 'القنيطرة', 'درعا', 'السويداء', 'حمص', 'طرطوس', 'اللاذقية', 'حماة', 'إدلب', 'حلب', 'الرقة', 'دير الزور', 'الحسكة');

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('ADMIN', 'USER', 'TECHNICAL');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'USER';
COMMIT;

-- AlterTable
ALTER TABLE "Maintenance_Request" ADD COLUMN     "governorate" "Governorates" NOT NULL DEFAULT 'دمشق',
ALTER COLUMN "fee" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "governorate" "Governorates" NOT NULL DEFAULT 'دمشق';
