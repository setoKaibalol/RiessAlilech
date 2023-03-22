/*
  Warnings:

  - A unique constraint covering the columns `[creatorId]` on the table `Creator` will be added. If there are existing duplicate values, this will fail.
  - Made the column `creatorId` on table `Creator` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Creator` DROP FOREIGN KEY `Creator_creatorId_fkey`;

-- AlterTable
ALTER TABLE `Creator` MODIFY `creatorId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Creator_creatorId_key` ON `Creator`(`creatorId`);

-- AddForeignKey
ALTER TABLE `Creator` ADD CONSTRAINT `Creator_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
