const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a product name'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please add a product description']
    },
    price: {
        type: Number,
        required: [true, 'Please add a product price'],
        default: 0.0
    },
    image: {
        type: String,
        required: [true, 'Please add an image URL']
    },
    stock: {
        type: Number,
        required: [true, 'Please add product stock quantity'],
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
