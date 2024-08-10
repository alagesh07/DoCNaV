import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './DoctorProfile.css';
import hospitalIcon from '../assets/hospital-icon.png';
import profile2Image from '../assets/profile2-image.png'; // Add image import for profile2-section

const DoctorProfile = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleBookNowClick = () => {
    navigate('/book'); // Navigate to the Book page
  };

  return (
    <div className="doctor-profile">
      <div className="profile-header">
        <div className="doctor-details">
          <img
            src={require('../assets/1.jpg')}
            alt="Doctor"
            className="doctor-image"
          />
          <div className="doctor-info">
            <span className="specialty-badge">Dermatology</span>
            <h1>Dr. Raj Kumar</h1>
            <p>MBBS, Dental</p>
            <div className="languages">
              <span className="language">English</span>
              <span className="language">Kannada</span>
              <span className="language">Hindi</span>
              <span className="language">Tamil</span>
            </div>
          </div>
        </div>
        <div className="rating1-experience">
          <div className="rating1">
            <i className="star-icon">⭐</i> 4.56
          </div>
          <div className="experience">16 Years</div>
          <div className="review-count">10061 Reviews</div>
        </div>
      </div>
      <div className="profile-body">
        <div className="profile1-section">
          <div className="hospital-container">
            <img src={hospitalIcon} alt="Hospital" className="icon-hospital" />
            <div>
              <h2>Private Clinic</h2>
              <p>Private Clinic, #1075, Poonamalle High Road, Next to Muthu Medicals (Krishna Apartments), Gandhipuram, Coimbatore - 641012</p>
            </div>
          </div>
        </div>
        <div className="consult1-now">
          <p>Instantly Consult With Doctor</p>
          <button className="consult1-now-button" onClick={handleBookNowClick}>Book Now</button>
        </div>
        <div className="profile2-section">
          <img src={profile2Image} alt="Profile Section 2" className="profile2-image" />
          <div className="profile2-content">
            <h2>About the doctor</h2>
            <p>Dr. Raj Kumar is an expert and experienced Dermatology with an experience of 16 years. The doctor specializes in Dermatological Issues, Cosmetological Issues, Hair Regrowth and transplant, Sexually Transmitted Disease. Currently, Dr. Raj Kumar is practicing at Private Clinic in Private Clinic, #1075, Poonamalle High Road, Next to Muthu Medicals (Krishna Apartments), Gandhipuram, Coimbatore - 641012...</p>
          </div>
        </div>
        <div className="profile3-section">
          <div className="profile3-content">
            <p1>Membership</p1>
            <ul>
              <li>Karnataka Medical Council</li>
              <li>Indian Association of Dermatologists, Venereologists and Leprologists</li>
            </ul>
            <p1>Medical Council ID (License)</p1>
            <p>KMC - 35678</p>
          </div>
        </div>
        <div className="profile4-section">
          <h2>Education</h2>
          <div className="education-item">
            <span className="education-icon">📘</span>
            <div>
              <p><strong>BRAMC, Bengaluru</strong></p>
              <p>MBBS</p>
            </div>
          </div>
          <div className="education-item">
            <span className="education-icon">📘</span>
            <div>
              <p><strong>SDMC, Dharwad</strong></p>
              <p>DDVL - Dermatology</p>
            </div>
          </div>
        </div>
        <div className="profile5-section">
          <h2>Specializations</h2>
          <div className="specializations">
            <span className="specialization">Dermatological Issues</span>
            <span className="specialization">Cosmetological Issues</span>
            <span className="specialization">Hair Regrowth and transplant</span>
            <span className="specialization">Sexually Transmitted Disease</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
