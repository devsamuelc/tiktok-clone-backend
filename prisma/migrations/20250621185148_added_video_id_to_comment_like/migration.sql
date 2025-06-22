/*
  Warnings:

  - Added the required column `updatedAt` to the `CommentLike` table without a default value. This is not possible if the table is not empty.
  - Added the required column `videoId` to the `CommentLike` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserPermissions" AS ENUM ('USER', 'CREATOR', 'ADMIN');

-- AlterTable
ALTER TABLE "CommentLike" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "videoId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "permissions" "UserPermissions" NOT NULL DEFAULT 'USER';

-- AlterTable
ALTER TABLE "Video" ALTER COLUMN "url" DROP NOT NULL;
