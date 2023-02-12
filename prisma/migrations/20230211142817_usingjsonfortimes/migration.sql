/*
  Warnings:

  - You are about to drop the `times` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `times` to the `Thing` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `times` DROP FOREIGN KEY `Times_phaseId_fkey`;

-- DropForeignKey
ALTER TABLE `times` DROP FOREIGN KEY `Times_thingId_fkey`;

-- AlterTable
ALTER TABLE `thing` ADD COLUMN `times` JSON NOT NULL;

-- DropTable
DROP TABLE `times`;
