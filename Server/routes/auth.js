const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth"); // Adjust path if needed

// Signup route (type: 'user' or 'seller')
router.post("/signup/:type", authController.SignUp);

// Signin route (type: 'user' or 'seller')
router.post("/signin/:type", authController.SignIn);

// Verify email route (type: 'user' or 'seller')
router.get("/verify-email/:type/:token", authController.VerifyEmail);

// Forgot password route (type: 'user' or 'seller')
router.post("/forgot-password/:type", authController.ForgotPassword);

// Reset password route (type: 'user' or 'seller')
router.post("/reset-password/:type", authController.ResetPassword);

router.post("/logout", authController.logout);

module.exports = router;
