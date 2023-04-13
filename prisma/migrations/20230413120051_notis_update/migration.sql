-- AlterTable
ALTER TABLE `Notification` ADD COLUMN `bidId` VARCHAR(191) NULL,
    ADD COLUMN `tipId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_tipId_fkey` FOREIGN KEY (`tipId`) REFERENCES `Tip`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_bidId_fkey` FOREIGN KEY (`bidId`) REFERENCES `Bid`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
