require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const app = express();
const PORT = 3000;

app.use(morgan('dev'));
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('An error occurred');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
