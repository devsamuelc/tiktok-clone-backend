/*
  Warnings:

  - You are about to drop the column `refreshToken` on the `Video` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "refreshToken" TEXT;

-- AlterTable
ALTER TABLE "Video" DROP COLUMN "refreshToken";
