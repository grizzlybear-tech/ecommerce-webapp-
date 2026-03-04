const express = require('express');
const router = express.Router();
const {
    getCart,
    addToCart,
    updateQuantity,
    removeItem
} = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getCart)
    .post(protect, addToCart);

router.route('/:productId')
    .put(protect, updateQuantity)
    .delete(protect, removeItem);

module.exports = router;
