import React, { useContext } from 'react';
import AuthContext from '../context/auth.context';

const DashboardPage = () => {
  const { user } = useContext(AuthContext);

  const getRoleDescription = () => {
    switch (user?.role) {
      case 'admin':
        return 'Manage users, stores, and view system statistics';
      case 'store_owner':
        return 'View ratings for your store and manage your store profile';
      case 'user':
        return 'Browse stores and submit ratings for your favorite stores';
      default:
        return 'Please log in to access the platform features';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Welcome, {user?.name}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Role</h3>
          <p className="text-blue-600 font-medium capitalize">{user?.role}</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Available Features</h3>
          <p className="text-gray-600">{getRoleDescription()}</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Actions</h3>
          <div className="space-y-2">
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
              Browse Stores
            </button>
            <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition">
              View Ratings
            </button>
          </div>
        </div>
      </div>

      {user?.role === 'admin' && (
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Admin Dashboard</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900">User Management</h4>
              <p className="text-sm text-blue-700">Create and manage users and their roles</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-900">Store Management</h4>
              <p className="text-sm text-green-700">Add and manage stores on the platform</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;