import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './components/UserContext';
import './App.css';
import HomePage from './components/HomePage';
import Modal from './components/Modal';
import Browse from './components/Browse';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import Main from './components/Main';
import Profile from './components/Profile';
import About from './components/About';
import Book from './components/Book';
import AdminDashboard from './components/AdminDashboard';
import Home from './components/Home';
import Add from './components/Add';
import Remove from './components/Remove';
import Payment from './components/Payment';
import DoctorPage from './components/DoctorPage';
import Edit from './components/Edit';
import EditDoctor from './components/EditDoctor'; // Import EditDoctor
import Confirm from './components/Confirm';
import UserProfile from './components/UserProfile';
import AdminHomePage from './components/AdminHomePage';
import AdminHome from './components/AdminHome';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const switchToSignUpForm = () => {
    setShowLoginForm(false);
    setShowSignUpForm(true);
  };

  const switchToLoginForm = () => {
    setShowSignUpForm(false);
    setShowLoginForm(true);
  };

  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage onBrowseClick={handleOpenModal} onLoginClick={() => setShowLoginForm(true)} />} />
            <Route path="/main" element={<Main />} />
            <Route path="/provider/:id" element={<Profile onBrowseClick={handleOpenModal} onLoginClick={() => setShowLoginForm(true)} />} />
            <Route path="/about" element={<About onBrowseClick={handleOpenModal} onLoginClick={() => setShowLoginForm(true)} />} />
            <Route path="/book" element={<Book onBrowseClick={handleOpenModal} onLoginClick={() => setShowLoginForm(true)} />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/home" element={<Home />} />
            <Route path="/add" element={<Add />} />
            <Route path="/remove" element={<Remove />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/doctor" element={<DoctorPage />} />
            <Route path="/edit" element={<Edit />} />
            <Route path="/edit-doctor" element={<EditDoctor />} /> {/* EditDoctor route */}
            <Route path="/confirm" element={<Confirm />} /> {/* Ensure correct path */}
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/adminhome" element={<AdminHome />} />
          </Routes>

          <Modal show={showModal} handleClose={handleCloseModal}>
            <Browse />
          </Modal>

          {showLoginForm && (
            <Modal show={showLoginForm} handleClose={() => setShowLoginForm(false)}>
              <LoginForm
                closeLoginForm={() => setShowLoginForm(false)}
                onSignUpClick={switchToSignUpForm}
              />
            </Modal>
          )}
          {showSignUpForm && (
            <Modal show={showSignUpForm} handleClose={() => setShowSignUpForm(false)}>
              <SignUpForm
                closeSignUpForm={() => setShowSignUpForm(false)}
                onLoginClick={switchToLoginForm}
              />
            </Modal>
          )}
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
