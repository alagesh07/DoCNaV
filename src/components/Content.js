import React from 'react';
import './Content.css';
import doctorVideo from '../assets/home.mp4'; // Ensure you have this video in your project
import { FaHospital, FaClinicMedical, FaFlask, FaPrescriptionBottle, FaMapMarkedAlt, FaUserMd } from 'react-icons/fa'; // Import React icons

const Content = () => {
    return (
        <div className="content">
            <div className="text-content">
                <h2>Why Choose Us?</h2>
                <p>
                    Established by Dr Alagesh Venkat in 2024, HealthNav has a robust presence across the healthcare ecosystem. 
                    From routine wellness & preventive health care to innovative life-saving treatments and diagnostic services, 
                    HealthNav Hospitals has touched more than 200 million lives from over 120 countries.
                </p>
                <div className="statistics">
                    <div className="stat">
                        <div className="icon"><FaHospital size={24} color="#3498db" /></div>
                        <div className="number">73+</div>
                        <div className="description">Largest private healthcare network of Hospitals</div>
                    </div>
                    <div className="stat">
                        <div className="icon"><FaClinicMedical size={24} color="#3498db" /></div>
                        <div className="number">400+</div>
                        <div className="description">Largest private network of clinics across India</div>
                    </div>
                    <div className="stat">
                        <div className="icon"><FaMapMarkedAlt size={24} color="#3498db" /></div>
                        <div className="number">10,000+</div>
                        <div className="description">Pin codes served across India</div>
                    </div>
                    <div className="stat">
                        <div className="icon"><FaUserMd size={24} color="#3498db" /></div>
                        <div className="number">11,000+</div>
                        <div className="description">Doctors</div>
                    </div>
                </div>
            </div>
            <div className="video">
                <video src={doctorVideo} autoPlay muted loop />
            </div>
        </div>
    );
};

export default Content;
