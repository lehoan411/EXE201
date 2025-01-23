const mongoose = require('mongoose');
const Account = require('./account.model');
const Category = require('./category.model');
const Product = require('./Product.model');
const OrderDetail = require('./orderdetail.model');
const FeedBack = require('./feedback.model');
const Cart = require('./cart.model');


const db = {};

db.Account = Account;
db.Category = Category;
db.Product = Product;
db.OrderDetail = OrderDetail;
db.FeedBack = FeedBack;
db.Cart = Cart;


//Ket noi CSDL
db.connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI)
            .then(() => console.log("Connected to MongoDB"));

    } catch(err) {
        next(err)
        process.exit();
    }
    
}

module.exports = db;