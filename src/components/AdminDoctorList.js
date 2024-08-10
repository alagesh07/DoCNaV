import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './AdminDoctorList.css';
import axios from 'axios';

const AdminDoctorList = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const conditionQuery = query.get('condition') || '';
  const cityQuery = query.get('city') || '';

  const [providers, setProviders] = useState([]);
  const [filteredProviders, setFilteredProviders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await axios.get('http://localhost:8080/admin/getDoc');
        setProviders(response.data);
        setFilteredProviders(response.data); // Initialize filteredProviders with fetched data
      } catch (error) {
        console.error('Error fetching providers:', error);
      }
    };

    fetchProviders();
  }, []);

  useEffect(() => {
    const filterProviders = () => {
      const filtered = providers.filter(provider =>
        (provider.doc_spec.toLowerCase().includes(conditionQuery.toLowerCase()) || !conditionQuery) &&
        (provider.hospital.toLowerCase().includes(cityQuery.toLowerCase()) || !cityQuery) &&
        (provider.doc_name.toLowerCase().includes(searchTerm.toLowerCase()) || !searchTerm)
      );
      setFilteredProviders(filtered);
    };

    filterProviders();
  }, [conditionQuery, cityQuery, searchTerm, providers]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="search-results">
      <div className="header">
        <h1>Doctors List</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by doctor name"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button onClick={() => setSearchTerm(searchTerm)}>Search</button>
        </div>
      </div>

      <div className="results">
        {filteredProviders.length > 0 ? (
          filteredProviders.map((provider) => (
            <div className="provider" key={provider.id}>
              <img src={`data:image/jpeg;base64,${provider.img}`} alt={provider.doc_name} />
              <div className="provider-info">
                <h2>{provider.doc_name}</h2>
                <p className="label">Experience: <span>{provider.doc_exp} years</span></p>
                <p className="label">Qualifications: <span>{provider.doc_edu} {provider.doc_spec}</span></p>
                <p className="label">Hospital: <span>{provider.hospital}</span></p>
              </div>
            </div>
          ))
        ) : (
          <p>No providers found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDoctorList;
