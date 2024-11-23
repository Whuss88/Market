const express = require("express");
const prisma = require("../prisma");
const router = express.Router();

router.get("/", async (req,res,next) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", (req,res,next) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({ where: { id: parseInt}})
  }
})