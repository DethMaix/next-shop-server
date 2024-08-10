/*
  Warnings:

  - You are about to drop the column `avatar` on the `user` table. All the data in the column will be lost.
  - Made the column `password` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "avatar",
ALTER COLUMN "password" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL;
