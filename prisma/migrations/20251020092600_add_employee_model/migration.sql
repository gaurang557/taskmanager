-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "dob" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "joiningdate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);
