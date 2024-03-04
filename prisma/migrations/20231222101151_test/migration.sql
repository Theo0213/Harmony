/*
  Warnings:

  - You are about to drop the column `profileId` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Player" DROP CONSTRAINT "Player_profileId_fkey";

-- DropIndex
DROP INDEX "Player_profileId_key";

-- AlterTable
ALTER TABLE "Player" DROP COLUMN "profileId";

-- DropTable
DROP TABLE "Profile";
