/*
  Warnings:

  - You are about to drop the column `nickname` on the `Tip` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Tip` DROP COLUMN `nickname`,
    ADD COLUMN `icon` VARCHAR(191) NULL DEFAULT 'https://pbs.twimg.com/media/DgSzZy6XkAAQVdV.png',
    ADD COLUMN `nicknameSender` VARCHAR(191) NULL;
