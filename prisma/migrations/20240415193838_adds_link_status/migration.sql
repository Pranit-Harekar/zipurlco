-- CreateEnum
CREATE TYPE "Status" AS ENUM ('active', 'pending', 'inactive');

-- AlterTable
ALTER TABLE "Link" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'active';
