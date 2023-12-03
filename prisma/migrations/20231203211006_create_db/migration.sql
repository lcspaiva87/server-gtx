/*
  Warnings:

  - You are about to drop the column `descricao_user` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `nivel_id` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `descricao_user`,
    DROP COLUMN `nivel_id`;
