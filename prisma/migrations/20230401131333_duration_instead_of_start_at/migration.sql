-- AlterTable
ALTER TABLE `Auction` ADD COLUMN `trostpreisId` VARCHAR(191) NULL DEFAULT 'item deleted';

-- AddForeignKey
ALTER TABLE `Auction` ADD CONSTRAINT `Auction_trostpreisId_fkey` FOREIGN KEY (`trostpreisId`) REFERENCES `Item`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
