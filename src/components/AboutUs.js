import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us1">
      <h1>About Us</h1>
      <section>
        <h2>Our Mission</h2>
        <p>HealthNav is dedicated to transforming healthcare access by connecting patients with top-rated doctors and healthcare providers. Our mission is to streamline the process of finding and booking medical appointments, ensuring a seamless and efficient experience for all users.</p>
      </section>
      <section>
        <h2>Who We Are</h2>
        <p>We are a team of healthcare and technology experts committed to improving patient care through innovation. Our platform offers a comprehensive directory of healthcare professionals, making it easy for users to find the right provider for their needs.</p>
      </section>
      <section className='contact'>
        <h2>Why Choose Us</h2>
        <ul>
          <li>Comprehensive Directory: Access a vast network of healthcare providers.</li>
          <li>Easy Booking: Schedule appointments with just a few clicks.</li>
          <li>Verified Reviews: Make informed decisions with real patient feedback.</li>
          <li>Secure and Private: Your data is protected with top-notch security measures.</li>
        </ul>
      </section>
      <section>
        <h2>Our Values</h2>
        <p>We prioritize transparency, trust, and excellence. Our goal is to provide a reliable platform that not only connects patients with healthcare providers but also fosters a supportive and informative community.</p>
      </section>
      <section className="contact-info">
        <h2>Contact Us</h2>
        <p>If you have any questions or require assistance, please reach out to us at <a href="mailto:support@healthnav.com">support@healthnav.com</a>.</p>
      </section>
    </div>
  );
};

export default AboutUs;
