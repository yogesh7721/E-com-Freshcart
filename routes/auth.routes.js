const authRouter = require("express").Router()
const authController = require("./../controller/auth.controller")

authRouter
    .post("/register", authController.registerUser)
    .post("/login", authController.loginUser)
    .post("/logout", authController.logout)

module.exports = authRouter