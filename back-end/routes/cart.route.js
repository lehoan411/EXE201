const express = require("express");
const bodyParser = require("body-parser");
const db = require("../models");
const CartRouter = express.Router();
CartRouter.use(bodyParser.json());

// Thêm sản phẩm vào giỏ hàng
CartRouter.post("/add", async (req, res, next) => {
    const { accountId, productId, quantity } = req.body;

    if (!accountId || !productId || !quantity) {
        return res.status(400).send({ message: "Thiếu thông tin cần thiết" });
    }

    try {
        // Tìm giỏ hàng của người dùng
        let cart = await db.Cart.findOne({ account: accountId });

        if (!cart) {
            // Nếu chưa có giỏ hàng, tạo mới
            cart = new db.Cart({
                account: accountId,
                product: [{ pid: productId, quantity: quantity }],
            });
        } else {
            // Tìm sản phẩm trong giỏ hàng
            const productIndex = cart.product.findIndex(
                (item) => item.pid.toString() === productId
            );

            if (productIndex >= 0) {
                // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng
                cart.product[productIndex].quantity += quantity;
            } else {
                // Nếu sản phẩm chưa có trong giỏ hàng, thêm sản phẩm mới
                cart.product.push({ pid: productId, quantity: quantity });
            }
        }

        // Lưu giỏ hàng vào database
        await cart.save();
        res.status(200).send({ message: "Sản phẩm đã được thêm vào giỏ hàng" });
    } catch (err) {
        next(err);
    }
});

// Lấy giỏ hàng của người dùng
CartRouter.get("/:accountId", async (req, res, next) => {
    const { accountId } = req.params;

    try {
        const cart = await db.Cart.findOne({ account: accountId }).populate("product.pid");
        if (!cart) {
            return res.status(404).send({ message: "Không tìm thấy giỏ hàng" });
        }
        res.status(200).send(cart);
    } catch (err) {
        next(err);
    }
});


CartRouter.put("/update", async (req, res, next) => {
    const { accountId, productId, quantity } = req.body;
  
    try {
      const cart = await db.Cart.findOne({ account: accountId });
      if (!cart) {
        return res.status(404).send({ message: "Không tìm thấy giỏ hàng" });
      }
  
      const productIndex = cart.product.findIndex(
        (item) => item.pid.toString() === productId
      );
  
      if (productIndex >= 0) {
        cart.product[productIndex].quantity = quantity;
        await cart.save();
        res.status(200).send({ message: "Cập nhật số lượng thành công" });
      } else {
        res.status(404).send({ message: "Không tìm thấy sản phẩm trong giỏ hàng" });
      }
    } catch (err) {
      next(err);
    }
  });

  CartRouter.delete("/remove", async (req, res, next) => {
    const { accountId, productId } = req.body;
  
    try {
      const cart = await db.Cart.findOne({ account: accountId });
      if (!cart) {
        return res.status(404).send({ message: "Không tìm thấy giỏ hàng" });
      }
  
      cart.product = cart.product.filter((item) => item.pid.toString() !== productId);
      await cart.save();
      res.status(200).send({ message: "Xóa sản phẩm thành công" });
    } catch (err) {
      next(err);
    }
  });

module.exports = CartRouter;