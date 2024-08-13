import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ResultSearch.css';

const ResultSearch = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate
  const query = new URLSearchParams(location.search);
  
  const conditionQuery = query.get('condition') || '';
  const cityQuery = query.get('city') || '';

  const [providers, setProviders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await axios.get('http://localhost:8080/admin/getDoc1', {
          params: {
            docCon: conditionQuery,
            hospital: cityQuery,
          },
        });

        const filteredProviders = response.data.filter(provider =>
          (provider.doc_name.toLowerCase().includes(searchTerm.toLowerCase()) || !searchTerm)
        );

        setProviders(filteredProviders);
      } catch (error) {
        console.error('Error fetching providers:', error);
      }
    };

    fetchProviders();
  }, [conditionQuery, cityQuery, searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleConsultNowClick = (id) => {
    navigate(`/book`, { state: { doctorId: id } }); // Pass the doctor's ID to the Book page
  };

  return (
    <div className="search-results207">
      <div className="header">
        <h1>Find a Doctor</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by doctor"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button onClick={() => setSearchTerm(searchTerm)}>Search</button>
        </div> 
      </div>

      <div className="results207">
        {providers.length > 0 ? (
          providers.map((provider) => (
            <div className="provider207" key={provider.id}>
              <img src={`data:image/jpeg;base64,${provider.img}`} alt={provider.doc_name} className="provider207-image" />
              <Link to={`/provider/${provider.id}`} className="view1-profile">View Profile</Link>
              <div className="provider207-info">
                <p className="Name-doc">{provider.doc_name}</p>
                <p className="experience">{provider.doc_exp} years of experience</p>
                <p className="qualifications">{provider.doc_edu}, {provider.doc_spec}</p>
                <p className="city">{provider.clinic_add}</p>
                <hr className="separator" />
              </div>
              <div className="consultation-fee">
                <div className="consultation-fee-container">
                  <span className="fee-label">Consultation Fee:</span>
                  <span className="amount">₹ {provider.fee}</span>
                </div>
                <button className="consult-now" onClick={() => handleConsultNowClick(provider.id)}>Consult Now</button>
              </div>
            </div>
          ))
        ) : (
          <p>No providers found.</p>
        )}
      </div>

      <div className="map">
        <iframe
          title="Coimbatore Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.496009856336!2d76.95115187480986!3d11.001811489705227!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8599bc43c6b8f%3A0x69f8a9dbd1e74295!2sCoimbatore%2C%20Tamil%20Nadu%2C%20India!5e0!3m2!1sen!2sus!4v1653046783176!5m2!1sen!2sus"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default ResultSearch;
