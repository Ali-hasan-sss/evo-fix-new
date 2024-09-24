/*
  Warnings:

  - You are about to drop the column `isBlocked` on the `Maintenance_Request` table. All the data in the column will be lost.
  - You are about to drop the column `isDone` on the `Maintenance_Request` table. All the data in the column will be lost.
  - You are about to drop the column `isUnderProcessing` on the `Maintenance_Request` table. All the data in the column will be lost.
  - You are about to drop the column `isRead` on the `Notification` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "requestStatus" AS ENUM ('APPROVED', 'PENDING', 'REJECTED', 'UNDERPROCESSING', 'DONE');

-- AlterTable
ALTER TABLE "Maintenance_Request" DROP COLUMN "isBlocked",
DROP COLUMN "isDone",
DROP COLUMN "isUnderProcessing",
ADD COLUMN     "status" "requestStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "isRead",
ADD COLUMN     "isTechRead" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isUserRead" BOOLEAN NOT NULL DEFAULT false;
