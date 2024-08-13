import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Updated import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from './UserContext';
import './Navbar.css';
import logo from '../assets/logo.png';
import Modal from './Modal';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';

const Navbar = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate(); // Updated to useNavigate

  const handleLoginClick = () => {
    setShowLoginForm(true);
  };

  const closeLoginForm = () => {
    setShowLoginForm(false);
  };

  const handleSignUpClick = () => {
    setShowSignUpForm(true);
  };

  const closeSignUpForm = () => {
    setShowSignUpForm(false);
  };

  const switchToSignUp = () => {
    setShowLoginForm(false);
    setShowSignUpForm(true);
  };

  const switchToLogin = () => {
    setShowSignUpForm(false);
    setShowLoginForm(true);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    setUser(null);
    setShowDropdown(false);
  };

  const goToProfile = () => {
    setShowDropdown(false);
    navigate('/profile'); // Updated to use navigate
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Logo" className="logo1-img" />
      </div>
      <div className="navbar-links">
        <Link to="/" className="navbar-link">Home</Link>
        <a href="#" className="navbar-link">Help</a>
        <Link to="/about" className="navbar-link">About Us</Link>
        {user ? (
          <div className="navbar-link user-dropdown" onClick={toggleDropdown}>
            <div className="profile-icon-circle">
              <FontAwesomeIcon icon={faUser} className="profile-icon" />
            </div>
            {user.email}
            {showDropdown && (
              <div className="dropdown-menu">
                {/* <button onClick={goToProfile} className="dropdown-item">Profile</button> */}
                <button onClick={handleLogout} className="dropdown-item">Logout</button>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="navbar-link login" onClick={handleLoginClick}>
              Log in
            </div>
            <a href="#" className="navbar-link navbar-signup" onClick={handleSignUpClick}>Sign up</a>
          </>
        )}
      </div>
      {showLoginForm && (
        <Modal show={showLoginForm} handleClose={closeLoginForm}>
          <LoginForm closeLoginForm={closeLoginForm} onSwitchToSignUp={switchToSignUp} />
        </Modal>
      )}
      {showSignUpForm && (
        <Modal show={showSignUpForm} handleClose={closeSignUpForm}>
          <SignUpForm closeSignUpForm={closeSignUpForm} onSwitchToLogin={switchToLogin} />
        </Modal>
      )}
    </nav>
  );
};

export default Navbar;
