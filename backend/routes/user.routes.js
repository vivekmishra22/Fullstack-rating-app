const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const { validateCreateAdmin, validateCreateStoreOwner } = require('../middlewares/validators/user.validator');
const authMiddleware = require('../middlewares/auth.middleware');
const adminMiddleware = require('../middlewares/admin.middleware');

router.get('/', authMiddleware, adminMiddleware, UserController.getAllUsers);
router.post('/admin', authMiddleware, adminMiddleware, validateCreateAdmin, UserController.createAdminUser);
router.post('/store-owner', authMiddleware, adminMiddleware, validateCreateStoreOwner, UserController.createStoreOwner);

module.exports = router;