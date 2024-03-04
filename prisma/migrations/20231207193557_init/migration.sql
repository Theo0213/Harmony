/*
  Warnings:

  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - Added the required column `dateCall` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idSong` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `progress` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `urlImageAlbum` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "email",
DROP COLUMN "password",
ADD COLUMN     "artistes" TEXT[],
ADD COLUMN     "dateCall" INTEGER NOT NULL,
ADD COLUMN     "duration" INTEGER NOT NULL,
ADD COLUMN     "idSong" TEXT NOT NULL,
ADD COLUMN     "progress" INTEGER NOT NULL,
ADD COLUMN     "urlImageAlbum" TEXT NOT NULL,
ALTER COLUMN "name" SET NOT NULL;
