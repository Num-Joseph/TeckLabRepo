const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

//CRUD OPERATIONS
router.post("/signUp", userController.saveUser);
router.post("/login", userController.userLogin);
router.get("/:id", userController.getSingleUserById);
router.get("/", userController.getAllUsers);
router.patch("/:id", userController.updateUserByid);
router.delete("/:id", userController.deleteUserByid);

// Exporting the modules
module.exports = router;
