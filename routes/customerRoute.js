const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");

//CRUD OPERATIONS
router.post("/signUp", customerController.saveCustomer);
router.post("/login", customerController.customerLogin);
router.get("/:id", customerController.getSingleCustomerById);
router.get("/", customerController.getAllCustomers);
router.patch("/:id", customerController.updateCustomerByid);
router.delete("/:id", customerController.deleteCustomerByid);

// Exporting of modules
module.exports = router;
