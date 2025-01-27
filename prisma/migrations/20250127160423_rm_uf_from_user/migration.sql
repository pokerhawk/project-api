/*
  Warnings:

  - You are about to drop the column `uf` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "uf",
ADD COLUMN     "birthDate" TIMESTAMP(3),
ADD COLUMN     "phone" TEXT,
ALTER COLUMN "zipcode" DROP NOT NULL,
ALTER COLUMN "ddd" DROP NOT NULL,
ALTER COLUMN "state" DROP NOT NULL,
ALTER COLUMN "city" DROP NOT NULL,
ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "number" DROP NOT NULL;
