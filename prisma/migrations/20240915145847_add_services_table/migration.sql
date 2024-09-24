-- CreateTable
CREATE TABLE "Services" (
    "id" SERIAL NOT NULL,
    "icon" TEXT,
    "title" TEXT NOT NULL,
    "paragraph" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Services_pkey" PRIMARY KEY ("id")
);
