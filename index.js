const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const path = require("path")
require("dotenv").config()

//1 database Connect
mongoose.connect(process.env.MONGO_URL)
const app = express()

// 2middleware
app.use(express.json())
app.use(express.static("uploads"))
app.use(cors({
    origin: process.env.NODE_ENV === "dev"
        ? "http://localhost:5173"
        : "https://e-com-freshcart.onrender.com",
    credentials: true
}))

// 3userRoutes
app.use("/api/auth", require("./routes/auth.routes"))
app.use("/api/admin", require("./routes/admin.routes"))
app.use("/api/order", require("./routes/order.routes"))


// 404
app.use('*', (req, res, next) => {
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'index.html'));
    } else {
        next();
    }
});


//4 Error Handeler
app.use((error, req, res, next) => {
    res.status(500).json({ message: error.message || "Something Went Wrong" })
})
// 5 Server Run 
mongoose.connection.once("open", () => {
    console.log("MONGO CONNECTED")
    app.listen(process.env.PORT, console.log("SERVER RUNNING"))

})
