/*
  Warnings:

  - Changed the type of `governorate` on the `Maintenance_Request` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `governorate` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Maintenance_Request" DROP COLUMN "governorate",
ADD COLUMN     "governorate" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "governorate",
ADD COLUMN     "governorate" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Governorates";
