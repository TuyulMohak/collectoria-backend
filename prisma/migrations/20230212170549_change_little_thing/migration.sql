/*
  Warnings:

  - You are about to drop the column `frameInputsId` on the `inputs` table. All the data in the column will be lost.
  - Added the required column `frameInputId` to the `Inputs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `inputs` DROP FOREIGN KEY `Inputs_frameInputsId_fkey`;

-- AlterTable
ALTER TABLE `inputs` DROP COLUMN `frameInputsId`,
    ADD COLUMN `frameInputId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Inputs` ADD CONSTRAINT `Inputs_frameInputId_fkey` FOREIGN KEY (`frameInputId`) REFERENCES `FrameInputs`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
