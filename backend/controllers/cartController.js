const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
const getCart = async (req, res, next) => {
    try {
        let cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            cart = await Cart.create({ user: req.user._id, cartItems: [] });
        }
        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
const addToCart = async (req, res, next) => {
    try {
        const { productId, quantity } = req.body;

        const product = await Product.findById(productId);
        if (!product) {
            res.status(404);
            throw new Error('Product not found');
        }

        let cart = await Cart.findOne({ user: req.user._id });
        if (!cart) {
            cart = new Cart({ user: req.user._id, cartItems: [] });
        }

        const itemIndex = cart.cartItems.findIndex(item => item.product.toString() === productId);

        if (itemIndex > -1) {
            // Update quantity if item exists
            cart.cartItems[itemIndex].quantity += quantity || 1;
        } else {
            // Add new item
            cart.cartItems.push({
                product: product._id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity || 1
            });
        }

        // Calculate total price
        cart.totalPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/:productId
// @access  Private
const updateQuantity = async (req, res, next) => {
    try {
        const { quantity } = req.body;
        let cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            res.status(404);
            throw new Error('Cart not found');
        }

        const itemIndex = cart.cartItems.findIndex(item => item.product.toString() === req.params.productId);

        if (itemIndex > -1) {
            cart.cartItems[itemIndex].quantity = quantity;
            cart.totalPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
            await cart.save();
            res.status(200).json(cart);
        } else {
            res.status(404);
            throw new Error('Item not in cart');
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
// @access  Private
const removeItem = async (req, res, next) => {
    try {
        let cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            res.status(404);
            throw new Error('Cart not found');
        }

        cart.cartItems = cart.cartItems.filter(item => item.product.toString() !== req.params.productId);
        cart.totalPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getCart,
    addToCart,
    updateQuantity,
    removeItem
};
