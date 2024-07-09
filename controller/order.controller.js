const asyncHandler = require("express-async-handler")
const Order = require("../models/Order")
const User = require("../models/User")
const sendEmail = require("../utils/Email")

exports.placeOrder = asyncHandler(async (req, res) => {
    await Order.create(req.body)
    res.json({ message: "Order Placed Success" })
})

exports.GetUserOrderDetails = asyncHandler(async (req, res) => {
    const { id } = req.params
    const result = await Order.find({ customer: id }).populate("products")
    res.json({ message: "Order Fetch Success", result })
})


// Cancel ORDER
exports.cancelOrder = asyncHandler(async (req, res) => {
    const { id } = req.params
    await Order.findByIdAndUpdate(id, { status: "cancel" })
    const x = await Order.findById(id)
    const result = await User.findById(x.customer)
    await sendEmail({
        to: result.email,
        subject: "Order Cancel Success",
        message: `<h1>Your Order Has Beeen Canceled.</h1>`
    })
    res.json({ message: "Order Cancel Success" })
})