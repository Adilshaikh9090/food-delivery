const express = require('express');
const router = express.Router();
const { placeOrder, getUserOrders, getAllOrders, updateStatus } = require('../controllers/orderController');

router.post('/place', placeOrder);
router.get('/userorders', getUserOrders);
router.get('/list', getAllOrders);
router.post('/status', updateStatus);

module.exports = router;
