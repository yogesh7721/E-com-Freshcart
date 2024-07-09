const router = require("express").Router()
const adminUser = require("../controller/admin.controller")

router
    .get("/users", adminUser.GetUser)
    .post("/new-user", adminUser.addUser)
    .put("/update-user/:id", adminUser.updateuser)
    .delete("/delete-user/:id", adminUser.deleteUser)

    .get("/products", adminUser.getAllProducts)
    .post("/add-products", adminUser.addProducts)
    .put("/update-products/:id", adminUser.updateProducts)
    .delete("/delete-products/:id", adminUser.deleteProducts)

    // Order Routes
    .get("/get-allorder", adminUser.GetAdminOrders)
module.exports = router