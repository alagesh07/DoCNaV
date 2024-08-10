import React from 'react';
import './Footer.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import facebook from 'C:\\Users\\Annapoorani\\Desktop\\React\\proj1\\src\\assets\\facebook.jpg';
import twitter from 'C:\\Users\\Annapoorani\\Desktop\\React\\proj1\\src\\assets\\twitter.png';
import insta from 'C:\\Users\\Annapoorani\\Desktop\\React\\proj1\\src\\assets\\insta.png';
import blog1 from 'C:\\Users\\Annapoorani\\Desktop\\React\\proj1\\src\\assets\\foot1.png';
import blog2 from 'C:\\Users\\Annapoorani\\Desktop\\React\\proj1\\src\\assets\\foot2.png';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-section about-us">
        <h3>About Us</h3>
        <p>Our expert team offers innovative solutions and actionable insights to enhance healthcare delivery and improve patient outcomes. Partner with us to navigate the complexities of the medical field with confidence.</p>
        <div className="social-icons">
          <a href="#" target="_blank" rel="noopener noreferrer">
            <FaFacebookF className="social-icon" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="social-icon" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="social-icon" />
          </a>
        </div>
      </div>
      <div className="footer-section recent-blog">
        <h3>Recent Blog</h3>
        <div className="blog-post">
          <img src={blog1} alt="Blog post 1" />
          <p>Advancements in Telemedicine: Jul 22, 2024</p>
        </div>
        <div className="blog-post">
          <img src={blog2} alt="Blog post 2" />
          <p>Optimizing Patient Care: Dec 25, 2023</p>
        </div>
      </div>
      <div className="footer-section contact2">
        <h3>Contact Us</h3>
        <ul>
          <li><FaMapMarkerAlt /> 456 Health St, MedCity, Coimbatore</li>
          <li><FaPhone /> +91 76039 68717</li>
          <li><FaEnvelope /> HealthNav@gmail.com</li>
        </ul>
      </div>
      <div className="footer-section additional-info">
        <h3>Medical Consulting</h3>
        <p>We provide comprehensive medical consulting services to healthcare providers, ensuring the highest standards of patient care. Our consultants are experts in various medical fields and are dedicated to helping you optimize your practice and improve patient outcomes.</p>
      </div>
    </footer>
  );
}

export default Footer;
