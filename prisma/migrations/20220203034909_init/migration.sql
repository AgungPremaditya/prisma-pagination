-- CreateTable
CREATE TABLE "anime" (
    "uid" INTEGER NOT NULL,
    "title" TEXT,
    "synopsis" TEXT,
    "genre" TEXT,
    "aired" TEXT,
    "episodes" TEXT,
    "members" TEXT,
    "popularity" TEXT,
    "ranked" INTEGER NOT NULL,
    "score" TEXT,
    "img_url" TEXT,
    "link" TEXT,

    CONSTRAINT "anime_pkey" PRIMARY KEY ("uid")
);
