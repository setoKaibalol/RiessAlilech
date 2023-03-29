/*
  Warnings:

  - You are about to drop the column `youtube` on the `Creator` table. All the data in the column will be lost.
  - Made the column `image` on table `Item` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Creator` DROP COLUMN `youtube`,
    ADD COLUMN `fourBased` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Item` MODIFY `image` VARCHAR(191) NOT NULL DEFAULT 'https://pbs.twimg.com/media/DgSzZy6XkAAQVdV.png';
