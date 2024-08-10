import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests
import { UserContext } from './UserContext';
import './LoginForm.css';
import googleIcon from '../assets/google.png';
import appleIcon from '../assets/apple-logo.png';

const LoginForm = ({ closeLoginForm, onSwitchToSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInType, setSignInType] = useState('User');
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (signInType === 'User') {
        // Handle user login
        const loginEndpoint = `http://localhost:8080/DocNav/login`;
        const response = await axios.post(loginEndpoint, {
          userId: email, // Assuming `email` is used as `userId` for login
          password: password
        });

        if (response.status === 200) {
          const { data } = response;
          setUser({ email });
          closeLoginForm();
        } else {
          alert('Login failed. Please check your credentials and try again.');
        }
      } else {
        // Handle doctor or admin login
        if (signInType === 'Admin') {
          navigate('/admin-dashboard');
        } else if (signInType === 'Doctor') {
          navigate('/doctor', {
            state: {
              date: new Date(),
              time: '10:00 AM',
              problem: 'General check-up',
              patientName: email,
            }
          });
        }
        closeLoginForm();
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Invalid UserId or Password');
    }
  };

  const handleSignInTypeChange = (type) => {
    setSignInType(type);
  };

  const heading = signInType === 'User' ? 'User login' : `${signInType} sign in`;
  const switchLinkText = signInType === 'User' ? '' : 'Back to User sign in';
  const placeholder = signInType === 'User' ? 'Enter your User Id' :
                      signInType === 'Admin' ? 'Enter your Admin Id' :
                      'Enter your Doctor Id';

  return (
    <div className="login-overlay">
      <div className="login-popup">
        <div className='close0' onClick={closeLoginForm}>✖</div>
        {/* <img src={logo1} alt="Logo" className="logo" /> */}
        <p>{heading}</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            aria-label="Email Address"
            placeholder={placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            aria-label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="continue1-btn">Continue</button>
        </form>
        <div className="divider">or</div>
        <div className="social-logos">
          <img src={googleIcon} alt="Google" className="social-logo1" />
          <img src={appleIcon} alt="Apple" className="social-logo" />
        </div>
        <div className="footer-text">
          New to Zocdoc? <a href="#" onClick={onSwitchToSignUp}>Create an account</a>
        </div>
        <div className="additional-links">
          {signInType === 'User' ? (
            <>
              <a href="#" onClick={() => handleSignInTypeChange('Doctor')}>Doctor sign in</a>
              <a href="#" onClick={() => handleSignInTypeChange('Admin')}>Admin sign in</a>
            </>
          ) : (
            <a href="#" onClick={() => handleSignInTypeChange('User')}>{switchLinkText}</a>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
