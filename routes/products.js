const express = require('express');
const prisma = require('../prisma');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({ where: { id: parseInt(id) } });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
