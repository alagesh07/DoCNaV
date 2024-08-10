import React from 'react';
import { useLocation } from 'react-router-dom';
import './PaymentPage.css';

const PaymentPage = () => {
    const location = useLocation();
    const { date, time, problem, patientName } = location.state || {};

    const appointmentDate = date || { date: 'N/A', day: 'N/A' };
    const appointmentTime = time || 'N/A';
    const appointmentProblem = problem || 'N/A';
    const appointmentPatientName = patientName || 'N/A';

    return (
        <div className="payment-container">
            <h1>Payment Details</h1>
            <div className="summary-card">
                <h2>Appointment Summary</h2>
                <p><strong>Date:</strong> {appointmentDate.date} ({appointmentDate.day})</p>
                <p><strong>Time:</strong> {appointmentTime}</p>
                <p><strong>Problem:</strong> {appointmentProblem}</p>
                <p><strong>Patient Name:</strong> {appointmentPatientName}</p>
                <p><strong>Amount:</strong> $100</p> {/* Example amount */}
            </div>
            <form className="payment-form">
                <h2>Payment Information</h2>
                <div className="card-container">
                    <div className="form-group">
                        <label htmlFor="cardNumber">Card number</label>
                        <input type="text" id="cardNumber" placeholder="xxxx xxxx xxxx xxxx" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="expiryDate">Month and year</label>
                        <input type="text" id="expiryDate" placeholder="MM / YY" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cvv">CVV code</label>
                        <input type='password' id="cvv" placeholder="****" required />
                    </div>
                </div>
                <button type="submit">Pay Now</button>
            </form>
        </div>
    );
};

export default PaymentPage;
