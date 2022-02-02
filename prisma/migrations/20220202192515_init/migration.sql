-- CreateTable
CREATE TABLE "anime" (
    "uid" TEXT NOT NULL,
    "title" TEXT,
    "synopsis" TEXT,
    "genre" TEXT,
    "aired" TEXT,
    "episodes" TEXT,
    "members" TEXT,
    "popularity" TEXT,
    "ranked" TEXT,
    "score" TEXT,
    "img_url" TEXT,
    "link" TEXT,

    CONSTRAINT "anime_pkey" PRIMARY KEY ("uid")
);
