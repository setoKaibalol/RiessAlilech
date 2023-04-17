-- AlterTable
ALTER TABLE `Auction` ADD COLUMN `userBookmarkId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Notification` MODIFY `message` TEXT NULL;

-- AddForeignKey
ALTER TABLE `Auction` ADD CONSTRAINT `Auction_userBookmarkId_fkey` FOREIGN KEY (`userBookmarkId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
