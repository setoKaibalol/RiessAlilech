/*
  Warnings:

  - Made the column `email` on table `Tip` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Auction` MODIFY `description` TEXT NULL,
    MODIFY `image` TEXT NULL;

-- AlterTable
ALTER TABLE `Item` ADD COLUMN `description` TEXT NULL;

-- AlterTable
ALTER TABLE `Tip` ADD COLUMN `message` VARCHAR(191) NULL,
    ADD COLUMN `paymentMethod` VARCHAR(191) NULL,
    MODIFY `email` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `creatorVerified` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `image` TEXT NULL;
