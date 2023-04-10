-- AlterTable
ALTER TABLE `Notification` ADD COLUMN `auctionId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_auctionId_fkey` FOREIGN KEY (`auctionId`) REFERENCES `Auction`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
