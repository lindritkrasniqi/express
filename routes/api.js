const router = require("express").Router();
const { requireAuth, verifyToken } = require("../Middleware/Authenticated");
const LoginValidation = require("../validation/Login");
const RegisterUserValidation = require("../validation/RegisterUser");
const AuthController = require("../Controllers/AuthController");

router.post("/login", LoginValidation, AuthController.login);
router.post("/register", RegisterUserValidation, AuthController.register);
router.get("/forgot", AuthController.forgot);
router.get("/reset", AuthController.reset);
router.post("/logout", requireAuth, verifyToken, AuthController.logout);

module.exports = router;
