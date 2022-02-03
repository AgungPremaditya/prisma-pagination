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

function paginate(data, limit, startIndex) {
  return data.slice((startIndex - 1) * limit, startIndex * limit);
}

app.get("/anime-list", async (req, res) => {
  const query = req.query;
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 2;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const result = {};
  const currentPage = page || 0;
  try {
    const data = await prisma.anime.findMany();
    result.currentPage = page;
    result.perPage = limit;
    result.totalPage = Math.ceil(data.length / limit);
    result.pagesUrl = {
      next: `http://localhost:${port}/anime-list?page=${
        page + 1
      }&limit=${limit}`,

      prev: `http://localhost:${port}/anime-list?page=${
        page - 1 < 0 ? 1 : page - 1
      }&limit=${limit}`,
    };
    result.from = startIndex + 1;
    result.to = endIndex + 1;
    result.data = Object.entries(data)
      .slice(startIndex, endIndex)
      .map((entry) => entry[1]);

    return res.status(200).json(result);
  } catch (err) {
    console.error("error", err);
    return res.status(500).json(err);
  }
});
