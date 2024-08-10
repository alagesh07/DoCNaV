import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './AppointmentPage.css';
import './DoctorProfile.css';

const AppointmentPage = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [showOptions, setShowOptions] = useState(false);
    const [showMoreDates, setShowMoreDates] = useState(false);
    const [patientName, setPatientName] = useState('');

    const navigate = useNavigate(); // Initialize useNavigate

    // Generate dates for scheduling
    const generateDates = (numDays) => {
        const today = new Date();
        const datesArray = [];

        for (let i = 0; i < numDays; i++) {
            const futureDate = new Date(today);
            futureDate.setDate(today.getDate() + i);

            const day = futureDate.toLocaleDateString('en-US', { weekday: 'short' });
            const date = futureDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

            datesArray.push({ day, date, available: true });
        }

        return datesArray;
    };

    const dates = generateDates(showMoreDates ? 29 : 14); // 29 days if "View more" is clicked

    const teethProblems = [
        'Wisdom Tooth Problem',
        'Cavity Filling',
        'Teeth Cleaning',
        'Tooth Extraction',
        'Root Canal Treatment',
        'Braces Consultation',
        'Gum Disease Treatment',
        'Teeth Whitening',
        'Dental Implants',
        'Veneers Consultation'
    ];

    const times = [
        '09:00 AM',
        '10:00 AM',
        '11:00 AM',
        '12:00 PM',
        '01:00 PM',
        '02:00 PM',
        '03:00 PM',
        '04:00 PM',
        '05:00 PM'
    ];

    const handleDateClick = (index) => {
        setSelectedDate(dates[index]);
    };

    const handleTimeClick = (time) => {
        setSelectedTime(time);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setShowOptions(true);
    };

    const handleOptionClick = (option) => {
        setSearchTerm(option);
        setShowOptions(false);
    };

    const handlePatientNameChange = (e) => {
        setPatientName(e.target.value);
    };

    const isSelected = (date) => {
        return selectedDate && date.date === selectedDate.date;
    };

    const handleBookNow = () => {
        navigate('/payment', {
            state: {
                date: selectedDate,
                time: selectedTime,
                problem: searchTerm, // Assuming searchTerm is the problem description
                patientName: patientName
            }
        });
    };

    return (
        <div className="appointment-container">
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
            </div>

            <h1>Book an appointment for free</h1>
            <p>The office partners with Zocdoc to schedule appointments</p>
            
            <div className="scheduling-details">
                <label>Scheduling details</label>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search for a problem"
                />
                {showOptions && (
                    <ul className="options-list">
                        {teethProblems
                            .filter(problem => problem.toLowerCase().includes(searchTerm.toLowerCase()))
                            .map((problem, index) => (
                                <li key={index} onClick={() => handleOptionClick(problem)}>
                                    {problem}
                                </li>
                            ))}
                    </ul>
                )}
            </div>

            <div className="appointment-dates">
                <p>Today, {dates[0].date} - {dates[dates.length - 1].date}</p>
                <div className="dates-grid">
                    {dates.map((date, index) => (
                        <div
                            key={index}
                            className={`date ${date.available ? 'available' : ''} ${isSelected(date) ? 'selected' : ''}`}
                            onClick={() => handleDateClick(index)}
                        >
                            {date.date}<br />{date.day}
                        </div>
                    ))}
                </div>
                <button onClick={() => setShowMoreDates(!showMoreDates)} className='show-more'>
                    {showMoreDates ? 'View less availability' : 'View more availability'}
                </button>
            </div>

            {selectedDate && (
                <div className="time-selection">
                    <label>Select a time slot:</label>
                    <div className="times-grid">
                        {times.map((time, index) => (
                            <div
                                key={index}
                                className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                                onClick={() => handleTimeClick(time)}
                            >
                                {time}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="patient-name">
                <label>Patient Name:</label>
                <input
                    type="text"
                    value={patientName}
                    onChange={handlePatientNameChange}
                    placeholder="Enter patient name"
                />
            </div>

            <div className="selected-details">
                {selectedDate && selectedTime && patientName && (
                    <div className="details-card">
                        <h2>Appointment Summary</h2>
                        <p><strong>Date:</strong> {selectedDate.date} ({selectedDate.day})</p>
                        <p><strong>Time:</strong> {selectedTime}</p>
                        <p><strong>Patient Name:</strong> {patientName}</p>
                    </div>
                )}
            </div>

            {selectedDate && selectedTime && patientName && (
                <div className="confirm-appointment">
                    <button onClick={handleBookNow}>Book Now</button>
                </div>
            )}

            <p>Have a question or need help booking an appointment? Call <a href="tel:8559623622">855-962-3622</a></p>
        </div>
    );
};

export default AppointmentPage;
