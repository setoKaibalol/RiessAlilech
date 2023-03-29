/*
  Warnings:

  - You are about to drop the column `auctionId` on the `Tip` table. All the data in the column will be lost.
  - You are about to drop the column `icon` on the `Tip` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Tip` DROP FOREIGN KEY `Tip_auctionId_fkey`;

-- AlterTable
ALTER TABLE `Tip` DROP COLUMN `auctionId`,
    DROP COLUMN `icon`,
    ADD COLUMN `creatorId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `credits` INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `Bid` (
    `id` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `nicknameSender` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NULL,
    `auctionId` VARCHAR(191) NULL,
    `message` VARCHAR(191) NULL,
    `paymentMethod` VARCHAR(191) NULL,
    `icon` VARCHAR(191) NULL DEFAULT 'https://pbs.twimg.com/media/DgSzZy6XkAAQVdV.png',

    INDEX `Tip_auctionId_fkey`(`auctionId`),
    INDEX `Tip_userId_fkey`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Bid` ADD CONSTRAINT `Bid_auctionId_fkey` FOREIGN KEY (`auctionId`) REFERENCES `Auction`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bid` ADD CONSTRAINT `Bid_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tip` ADD CONSTRAINT `Tip_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `Creator`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
