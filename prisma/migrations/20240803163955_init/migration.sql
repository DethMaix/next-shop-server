/*
  Warnings:

  - You are about to drop the column `brandName` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `productCode` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `product` table. All the data in the column will be lost.
  - Added the required column `slug` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "product" DROP COLUMN "brandName",
DROP COLUMN "productCode",
DROP COLUMN "url",
ADD COLUMN     "slug" TEXT NOT NULL;
