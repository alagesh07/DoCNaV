import React, { useState, useEffect } from 'react';
import './UserProfile.css';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem('userId');
  console.log('Stored userId:', userId);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        setError('User ID not found');
        setLoading(false);
        return;
      }

      try {
        console.log(`Fetching data for userId: ${userId}`);

        const response = await fetch(`http://localhost:8080/DocNav/user-profile?userId=${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include if using JWT or similar token
          },
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched data:', data);
        setUser(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user data found</div>;

  return (
    <div className="user-profile">
      <h1>User Profile</h1>
      <p><strong>ID:</strong> {user.id}</p>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Date of Birth:</strong> {user.dob}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Sex:</strong> {user.sex}</p>
    </div>
  );
};

export default UserProfile;
