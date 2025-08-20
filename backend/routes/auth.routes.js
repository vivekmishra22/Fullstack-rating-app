const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');
const { validateRegister, validateLogin, validateChangePassword } = require('../middlewares/validators/auth.validator');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register', validateRegister, AuthController.register);
router.post('/login', validateLogin, AuthController.login);
router.post('/change-password', authMiddleware, validateChangePassword, AuthController.changePassword);

module.exports = router;