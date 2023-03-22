/*
  Warnings:

  - You are about to drop the column `image` on the `Creator` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Auction` MODIFY `itemId` VARCHAR(191) NULL DEFAULT 'item deleted';

-- AlterTable
ALTER TABLE `Creator` DROP COLUMN `image`,
    ADD COLUMN `profilePicture` TEXT NULL;
