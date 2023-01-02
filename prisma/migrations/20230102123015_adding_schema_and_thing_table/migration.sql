/*
  Warnings:

  - You are about to drop the `note` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `note`;

-- CreateTable
CREATE TABLE `Schema` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `scheme` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Thing` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `schemaId` INTEGER NOT NULL,
    `timestamps` JSON NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Thing` ADD CONSTRAINT `Thing_schemaId_fkey` FOREIGN KEY (`schemaId`) REFERENCES `Schema`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
