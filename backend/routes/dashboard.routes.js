const express = require('express');
const router = express.Router();
const DashboardController = require('../controllers/dashboard.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const adminMiddleware = require('../middlewares/admin.middleware');
const storeOwnerMiddleware = require('../middlewares/storeOwner.middleware');

router.get('/admin', authMiddleware, adminMiddleware, DashboardController.getAdminDashboard);
router.get('/store-owner', authMiddleware, storeOwnerMiddleware, DashboardController.getStoreOwnerDashboard);

module.exports = router;