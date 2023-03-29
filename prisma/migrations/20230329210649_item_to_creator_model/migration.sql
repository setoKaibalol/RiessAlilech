-- DropForeignKey
ALTER TABLE `Item` DROP FOREIGN KEY `Item_creatorId_fkey`;

-- AlterTable
ALTER TABLE `Creator` MODIFY `nickName` VARCHAR(191) NULL DEFAULT 'anon';

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `Creator`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
