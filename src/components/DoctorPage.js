import React from 'react';
import { useLocation } from 'react-router-dom';
import './DoctorPage.css';

const DoctorPage = () => {
    const location = useLocation();
    const { date, time, problem, patientName } = location.state || {};

    if (!date || !time || !problem || !patientName) {
        return <p>No appointment details available.</p>;
    }

    return (
        <div className="doctor-page-container">
            <h1>Appointment Details</h1>
            <div className="appointment-summary">
                <h2>Appointment Summary</h2>
                <p><strong>Date:</strong> {date.date} ({date.day})</p>
                <p><strong>Time:</strong> {time}</p>
                <p><strong>Problem:</strong> {problem}</p>
                <p><strong>Patient Name:</strong> {patientName}</p>
            </div>
            <div className="additional-info">
                <h2>Additional Information</h2>
                <p>If you need to make any changes or have additional questions, please contact us.</p>
                <button onClick={() => window.history.back()}>Go Back</button>
            </div>
        </div>
    );
};

export default DoctorPage;
