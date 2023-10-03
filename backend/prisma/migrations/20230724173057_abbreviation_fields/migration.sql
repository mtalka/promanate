-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "abbreviation" VARCHAR(5);

-- AlterTable
ALTER TABLE "Team" ADD COLUMN     "abbreviation" VARCHAR(10);

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "identifier" INTEGER;
