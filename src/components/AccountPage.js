import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AccountPage() {
  const [user, setUser] = useState({ username: '', email: '', password: '' });
  const [newPassword, setNewPassword] = useState('');
  const [preferences, setPreferences] = useState({ theme: 'light', notifications: true });
  const [message, setMessage] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleSaveProfile = () => {
    if (user.username && user.email && user.password) {
      localStorage.setItem('user', JSON.stringify(user));
      setMessage('Profile updated successfully!');
    } else {
      setMessage('Please fill in all fields.');
    }
  };

  const handleSavePreferences = () => {
    localStorage.setItem('preferences', JSON.stringify(preferences));
    setMessage('Preferences updated successfully!');
  };

  const handleChangePassword = () => {
    if (newPassword) {
      const updatedUser = { ...user, password: newPassword };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      alert('Password changed successfully!'); // Alert for password change
      setMessage('Password changed successfully!');
      setNewPassword(''); // Clear the new password field
    } else {
      setMessage('Please enter a new password.');
    }
  };

  const handleDeleteAccount = () => {
    if (confirmDelete) {
      localStorage.removeItem('user');
      localStorage.removeItem('preferences');
      navigate('/');
    } else {
      setMessage('Please confirm deletion.');
    }
  };

  return (
    <div className="account-container">
      <h2>Account Settings</h2>

      <div className="section">
        <h3>Profile Information</h3>
        <form>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Current Password</label>
            <input
              type="password"
              id="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>
          <button type="button" onClick={handleSaveProfile}>Save Profile</button>
        </form>
      </div>

      <div className="section">
        <h3>Change Password</h3>
        <form>
          <div className="form-group">
            <label htmlFor="new-password">New Password</label>
            <input
              type="password"
              id="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <button type="button" onClick={handleChangePassword}>Change Password</button>
        </form>
      </div>

      <div className="section">
        <h3>Account Preferences</h3>
        <form>
          <div className="form-group">
            <label htmlFor="theme">Theme</label>
            <select
              id="theme"
              value={preferences.theme}
              onChange={(e) => setPreferences({ ...preferences, theme: e.target.value })}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="notifications">Enable Notifications</label>
            <input
              type="checkbox"
              id="notifications"
              checked={preferences.notifications}
              onChange={(e) => setPreferences({ ...preferences, notifications: e.target.checked })}
            />
          </div>
          <button type="button" onClick={handleSavePreferences}>Save Preferences</button>
        </form>
      </div>

      <div className="section">
        <h3>Delete Account</h3>
        <p>This action is irreversible. Are you sure you want to delete your account?</p>
        <button type="button" onClick={() => setConfirmDelete(true)}>Delete Account</button>
        {confirmDelete && (
          <div>
            <p>Please confirm by clicking the button below:</p>
            <button type="button" onClick={handleDeleteAccount}>Confirm Delete</button>
          </div>
        )}
      </div>

      {message && <p>{message}</p>}
    </div>
  );
}

export default AccountPage;
