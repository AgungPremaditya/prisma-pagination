const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.listen(port, () => {
  console.log(`Server is Running on the ${port}`);
});

// app.get("/anime-list", async (req, res) => {
//   const query = req.query;
//   const page = parseInt(query.page) || 1;
//   const limit = parseInt(query.limit) || 2;
//   const lastPage = req.query.lastPage;
//   const startIndex = (page - 1) * limit;
//   const endIndex = page * limit;
//   const result = {};
//   const totalCount = await prisma.anime.count();
//   const totalPage = Math.ceil(totalCount / limit);
//   const currentPage = page || 0;
// });

app.get("/anime-list/:page/:limit", async (req, res) => {
  const page = parseInt(req.params.page) || 1;
  const limit = parseInt(req.params.limit) || 2;
  const startIndex = (page - 1) * limit;
  try {
    const result = await prisma.anime.findMany({
      skip: page,
      take: startIndex,
      where: {
        NOT: {
          ranked: null,
        },
      },
      orderBy: {
        ranked: "asc",
      },
    });

    return res.status(200).json(result);
  } catch (err) {
    console.error("error", err);
    return res.status(500).json(err);
  }
});
