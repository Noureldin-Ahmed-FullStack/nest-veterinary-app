/*
  Warnings:

  - You are about to drop the column `description` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "description",
ADD COLUMN     "content" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "description" TEXT;
