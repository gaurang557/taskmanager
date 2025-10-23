/*
  Warnings:

  - You are about to drop the column `Name` on the `Employee` table. All the data in the column will be lost.
  - Added the required column `name` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `dob` on the `Employee` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "Name",
ADD COLUMN     "name" TEXT NOT NULL,
DROP COLUMN "dob",
ADD COLUMN     "dob" TIMESTAMP(3) NOT NULL;
