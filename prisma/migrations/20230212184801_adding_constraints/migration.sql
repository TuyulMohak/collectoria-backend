/*
  Warnings:

  - A unique constraint covering the columns `[thingId,frameInputId]` on the table `Inputs` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Inputs_thingId_frameInputId_key` ON `Inputs`(`thingId`, `frameInputId`);
