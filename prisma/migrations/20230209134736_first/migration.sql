/*
  Warnings:

  - You are about to drop the column `schemaId` on the `thing` table. All the data in the column will be lost.
  - You are about to drop the column `timestamps` on the `thing` table. All the data in the column will be lost.
  - You are about to drop the `schema` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `frameId` to the `Thing` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `thing` DROP FOREIGN KEY `Thing_schemaId_fkey`;

-- AlterTable
ALTER TABLE `thing` DROP COLUMN `schemaId`,
    DROP COLUMN `timestamps`,
    ADD COLUMN `frameId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `schema`;

-- CreateTable
CREATE TABLE `Frames` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FramePhases` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `frameId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FrameInputs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `frameId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Times` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `thingId` INTEGER NOT NULL,
    `phaseId` INTEGER NOT NULL,
    `timestamp` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `FramePhases` ADD CONSTRAINT `FramePhases_frameId_fkey` FOREIGN KEY (`frameId`) REFERENCES `Frames`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FrameInputs` ADD CONSTRAINT `FrameInputs_frameId_fkey` FOREIGN KEY (`frameId`) REFERENCES `Frames`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Thing` ADD CONSTRAINT `Thing_frameId_fkey` FOREIGN KEY (`frameId`) REFERENCES `Frames`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Times` ADD CONSTRAINT `Times_thingId_fkey` FOREIGN KEY (`thingId`) REFERENCES `Thing`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Times` ADD CONSTRAINT `Times_phaseId_fkey` FOREIGN KEY (`phaseId`) REFERENCES `FramePhases`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
