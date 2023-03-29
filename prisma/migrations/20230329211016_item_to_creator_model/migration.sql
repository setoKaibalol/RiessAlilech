/*
  Warnings:

  - You are about to drop the column `creatorId` on the `Creator` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Creator` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Creator` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Creator` DROP FOREIGN KEY `Creator_creatorId_fkey`;

-- AlterTable
ALTER TABLE `Creator` DROP COLUMN `creatorId`,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Creator_userId_key` ON `Creator`(`userId`);

-- CreateIndex
CREATE INDEX `Creator_creatorId_fkey` ON `Creator`(`userId`);

-- AddForeignKey
ALTER TABLE `Creator` ADD CONSTRAINT `Creator_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
