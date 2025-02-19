const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.getAllUsers);
router.post("/", userController.createUser);
router.put("/", userController.updateUser);
router.delete("/:userId", userController.deleteUser);
router.post("/login", userController.loginUser);
router.post("/register", userController.registerUser);

module.exports = router;