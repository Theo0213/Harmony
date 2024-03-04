/*
  Warnings:

  - You are about to drop the column `expires` on the `VerificationRequest` table. All the data in the column will be lost.
  - Added the required column `expires_at` to the `VerificationRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VerificationRequest" DROP COLUMN "expires",
ADD COLUMN     "expires_at" TIMESTAMP(3) NOT NULL;
