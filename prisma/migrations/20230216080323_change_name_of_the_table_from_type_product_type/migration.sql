/*
  Warnings:

  - You are about to drop the `Type` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_typeName_fkey";

-- DropTable
DROP TABLE "Type";

-- CreateTable
CREATE TABLE "ProductType" (
    "name" TEXT NOT NULL,

    CONSTRAINT "ProductType_pkey" PRIMARY KEY ("name")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductType_name_key" ON "ProductType"("name");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_typeName_fkey" FOREIGN KEY ("typeName") REFERENCES "ProductType"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
