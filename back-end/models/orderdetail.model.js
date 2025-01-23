const mongoose = require('mongoose');

const OrderDetailSchema = mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
    },
    orderDate: {
        type: Date,
        default: Date.now,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    product: [{
        pid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
        quantity: Number,
    }],
    total: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        default: 'pending',
    },
}, { timestamps: true });

module.exports = mongoose.model('OrderDetail', OrderDetailSchema);
