/*
  Warnings:

  - Added the required column `updatedAt` to the `VideoLike` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "refreshToken" TEXT;

-- AlterTable
ALTER TABLE "VideoLike" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
