/*
  Warnings:

  - You are about to drop the column `dishId` on the `ProductInfo` table. All the data in the column will be lost.
  - You are about to drop the column `dishId` on the `Review` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductInfo" DROP CONSTRAINT "ProductInfo_dishId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_dishId_fkey";

-- AlterTable
ALTER TABLE "ProductInfo" DROP COLUMN "dishId",
ADD COLUMN     "productId" INTEGER;

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "dishId",
ADD COLUMN     "productId" INTEGER;

-- AddForeignKey
ALTER TABLE "ProductInfo" ADD CONSTRAINT "ProductInfo_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
