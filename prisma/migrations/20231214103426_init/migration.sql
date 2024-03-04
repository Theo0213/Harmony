/*
  Warnings:

  - You are about to drop the column `trackId` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `playerId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Player` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[playerId]` on the table `Track` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `playerId` to the `Track` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Player" DROP CONSTRAINT "Player_trackId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_playerId_fkey";

-- DropIndex
DROP INDEX "Player_trackId_key";

-- DropIndex
DROP INDEX "User_playerId_key";

-- AlterTable
ALTER TABLE "Player" DROP COLUMN "trackId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Track" ADD COLUMN     "playerId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "playerId",
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "pseudo" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Player_userId_key" ON "Player"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Track_playerId_key" ON "Track"("playerId");

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
