const express = require('express');
const router = express.Router();
const StoreController = require('../controllers/store.controller');
const { validateCreateStore } = require('../middlewares/validators/store.validator');
const authMiddleware = require('../middlewares/auth.middleware');
const adminMiddleware = require('../middlewares/admin.middleware');

router.get('/', authMiddleware, StoreController.getAllStores);
router.post('/', authMiddleware, adminMiddleware, validateCreateStore, StoreController.createStore);
router.get('/:storeId/ratings', authMiddleware, StoreController.getStoreRatings);

module.exports = router;