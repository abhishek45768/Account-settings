import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/account">Account Settings</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
