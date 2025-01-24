const express = require("express");
const bodyParser = require("body-parser");
const db = require("../models");
const OrderRouter = express.Router();

OrderRouter.use(bodyParser.json());

// Thêm đơn hàng
OrderRouter.post("/create", async (req, res, next) => {
  const { customerId, address, phone, product, total } = req.body;

  try {
    const newOrder = new db.OrderDetail({
      customerId,
      address,
      phone,
      product,
      total,
    });

    await newOrder.save();
    res.status(201).send({ message: "Đơn hàng đã được tạo thành công", order: newOrder });
  } catch (err) {
    next(err);
  }
});

// Lấy chi tiết đơn hàng theo khách hàng
OrderRouter.get("/:customerId", async (req, res, next) => {
  try {
    const orders = await db.OrderDetail.find({ customerId: req.params.customerId }).populate("product.pid");
    res.status(200).send(orders);
  } catch (err) {
    next(err);
  }
});

module.exports = OrderRouter;