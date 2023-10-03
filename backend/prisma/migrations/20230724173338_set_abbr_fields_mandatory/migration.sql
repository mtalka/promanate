/*
  Warnings:

  - Made the column `abbreviation` on table `Project` required. This step will fail if there are existing NULL values in that column.
  - Made the column `abbreviation` on table `Team` required. This step will fail if there are existing NULL values in that column.
  - Made the column `identifier` on table `Ticket` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "abbreviation" SET NOT NULL;

-- AlterTable
ALTER TABLE "Team" ALTER COLUMN "abbreviation" SET NOT NULL;

-- AlterTable
ALTER TABLE "Ticket" ALTER COLUMN "identifier" SET NOT NULL;
