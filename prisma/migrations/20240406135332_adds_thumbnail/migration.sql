/*
  Warnings:

  - You are about to drop the `OGData` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OGData" DROP CONSTRAINT "OGData_linkId_fkey";

-- AlterTable
ALTER TABLE "Link" ADD COLUMN     "thumbnail" TEXT;

-- DropTable
DROP TABLE "OGData";
