import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="navbar-brand">
          JWT Auth App
        </Link>
        
        {user ? (
          <div className="navbar-links">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/api-test">API Test</Link>
            {user.role === 'admin' && <Link to="/admin">Admin</Link>}
            {(user.role === 'moderator' || user.role === 'admin') && (
              <Link to="/moderator">Moderator</Link>
            )}
            <div className="navbar-user">
              <span className="user-info">
                {user.name}
                <span className="role">{user.role}</span>
              </span>
              <button onClick={logout} className="logout-btn">
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="navbar-links">
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
