/*
  Warnings:

  - You are about to drop the column `userId` on the `Bid` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Tip` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Bid` DROP FOREIGN KEY `Bid_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Tip` DROP FOREIGN KEY `Tip_userId_fkey`;

-- AlterTable
ALTER TABLE `Bid` DROP COLUMN `userId`,
    ADD COLUMN `bidderId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Tip` DROP COLUMN `userId`,
    ADD COLUMN `tipperId` VARCHAR(191) NULL;

-- CreateIndex
CREATE INDEX `Tip_userId_fkey` ON `Bid`(`bidderId`);

-- AddForeignKey
ALTER TABLE `Bid` ADD CONSTRAINT `Bid_bidderId_fkey` FOREIGN KEY (`bidderId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tip` ADD CONSTRAINT `Tip_tipperId_fkey` FOREIGN KEY (`tipperId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
