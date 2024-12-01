const asyncHandler = require("express-async-handler")
const User = require("../models/User")
const fs = require("fs")
const path = require("path")
const Product = require("../models/Product")
const upload = require("../utils/upload")
const Order = require("../models/Order")


//          USER CONTROLLER
exports.GetUser = asyncHandler(async (req, res) => {
    const result = await User.find({ role: "customer" })
    res.json({ message: "user Get Success", result })
})
exports.addUser = asyncHandler(async (req, res) => {
    await User.create({ ...req.body, role: "customer" })
    res.json({ message: "user Add Success" })
})
exports.updateuser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, req.body)
    res.json({ message: "user Update Success" })
})
exports.deleteUser = asyncHandler(async (req, res) => {
    await User.findByIdAndDelete(req.params.id, req.body)
    res.json({ message: "user Delete Success" })
})


//            PRODUCTS CONTROLLER
exports.getAllProducts = asyncHandler(async (req, res) => {
    const result = await Product.find()
    res.json({ message: "Product Fetch Success", result })
})
exports.addProducts = asyncHandler(async (req, res) => {

    upload(req, res, async (err) => {
        if (err) {
            console.log(err)
            return res.status(400).json({ message: "Multer Error", err })
        }
        if (req.file) {
            await Product.create({ ...req.body, image: req.file.filename })
            res.json({ message: "Product ADD Success" })
        } else {
            return res.status(400).json({ message: "Thumb Image Is Required", err })
        }

    })
})
exports.updateProducts = asyncHandler(async (req, res) => {
    await Product.findByIdAndUpdate(req.params.id, req.body)
    res.json({ message: "Products Update Success" })
})

exports.deleteProducts = asyncHandler(async (req, res) => {
    const result = await Product.findById(req.params.id)
    fs.unlinkSync(path.join(__dirname, "..", "uploads", result.image))
    await Product.findByIdAndDelete(req.params.id)
    res.json({ message: "Product Delete Success" })
})
//  ALL ORDER CONTROLLER
// exports.getAllOrder = asyncHandler(async (req, res) => {
//     const result = await Order.find()
//     res.json({ message: "Order get Sucess", result })
// })
exports.GetAdminOrders = asyncHandler(async (req, res) => {
    const { id } = req.params
    const result = await Order.find({ customer: id }).populate("products")
    res.json({ message: "Order Fetch Success", result })
})

exports.GetAllOrders = asyncHandler(async (req, res) => {
    const { id } = req.params
    const result = await Order.find({ customer: id }).populate("products")
    res.json({ message: "Order Fetch Success", result })
})