-- CreateTable
CREATE TABLE "movies" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(150),
    "genres" VARCHAR(50),
    "year" VARCHAR(50),
    "image" VARCHAR(255),

    CONSTRAINT "movies_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL,
    "email" VARCHAR(50),
    "gender" VARCHAR(50),
    "password" VARCHAR(50),
    "role" VARCHAR(50),

    CONSTRAINT "users_pk" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_un" ON "users"("email" ASC);

