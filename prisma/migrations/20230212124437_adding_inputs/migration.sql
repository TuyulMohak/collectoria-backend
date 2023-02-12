-- CreateTable
CREATE TABLE `Inputs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `thingId` INTEGER NOT NULL,
    `frameInputsId` INTEGER NOT NULL,
    `text` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Inputs` ADD CONSTRAINT `Inputs_thingId_fkey` FOREIGN KEY (`thingId`) REFERENCES `Thing`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inputs` ADD CONSTRAINT `Inputs_frameInputsId_fkey` FOREIGN KEY (`frameInputsId`) REFERENCES `FrameInputs`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
