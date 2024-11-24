const express = require("express");
const prisma = require("../prisma");
const authenticate = require("../middleware/authenticate");
const router = express.Router();

router.use(authenticate);

router.get("/", async (req, res, next) => {
  try {
    const order = await prisma.order.findMany({ where: {userId: req.user.id }, incldude: { products: true} });
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const { date, note, productIds } = req.body;
  try {
    const order = await prisma.order.create({
      data: {
        createdAt: new Date(date),
        note,
        userId: req.user.id,
        products: { connect: productIds.map(id => ({ id})) }
      }
    });
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const order = await prisma.order.findUnique({ where: { id: parseInt(id)} });
    if (!order || order.userId !== req.user.id) {
      return res.status(403).json({ error: `Forbidden`});
    }
    res.json(order);
  } catch (error) {
    next(error);
  }
});

module.exports = router;