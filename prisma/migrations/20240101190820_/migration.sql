/*
  Warnings:

  - A unique constraint covering the columns `[profileId]` on the table `Player` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `profileId` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "profileId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "spotifyId" TEXT NOT NULL,
    "email" TEXT,
    "pseudo" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_spotifyId_key" ON "Profile"("spotifyId");

-- CreateIndex
CREATE UNIQUE INDEX "Player_profileId_key" ON "Player"("profileId");

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
