import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/routing/PrivateRoute';
import AdminRoute from './components/routing/AdminRoute';
import StoreOwnerRoute from './components/routing/StoreOwnerRoute';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ChangePasswordPage from './pages/auth/ChangePasswordPage';
import DashboardPage from './pages/DashboardPage';
import StoresPage from './pages/store/StoresPage';
import UsersPage from './pages/user/UsersPage';
import CreateAdminPage from './pages/user/CreateAdminPage';
import CreateStoreOwnerPage from './pages/user/CreateStoreOwnerPage';
import CreateStorePage from './pages/store/CreateStorePage';
import StoreRatingsPage from './pages/store/StoreRatingsPage';
import UserRatingsPage from './pages/rating/UserRatingsPage';
import Navbar from './components/layout/Navbar';
import Alert from './components/ui/Alert';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Alert />
      <div className="container mx-auto px-4 py-8">
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Private routes */}
          <Route path="/" element={<PrivateRoute />}>
            <Route index element={<DashboardPage />} />
            <Route path="change-password" element={<ChangePasswordPage />} />
            <Route path="stores" element={<StoresPage />} />
            <Route path="my-ratings" element={<UserRatingsPage />} />
          </Route>
          
          {/* Admin routes */}
          <Route path="/admin" element={<AdminRoute />}>
            <Route path="users" element={<UsersPage />} />
            <Route path="create-admin" element={<CreateAdminPage />} />
            <Route path="create-store-owner" element={<CreateStoreOwnerPage />} />
            <Route path="create-store" element={<CreateStorePage />} />
          </Route>
          
          {/* Store owner routes */}
          <Route path="/store-owner" element={<StoreOwnerRoute />}>
            <Route path="ratings/:storeId" element={<StoreRatingsPage />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;