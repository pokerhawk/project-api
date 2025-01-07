/*
  Warnings:

  - Added the required column `uf` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `zipcode` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "uf" TEXT NOT NULL,
ALTER COLUMN "zipcode" SET NOT NULL;
