/*
  Warnings:

  - You are about to drop the column `OwnerId` on the `Pet` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Pet" DROP CONSTRAINT "Pet_OwnerId_fkey";

-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "OwnerId",
ADD COLUMN     "ownerId" TEXT,
ADD COLUMN     "pfp" TEXT;

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
