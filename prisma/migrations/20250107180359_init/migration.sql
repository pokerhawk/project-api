-- CreateEnum
CREATE TYPE "StatusEnum" AS ENUM ('pending', 'atWork', 'completed');

-- CreateEnum
CREATE TYPE "AccountAccessEnum" AS ENUM ('admin', 'support', 'user');

-- CreateEnum
CREATE TYPE "PriorityEnum" AS ENUM ('high', 'medium', 'low');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "accountAccess" "AccountAccessEnum" NOT NULL DEFAULT 'user',
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "zipcode" TEXT,
    "ddd" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "region" TEXT,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "extra" TEXT,
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
    "dueDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "userId" TEXT,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
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
