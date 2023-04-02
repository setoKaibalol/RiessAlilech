/*
  Warnings:

  - You are about to drop the column `endAt` on the `Auction` table. All the data in the column will be lost.
  - You are about to drop the column `startAt` on the `Auction` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Auction` DROP COLUMN `endAt`,
    DROP COLUMN `startAt`,
    ADD COLUMN `durationHours` INTEGER NOT NULL DEFAULT 24,
    MODIFY `live` BOOLEAN NOT NULL DEFAULT true;
