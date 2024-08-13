import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import './AdminHomePage.css';

// Register Chart.js components
ChartJS.register(
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const AdminHomePage = () => {
    const [doctorCount, setDoctorCount] = useState(0);
    const [userCount, setUserCount] = useState(0);

    useEffect(() => {
        // Fetch counts from the backend
        axios.get('http://localhost:8080/admin/doctor-count')
            .then(response => setDoctorCount(response.data))
            .catch(error => console.error('Error fetching doctor count:', error));
        
        axios.get('http://localhost:8080/admin/user-count')
            .then(response => setUserCount(response.data))
            .catch(error => console.error('Error fetching user count:', error));
    }, []);

    // Data for Pie Chart
    const pieData = {
        labels: ['Doctors', 'Users'],
        datasets: [
            {
                label: 'Distribution',
                data: [doctorCount, userCount],
                backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
                borderWidth: 1,
                // Add animation to the chart
                animation: {
                    duration: 2000, // 2 seconds
                    easing: 'easeOutBounce'
                }
            },
        ],
    };

    return (
        <div className="admin-home-page">
            <h2>Admin Home Page</h2>
            <Pie data={pieData} />
            <div className="stats-item">
                <h3>Statistics</h3>
                <p><strong>Doctors:</strong> {doctorCount}</p>
                <p><strong>Users:</strong> {userCount}</p>
            </div>
        </div>
    );
};

export default AdminHomePage;
