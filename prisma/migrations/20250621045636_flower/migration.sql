/*
  Warnings:

  - You are about to drop the column `sizeId` on the `Order` table. All the data in the column will be lost.
  - Added the required column `bannerId` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "bannerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "sizeId",
ADD COLUMN     "address" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "name" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE INDEX "Category_bannerId_idx" ON "Category"("bannerId");
