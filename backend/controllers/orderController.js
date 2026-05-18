const Order = require('../models/orderModel');
const jwt = require('jsonwebtoken');

const placeOrder = async (req, res) => {
  try {
    const token = req.headers.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const newOrder = new Order({
      userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address
    });
    await newOrder.save();
    res.json({ success: true, message: 'Order Placed' });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const token = req.headers.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const orders = await Order.find({ userId: decoded.id });
    res.json({ success: true, data: orders });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.json({ success: true, data: orders });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    await Order.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
    res.json({ success: true, message: 'Status Updated' });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

module.exports = { placeOrder, getUserOrders, getAllOrders, updateStatus };
