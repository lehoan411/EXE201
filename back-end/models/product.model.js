const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    description: String,
    status: Boolean,
    image: String,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
