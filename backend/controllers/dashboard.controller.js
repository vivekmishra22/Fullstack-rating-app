const UserService = require('../services/user.service');
const StoreService = require('../services/store.service');

class DashboardController {
  static async getAdminDashboard(req, res) {
    try {
      const stats = await UserService.getDashboardStats();
      res.json({
        success: true,
        data: stats
      });
    } catch (error) {
      console.error('Dashboard error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch admin dashboard data',
        error: error.message
      });
    }
  }

  static async getStoreOwnerDashboard(req, res) {
    try {
      // For now, return basic data - implement store owner logic later
      res.json({
        success: true,
        message: 'Store owner dashboard endpoint',
        data: {
          totalStores: 0,
          totalRatings: 0,
          averageRating: 0
        }
      });
    } catch (error) {
      console.error('Store owner dashboard error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch store owner dashboard data',
        error: error.message
      });
    }
  }
}

module.exports = DashboardController;