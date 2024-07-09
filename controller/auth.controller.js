const asyncHandler = require("express-async-handler")
const User = require("../models/User")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const sendEmail = require("../utils/Email")


exports.registerUser = asyncHandler(async (req, res) => {
    const { password, email } = req.body
    const isFound = await User.findOne({ email })
    if (isFound) {
        res.status(400).json({ message: "Email Already Exist" })
    }

    const hashPass = await bcrypt.hash(password, 10)
    await User.create({ ...req.body, password: hashPass, role: "customer" })
    await sendEmail({ to: email, subject: "Registration Success", message: `<h1>WelCome, ${req.body.name}.</h1>` })
    res.json({ message: `${req.body.name} Register Success` })

})
exports.loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    // Authentication
    // step:1 
    // step:2

    // Authorizetion
    // step:3
    // step:4
    // step: 1 verify email
    const result = await User.findOne({ email })
    if (!result) {
        return res.status(400).json({ message: "Email Not Fount" })
    }

    // step: 2 verify password
    const verify = await bcrypt.compare(password, result.password)
    if (!verify) {
        return res.status(400).json({ message: "Password Do Not Match" })
    }

    // step: 3 genrate Token
    const Token = jwt.sign({ userId: result._id }, process.env.JWT_KEY, { expiresIn: "10h" })

    // step: 4 send Token with Cookie
    res.cookie("auth-token", Token, { httpOnly: true })
    res.json({
        message: "Login Sucess", result: {
            _id: result._id,
            name: result.name,
            email: result.email,
            role: result.role,
        }
    })

})

exports.logout = asyncHandler(async (req, res) => {
    res.clearCookie("auth-token")
    res.json({ message: "Logout Success" })
})

