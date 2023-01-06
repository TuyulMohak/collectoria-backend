-- DropForeignKey
ALTER TABLE `thing` DROP FOREIGN KEY `Thing_schemaId_fkey`;

-- AddForeignKey
ALTER TABLE `Thing` ADD CONSTRAINT `Thing_schemaId_fkey` FOREIGN KEY (`schemaId`) REFERENCES `Schema`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
