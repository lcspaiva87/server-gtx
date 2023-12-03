-- CreateTable
CREATE TABLE `Refresh_Token` (
    `id` VARCHAR(191) NOT NULL,
    `expiresIn` INTEGER NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Refresh_Token_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `idUser` VARCHAR(191) NOT NULL,
    `username` VARCHAR(50) NOT NULL,
    `email` VARCHAR(191) NULL,
    `avatar` VARCHAR(191) NULL DEFAULT 'https://www.patasdacasa.com.br/sites/patasdacasa/files/styles/webp/public/2023-05/Gato-surdo1.jpg.webp?itok=ppfgdxES',
    `password` VARCHAR(100) NOT NULL,
    `session` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `office` VARCHAR(100) NULL,
    `status` VARCHAR(100) NULL,
    `descricao_user` VARCHAR(36) NULL,
    `nivel_id` VARCHAR(36) NULL,
    `name` VARCHAR(50) NOT NULL,
    `creationDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`idUser`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Column` (
    `idColumn` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `title` VARCHAR(30) NOT NULL,
    `creationDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`idColumn`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Task` (
    `idTask` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NOT NULL,
    `idColumn` INTEGER NOT NULL,
    `title` VARCHAR(50) NOT NULL,
    `company` VARCHAR(50) NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `avatar` VARCHAR(191) NOT NULL DEFAULT 'https://www.patasdacasa.com.br/sites/patasdacasa/files/styles/webp/public/2023-05/Gato-surdo1.jpg.webp?itok=ppfgdxES',
    `camera` VARCHAR(20) NOT NULL,
    `tag` VARCHAR(5) NOT NULL,
    `creationDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`idTask`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Company` (
    `idCompany` VARCHAR(191) NOT NULL,
    `cnpj` VARCHAR(36) NOT NULL,
    `creationDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `phone` VARCHAR(15) NULL,
    `userId` VARCHAR(191) NOT NULL,
    `permitido` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `Company_cnpj_key`(`cnpj`),
    PRIMARY KEY (`idCompany`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Registration-of-Nature-of-Occurrence` (
    `idRegistrationofNatureofOccurrence` VARCHAR(191) NOT NULL,
    `name` VARCHAR(300) NOT NULL,
    `creationDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `idCompany` VARCHAR(191) NOT NULL,
    `iduser` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idRegistrationofNatureofOccurrence`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sectors` (
    `idSector` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `idCompany` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Sectors_userId_key`(`userId`),
    PRIMARY KEY (`idSector`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Checklist` (
    `idchecklist` VARCHAR(191) NOT NULL,
    `fields` VARCHAR(100) NOT NULL,
    `creationDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `idCompany` VARCHAR(191) NOT NULL,
    `iduser` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idchecklist`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Materials` (
    `idMaterials` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `creationDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `idCompany` VARCHAR(191) NOT NULL,
    `type` VARCHAR(300) NOT NULL,

    PRIMARY KEY (`idMaterials`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tabel` (
    `idTabel` VARCHAR(191) NOT NULL,
    `creationDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `idCompany` VARCHAR(191) NOT NULL,
    `userIdUser` VARCHAR(191) NULL,

    UNIQUE INDEX `Tabel_idTabel_idCompany_key`(`idTabel`, `idCompany`),
    PRIMARY KEY (`idTabel`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `companyUser` (
    `idCompanyUser` VARCHAR(191) NOT NULL,
    `idCompany` VARCHAR(191) NOT NULL,
    `creationDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `idUser` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `companyUser_idCompany_idUser_key`(`idCompany`, `idUser`),
    PRIMARY KEY (`idCompanyUser`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Role` (
    `idRole` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `creationDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`idRole`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Permission` (
    `idPermission` VARCHAR(191) NOT NULL,
    `creationDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`idPermission`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Users-Permissions` (
    `idUsersPermissions` VARCHAR(191) NOT NULL,
    `idUser` VARCHAR(191) NULL,
    `idPermission` VARCHAR(191) NULL,
    `idRole` VARCHAR(191) NULL,

    PRIMARY KEY (`idUsersPermissions`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Refresh_Token` ADD CONSTRAINT `Refresh_Token_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`idUser`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Column` ADD CONSTRAINT `Column_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`idUser`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`idUser`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_idColumn_fkey` FOREIGN KEY (`idColumn`) REFERENCES `Column`(`idColumn`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Company` ADD CONSTRAINT `Company_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`idUser`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Registration-of-Nature-of-Occurrence` ADD CONSTRAINT `Registration-of-Nature-of-Occurrence_idCompany_fkey` FOREIGN KEY (`idCompany`) REFERENCES `Company`(`idCompany`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Registration-of-Nature-of-Occurrence` ADD CONSTRAINT `Registration-of-Nature-of-Occurrence_iduser_fkey` FOREIGN KEY (`iduser`) REFERENCES `User`(`idUser`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sectors` ADD CONSTRAINT `Sectors_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`idUser`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sectors` ADD CONSTRAINT `Sectors_idCompany_fkey` FOREIGN KEY (`idCompany`) REFERENCES `Company`(`idCompany`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Checklist` ADD CONSTRAINT `Checklist_idCompany_fkey` FOREIGN KEY (`idCompany`) REFERENCES `Company`(`idCompany`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Checklist` ADD CONSTRAINT `Checklist_iduser_fkey` FOREIGN KEY (`iduser`) REFERENCES `User`(`idUser`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Materials` ADD CONSTRAINT `Materials_idCompany_fkey` FOREIGN KEY (`idCompany`) REFERENCES `Company`(`idCompany`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tabel` ADD CONSTRAINT `Tabel_idCompany_fkey` FOREIGN KEY (`idCompany`) REFERENCES `Company`(`idCompany`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tabel` ADD CONSTRAINT `Tabel_userIdUser_fkey` FOREIGN KEY (`userIdUser`) REFERENCES `User`(`idUser`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `companyUser` ADD CONSTRAINT `companyUser_idCompany_fkey` FOREIGN KEY (`idCompany`) REFERENCES `Company`(`idCompany`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `companyUser` ADD CONSTRAINT `companyUser_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `User`(`idUser`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Users-Permissions` ADD CONSTRAINT `User_FK` FOREIGN KEY (`idUser`) REFERENCES `User`(`idUser`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Users-Permissions` ADD CONSTRAINT `Permissions_FK` FOREIGN KEY (`idPermission`) REFERENCES `Permission`(`idPermission`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Users-Permissions` ADD CONSTRAINT `Role_FK` FOREIGN KEY (`idRole`) REFERENCES `Role`(`idRole`) ON DELETE SET NULL ON UPDATE CASCADE;
