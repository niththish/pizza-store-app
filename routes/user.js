const express = require("express");
const signupController = require("../controllers/signup");
const loginController = require("../controllers/login");
const updateUserController = require("../controllers/update_user");
const authVerification = require("../middleware/verifyToken");
const userOrdersController = require("../controllers/user_orders");

const router = express.Router();
router.post("/signup", signupController);
router.post("/login", loginController);
router.patch("/", authVerification, updateUserController);
router.get("/orders", authVerification, userOrdersController);

module.exports = router;
