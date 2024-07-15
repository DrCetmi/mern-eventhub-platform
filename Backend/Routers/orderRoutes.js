const express = require("express");
const router = express.Router();
const orderController = require("../Controllers/orderController");

router.post("/orders", orderController.createOrder);
router.get("/orders", orderController.getAllOrders);

module.exports = router;
