/*
  Warnings:

  - You are about to drop the column `heightCm` on the `Creator` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Creator` DROP COLUMN `heightCm`,
    ADD COLUMN `telegram` VARCHAR(191) NULL;
