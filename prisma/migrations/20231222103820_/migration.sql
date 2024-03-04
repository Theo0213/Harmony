/*
  Warnings:

  - You are about to drop the column `accessToken` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `accessToken` on the `Session` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[access_token]` on the table `Session` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `access_token` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Session_accessToken_key";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "accessToken",
ADD COLUMN     "access_token" TEXT;

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "accessToken",
ADD COLUMN     "access_token" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Session_access_token_key" ON "Session"("access_token");
