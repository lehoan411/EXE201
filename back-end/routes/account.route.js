const express = require("express");
const bodyParser = require("body-parser");
const db = require("../models");
const AccountRouter = express.Router();
AccountRouter.use(bodyParser.json());

//get account
AccountRouter.get("/:id", async (req, res, next) => {
    try {
        const account = await db.Account.findById(req.params.id);
        if (!account) {
            res.status(404).send({ message: "Account not found" });
        } else {
            res.status(200).send(account);
        }
    } catch (err) {
        next(err);
    }
})

AccountRouter.put("/:id", async (req, res, next) => {
    try {
      const updatedUser = await db.Account.findByIdAndUpdate(
        req.params.id,
        {
          fullname: req.body.fullname,
          address: req.body.address,
          phone: req.body.phone,
        },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).send({ message: "User not found" });
      }
      res.status(200).send(updatedUser);
    } catch (err) {
      next(err);
    }
  });

// login
AccountRouter.post("/login", async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const account = await db.Account.findOne({ username, password });
        if (!account) {
            res.status(404).send({ message: "Account not found" });
        } else {
            res.status(200).send(account);
        }
    } catch (err) {
        next(err);
    }
});

// register
AccountRouter.post("/register", async (req, res, next) => {
    try {
        const { username, password, email, address, phone } = req.body;
        const account = await db.Account.findOne
        ({ username });
        if (account) {
            res.status(400).send({ message: "Account already exists" });
        } else {
            const newAccount = new db.Account({ username, password, email, address, phone });
            await newAccount.save();
            res.status(200).send(newAccount);
        }
    } catch (err) {
        next(err);
    }
});

module.exports = AccountRouter;




    
