/*
  Warnings:

  - You are about to drop the column `userBookmarkId` on the `Auction` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Auction` DROP FOREIGN KEY `Auction_userBookmarkId_fkey`;

-- AlterTable
ALTER TABLE `Auction` DROP COLUMN `userBookmarkId`;

-- CreateTable
CREATE TABLE `_AuctionToUser` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_AuctionToUser_AB_unique`(`A`, `B`),
    INDEX `_AuctionToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_AuctionToUser` ADD CONSTRAINT `_AuctionToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `Auction`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AuctionToUser` ADD CONSTRAINT `_AuctionToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
