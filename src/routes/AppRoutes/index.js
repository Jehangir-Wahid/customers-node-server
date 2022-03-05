const express = require("express");
const router = express.Router();
const CustomerController = require("../../controllers/CustomerController");

router.get("/customers", CustomerController.get_all_customers);

router.get("/customers/:customerId", CustomerController.get_customer);

module.exports = router;
