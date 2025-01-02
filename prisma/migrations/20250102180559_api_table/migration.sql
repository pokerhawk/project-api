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
CREATE UNIQUE INDEX "APIs_apiName_key" ON "APIs"("apiName");
