import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/auth.context';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-xl font-bold">Store Rating App</Link>
            
            {user && (
              <div className="hidden md:flex space-x-4">
                <Link to="/" className="px-3 py-2 rounded hover:bg-blue-700 transition">Dashboard</Link>
                <Link to="/stores" className="px-3 py-2 rounded hover:bg-blue-700 transition">Stores</Link>
                <Link to="/my-ratings" className="px-3 py-2 rounded hover:bg-blue-700 transition">My Ratings</Link>
                
                {user.role === 'admin' && (
                  <>
                    <Link to="/admin/users" className="px-3 py-2 rounded hover:bg-blue-700 transition">Users</Link>
                    <Link to="/admin/create-admin" className="px-3 py-2 rounded hover:bg-blue-700 transition">Create Admin</Link>
                    <Link to="/admin/create-store-owner" className="px-3 py-2 rounded hover:bg-blue-700 transition">Create Store Owner</Link>
                    <Link to="/admin/create-store" className="px-3 py-2 rounded hover:bg-blue-700 transition">Create Store</Link>
                  </>
                )}
                
                {user.role === 'store_owner' && (
                  <Link to="/store-owner/ratings" className="px-3 py-2 rounded hover:bg-blue-700 transition">My Store Ratings</Link>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="hidden md:block">Welcome, {user.name}</span>
                <Link to="/change-password" className="px-3 py-2 rounded hover:bg-blue-700 transition">Change Password</Link>
                <button onClick={handleLogout} className="px-3 py-2 rounded hover:bg-blue-700 transition">Logout</button>
              </>
            ) : (
              <div className="flex space-x-2">
                <Link to="/login" className="px-3 py-2 rounded hover:bg-blue-700 transition">Login</Link>
                <Link to="/register" className="px-3 py-2 rounded hover:bg-blue-700 transition">Register</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;