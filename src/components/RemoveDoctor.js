import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import RemoveDoctorModal5 from './RemoveDoctorModal';
import './RemoveDoctor.css';
import defaultDoctorImage from '../assets/1.jpg';

const SearchResults5 = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const conditionQuery = query.get('condition') || '';
  const cityQuery = query.get('city') || '';

  const [providers5, setProviders5] = useState([]);
  const [searchTerm5, setSearchTerm5] = useState('');
  const [isModalOpen5, setIsModalOpen5] = useState(false);
  const [selectedProviderId5, setSelectedProviderId5] = useState(null);

  useEffect(() => {
    // Fetch doctors data from backend
    const fetchDoctors = async () => {
      try {
        const response = await fetch('http://localhost:8080/admin/getDoc');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProviders5(data);
      } catch (error) {
        console.error('Error fetching doctor data:', error);
      }
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    const filteredProviders5 = providers5.filter(provider =>
      (provider.doc_spec.toLowerCase().includes(conditionQuery.toLowerCase()) || !conditionQuery) &&
      (provider.hospital.toLowerCase().includes(cityQuery.toLowerCase()) || !cityQuery) &&
      (provider.doc_name.toLowerCase().includes(searchTerm5.toLowerCase()) || !searchTerm5)
    );
    setProviders5(filteredProviders5);
  }, [conditionQuery, cityQuery, searchTerm5]); // Removed providers5 from dependency array

  const handleSearchChange5 = (event) => {
    setSearchTerm5(event.target.value);
  };

  const openModal5 = (id) => {
    setSelectedProviderId5(id);
    setIsModalOpen5(true);
  };

  const closeModal5 = () => {
    setIsModalOpen5(false);
  };

  const confirmRemove5 = async () => {
    try {
      await fetch(`http://localhost:8080/admin/delete/${selectedProviderId5}`, {
        method: 'DELETE',
      });
      // Remove the doctor from the local state immediately
      setProviders5(providers5.filter(provider => provider.id !== selectedProviderId5));
      closeModal5();
    } catch (error) {
      console.error('Error deleting doctor:', error);
    }
  };

  return (
    <div className="search-results5">
      <div className="header5">
        <h1>Find a Doctor</h1>
        <div className="search-bar5">
          <input
            type="text"
            placeholder="Search by doctor"
            value={searchTerm5}
            onChange={handleSearchChange5}
          />
          <button onClick={() => setSearchTerm5(searchTerm5)}>Search</button>
        </div>
      </div>

      <div className="results5">
        {providers5.length > 0 ? (
          providers5.map((provider) => (
            <div className="provider15" key={provider.id}>
              <img src={provider.img ? `data:image/jpeg;base64,${provider.img}` : defaultDoctorImage} alt={provider.doc_name} className="provider1-image5" />
              <div className="provider1-info5">
                <h2>{provider.doc_name}</h2>
                <p>{provider.doc_edu} {provider.doc_spec}</p>
                <button className="remove5" onClick={() => openModal5(provider.id)}>Remove</button>
              </div>
            </div>
          ))
        ) : (
          <p>No providers found.</p>
        )}
      </div>

      <RemoveDoctorModal5
        isOpen={isModalOpen5}
        onClose={closeModal5}
        onConfirm={confirmRemove5}
      />
    </div>
  );
};

export default SearchResults5;
