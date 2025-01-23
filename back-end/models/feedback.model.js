const mongoose = require('mongoose');

const FeedBackSchema = mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
    },
    date: {
        type: Date,
        default: Date.now
    },
    description: String,
    rating: {
        type: Number,
        min: 1,
        max: 5
    }
}, { timestamps: true });

module.exports = mongoose.model('FeedBack', FeedBackSchema);
