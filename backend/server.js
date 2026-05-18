require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const foodRoutes = require('./routes/foodRoute');
const orderRoutes = require('./routes/orderRoute');

const app = express();
connectDB();

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use('/images', express.static('uploads'));

app.use('/api/user', userRoutes);
app.use('/api/food', foodRoutes);

app.use('/api/order', orderRoutes);

// Test route
app.get('/test', (req, res) => res.json({ success: true }));

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
