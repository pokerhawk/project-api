-- CreateEnum
CREATE TYPE "AccountAccessEnum" AS ENUM ('admin', 'support', 'user');

-- CreateEnum
CREATE TYPE "SaleStatus" AS ENUM ('pending', 'confirmed', 'denied');

-- CreateEnum
CREATE TYPE "StatusEnum" AS ENUM ('pending', 'atWork', 'completed');

-- CreateEnum
CREATE TYPE "PriorityEnum" AS ENUM ('high', 'medium', 'low');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "accountAccess" "AccountAccessEnum" NOT NULL DEFAULT 'user',
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "ddd" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "neighborhood" TEXT,
    "number" TEXT NOT NULL,
    "complement" TEXT,
    "commission" INTEGER NOT NULL DEFAULT 10,
    "potLimit" INTEGER NOT NULL DEFAULT 20,
    "mfaEnabled" BOOLEAN NOT NULL DEFAULT false,
    "mfaSecret" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "priority" "PriorityEnum" NOT NULL,
    "status" "StatusEnum" NOT NULL DEFAULT 'pending',
    "dueDate" DATE NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "userId" TEXT,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClientAddress" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "complement" TEXT NOT NULL,
    "deliveryDate" DATE,

    CONSTRAINT "ClientAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sale" (
    "id" TEXT NOT NULL,
    "saleDate" DATE,
    "transactionValue" INTEGER NOT NULL,
    "commissionValue" INTEGER NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "status" "SaleStatus" NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "userId" TEXT,
    "clientAddressId" TEXT,

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "inStock" INTEGER NOT NULL,
    "reserved" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "APIs" (
    "id" TEXT NOT NULL,
    "apiName" TEXT NOT NULL,
    "infoJson" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "APIs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "APIs_apiName_key" ON "APIs"("apiName");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_clientAddressId_fkey" FOREIGN KEY ("clientAddressId") REFERENCES "ClientAddress"("id") ON DELETE SET NULL ON UPDATE CASCADE;
