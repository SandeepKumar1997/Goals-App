const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/userController");
const authenticate = require("../middleware/auth");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", authenticate, getMe);

module.exports = router;
