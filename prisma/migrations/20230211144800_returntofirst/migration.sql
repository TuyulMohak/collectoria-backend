/*
  Warnings:

  - You are about to drop the column `times` on the `thing` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `thing` DROP COLUMN `times`;

-- CreateTable
CREATE TABLE `Times` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `thingId` INTEGER NOT NULL,
    `phaseId` INTEGER NOT NULL,
    `timestamp` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Times` ADD CONSTRAINT `Times_thingId_fkey` FOREIGN KEY (`thingId`) REFERENCES `Thing`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Times` ADD CONSTRAINT `Times_phaseId_fkey` FOREIGN KEY (`phaseId`) REFERENCES `FramePhases`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
