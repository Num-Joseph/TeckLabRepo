const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

//CRUD OPERATIONS
router.post("/signUp", userController.saveUser);

// Exporting the modules
module.exports = router;
