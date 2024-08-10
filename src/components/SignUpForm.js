import React, { useState } from 'react';
import axios from 'axios';
import './SignUpForm.css';
import googleIcon from '../assets/google.png'; // Adjust path if needed
import appleIcon from '../assets/apple-logo.png'; // Adjust path if needed

const SignUpForm = ({ closeSignUpForm, onSignUpSuccess, onSwitchToLogin }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        userId: '',
        name: '',
        email: '',
        password: '',
        dob: '',
        phone: '',
        sex: '',
    });
    const [error, setError] = useState('');

    const validateUserId = (userId) => {
        if (userId.length === 0) {
            return 'User ID is required.';
        }
        if (userId.length > 30) {
            return 'User ID must be between 1 and 30 characters long.';
        }
        if (!/^[a-zA-Z0-9._]+$/.test(userId)) {
            return 'User ID can only contain letters, numbers, underscores, and periods.';
        }
        if (userId.startsWith('.') || userId.endsWith('.')) {
            return 'User ID cannot start or end with a period.';
        }
        if (userId.includes('..')) {
            return 'User ID cannot contain consecutive periods.';
        }
        return '';
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmitStep1 = (e) => {
        e.preventDefault();
        const userIdError = validateUserId(formData.userId);
        if (userIdError) {
            setError(userIdError);
            return;
        }
        setError('');
        setStep(2);
    };

    const handleSubmitStep2 = async (e) => {
        e.preventDefault();
        console.log('Submitting data:', formData);
        try {
            const response = await axios.post('http://localhost:8080/DocNav/signup', formData);
            console.log('User created:', response.data);
            if (typeof onSignUpSuccess === 'function') {
                onSignUpSuccess(); // Call the callback to show the login form
            }
            if (typeof closeSignUpForm === 'function') {
                closeSignUpForm(); // Close the signup form
            }
        } catch (error) {
            console.error('Error creating user:', error);
            setError('Error creating user. Please try again.');
        }
    };

    const calculateAge = (dob) => {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    return (
        <div className="signup-form">
            <div className="close0" onClick={closeSignUpForm}>✖</div>

            {step === 1 && (
                <>
                    <h2>Create an account</h2>
                    <form onSubmit={handleSubmitStep1}>
                        <input
                            type="text"
                            name="userId"
                            placeholder="User Id"
                            value={formData.userId}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <button type="submit" className="continue-btn">Continue</button>
                    </form>
                    {error && <p className="error-message">{error}</p>}
                    <div className="or">or</div>
                    <div className="social-login">
                        <img src={googleIcon} alt="Google icon" className="social1-icon" />
                        <img src={appleIcon} alt="Apple icon" className="social-icon" />
                    </div>
                    <div className="login-link">
                        <a href="#" onClick={onSwitchToLogin}>Already have an account? Log in</a>
                    </div>
                </>
            )}

            {step === 2 && (
                <>
                    <h2>Additional Details</h2>
                    <form onSubmit={handleSubmitStep2}>
                        <input
                            type="date"
                            name="dob"
                            placeholder="Date of Birth"
                            value={formData.dob}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="age"
                            placeholder="Age"
                            value={formData.dob ? calculateAge(formData.dob) : ''}
                            readOnly
                        />
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Phone No."
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                        <div className="radio-group">
                            <label>
                                <input
                                    type="radio"
                                    name="sex"
                                    value="Male"
                                    checked={formData.sex === 'Male'}
                                    onChange={handleChange}
                                    required
                                />
                                Male
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="sex"
                                    value="Female"
                                    checked={formData.sex === 'Female'}
                                    onChange={handleChange}
                                    required
                                />
                                Female
                            </label>
                        </div>
                        <button type="submit" className="continue-btn">Create Account</button>
                    </form>
                    {error && <p className="error-message">{error}</p>}
                </>
            )}
        </div>
    );
};

export default SignUpForm;
