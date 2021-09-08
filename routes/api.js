const router = require("express").Router();

// import Middlewares
const { requireAuth, verifyToken } = require("../Middleware/Authenticated");

// import Validations
const LoginValidation = require("../validation/Login");
const RegisterUserValidation = require("../validation/RegisterUser");
const ResetPasswordValidation = require("../validation/ResetPassword");
const ForgotPasswordValidation = require("../validation/ForgotPassword");

// import Controllers
const AuthController = require("../Controllers/AuthController");

router.post("/login", LoginValidation, AuthController.login);
router.post("/register", RegisterUserValidation, AuthController.register);
router.post("/forgot", ForgotPasswordValidation, AuthController.forgot);
router.post("/reset", ResetPasswordValidation, AuthController.reset);
router.post("/logout", requireAuth, verifyToken, AuthController.logout);
router.get("/me", requireAuth, verifyToken, AuthController.me);

module.exports = router;
