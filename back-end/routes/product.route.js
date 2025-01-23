const express = require("express");
const bodyParser = require("body-parser");
const db = require("../models");
const ProductRouter = express.Router();
ProductRouter.use(bodyParser.json());

ProductRouter.get("/", async (req, res, next) => {
    try {
        const products = await db.Product.find();
        res.status(200).send(products);
    } catch (err) {
        next(err);
    }
});

ProductRouter.get("/:id", async (req, res, next) => {
    try {
        const product = await db.Product.findById(req.params.id);
        if (!product) {
            res.status(404).send({ message: "Product not found" });
        } else {
            res.status(200).send(product);
        }
    } catch (err) {
        next(err);
    }
});

ProductRouter.post("/", async (req, res, next) => {
    try {
        const { name, description, price, image } = req.body;
        const product = new db.Product({ name, description, price, image });
        await product.save();
        res.status(201).send(product);
    } catch (err) {
        next(err);
    }
});

ProductRouter.put("/:id", async (req, res, next) => {
    try {
        const updatedProduct = await db.Product.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                image: req.body.image,
            },
            { new: true }
        );
        if (!updatedProduct) {
            return res.status(404).send({ message: "Product not found" });
        }
        res.status(200).send(updatedProduct);
    } catch (err) {
        next(err);
    }
});

ProductRouter.delete("/:id", async (req, res, next) => {
    try {
        const product = await db.Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).send({ message: "Product not found" });
        }
        res.status(204).send();
    } catch (err) {
        next(err);
    }
});

module.exports = ProductRouter;