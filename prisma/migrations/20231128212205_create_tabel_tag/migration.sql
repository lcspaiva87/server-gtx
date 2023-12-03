/*
  Warnings:

  - The primary key for the `Column` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Task` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `avatar` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `camera` on the `Task` table. All the data in the column will be lost.
  - You are about to alter the column `tag` on the `Task` table. The data in that column could be lost. The data in that column will be cast from `VarChar(5)` to `Json`.
  - Added the required column `description` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Task` DROP FOREIGN KEY `Task_idColumn_fkey`;

-- AlterTable
ALTER TABLE `Column` DROP PRIMARY KEY,
    MODIFY `idColumn` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`idColumn`);

-- AlterTable
ALTER TABLE `Task` DROP PRIMARY KEY,
    DROP COLUMN `avatar`,
    DROP COLUMN `camera`,
    ADD COLUMN `description` VARCHAR(300) NOT NULL,
    MODIFY `idTask` VARCHAR(191) NOT NULL,
    MODIFY `idColumn` VARCHAR(191) NOT NULL,
    MODIFY `tag` JSON NOT NULL,
    ADD PRIMARY KEY (`idTask`);

-- CreateTable
CREATE TABLE `Tag` (
    `idTag` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `creationDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `idCompany` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idTag`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Column_FK` FOREIGN KEY (`idColumn`) REFERENCES `Column`(`idColumn`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tag` ADD CONSTRAINT `Tag_idCompany_fkey` FOREIGN KEY (`idCompany`) REFERENCES `Company`(`idCompany`) ON DELETE RESTRICT ON UPDATE CASCADE;
