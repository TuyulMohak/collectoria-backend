/*
  Warnings:

  - You are about to drop the column `phaseId` on the `times` table. All the data in the column will be lost.
  - Added the required column `framePhaseId` to the `Times` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `times` DROP FOREIGN KEY `Times_phaseId_fkey`;

-- AlterTable
ALTER TABLE `times` DROP COLUMN `phaseId`,
    ADD COLUMN `framePhaseId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Times` ADD CONSTRAINT `Times_framePhaseId_fkey` FOREIGN KEY (`framePhaseId`) REFERENCES `FramePhases`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
