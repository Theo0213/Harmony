/*
  Warnings:

  - You are about to drop the column `artistes` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `dateCall` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `idSong` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `progress` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `urlImageAlbum` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[playerId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `playerId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pseudo` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "artistes",
DROP COLUMN "dateCall",
DROP COLUMN "duration",
DROP COLUMN "idSong",
DROP COLUMN "name",
DROP COLUMN "progress",
DROP COLUMN "urlImageAlbum",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "playerId" INTEGER NOT NULL,
ADD COLUMN     "pseudo" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Player" (
    "id" SERIAL NOT NULL,
    "progress" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "isPlaying" BOOLEAN NOT NULL,
    "trackId" INTEGER NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Track" (
    "id" SERIAL NOT NULL,
    "songId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "artistes" TEXT[],
    "imageURL" TEXT NOT NULL,

    CONSTRAINT "Track_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Player_trackId_key" ON "Player"("trackId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_playerId_key" ON "User"("playerId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
