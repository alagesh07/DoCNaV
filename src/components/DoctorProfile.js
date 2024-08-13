import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './DoctorProfile.css';
import hospitalIcon from '../assets/hospital-icon.png';
import profile2Image from '../assets/profile2-image.png';

const DoctorProfile = () => {
  const { id } = useParams(); // Get the doctor's ID from the URL parameters
  const [doctor, setDoctor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/admin/getDoc/${id}`);
        setDoctor(response.data);
      } catch (error) {
        console.error('Error fetching doctor data:', error);
      }
    };

    fetchDoctor();
  }, [id]);

  const handleBookNowClick = () => {
    navigate('/book', { state: { doctorId: id } }); // Pass the doctor's ID to the Book page
  };

  if (!doctor) return <p>Loading...</p>;

  const languages = doctor.languages ? doctor.languages.split(',') : []; // Ensure languages is an array
  const specializations = doctor.specs ? doctor.specs.split(',') : []; // Ensure specs is split into an array

  return (
    <div className="doctor-profile">
      <div className="profile-header">
        <div className="doctor-details">
          <img
            src={`data:image/jpeg;base64,${doctor.img}`}
            alt="Doctor"
            className="doctor-image"
          />
          <div className="doctor-info">
            <span className="specialty-badge">{doctor.docCon}</span>
            <h1>{doctor.doc_name}</h1>
            <p>{doctor.doc_edu} - {doctor.doc_spec}</p>
            <div className="languages">
              {languages.map(lang => (
                <span key={lang} className="language">{lang}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="rating1-experience">
          <div className="rating1">
            <i className="star-icon">⭐</i> {doctor.rating || 4.3}
          </div>
          <div className="experience">{doctor.doc_exp} Years</div>
          {/* <div className="review-count">{doctor.review_count || 'No Reviews'}</div> */}
        </div>
      </div>
      <div className="profile-body">
        <div className="profile1-section">
          <div className="hospital-container">
            <img src={hospitalIcon} alt="Hospital" className="icon-hospital" />
            <div>
              <h2>{doctor.hospital}</h2>
              <p>{doctor.clinic_add}</p>
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
            <p>{doctor.abt_doctor}</p>
          </div>
        </div>
        <div className="profile3-section">
          <div className="profile3-content">
            <p>Membership</p>
            <ul>
              <li>Karnataka Medical Council</li>
              <li>Indian Association of Dermatologists, Venereologists and Leprologists</li>
            </ul>
            <p>Medical Council ID (License)</p>
            <ul>
              <li>KMC - 35678</li>
            </ul>
          </div>
        </div>
        <div className="profile4-section">
          <h2>Education</h2>
          <div className="education-item">
            <span className="education-icon">📘<br/><br/>📘</span>
            <div>
              <p><strong>{doctor.edu1}</strong></p>
              <p>{doctor.clg1}</p>
              <p><strong>{doctor.edu2}</strong></p>
              <p>{doctor.clg2}</p>
            </div>
          </div>
        </div>
        <div className="profile5-section">
          <h2>Specializations</h2>
          <div className="specializations">
            {specializations.map(spec => (
              <span key={spec} className="specialization">{spec}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
