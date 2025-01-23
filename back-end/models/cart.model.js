const mongoose = require('mongoose');

const ProductInCartSchema = mongoose.Schema(
  {
    pid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    quantity: Number,
  },
  { _id: false } // Ngăn Mongoose tạo `_id` cho mỗi sản phẩm trong mảng
);

const CartSchema = mongoose.Schema(
  {
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
    },
    product: [ProductInCartSchema], // Áp dụng schema cho từng sản phẩm trong mảng
  },
  { timestamps: true,}
);

module.exports = mongoose.model('Cart', CartSchema);