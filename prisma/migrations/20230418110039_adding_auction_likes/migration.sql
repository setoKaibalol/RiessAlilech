/*
  Warnings:

  - You are about to drop the `_AuctionToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_AuctionToUser` DROP FOREIGN KEY `_AuctionToUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_AuctionToUser` DROP FOREIGN KEY `_AuctionToUser_B_fkey`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `lastSeen` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- DropTable
DROP TABLE `_AuctionToUser`;

-- CreateTable
CREATE TABLE `_auctionBookmarks` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_auctionBookmarks_AB_unique`(`A`, `B`),
    INDEX `_auctionBookmarks_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_auctionLikes` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_auctionLikes_AB_unique`(`A`, `B`),
    INDEX `_auctionLikes_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_auctionBookmarks` ADD CONSTRAINT `_auctionBookmarks_A_fkey` FOREIGN KEY (`A`) REFERENCES `Auction`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_auctionBookmarks` ADD CONSTRAINT `_auctionBookmarks_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_auctionLikes` ADD CONSTRAINT `_auctionLikes_A_fkey` FOREIGN KEY (`A`) REFERENCES `Auction`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_auctionLikes` ADD CONSTRAINT `_auctionLikes_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
