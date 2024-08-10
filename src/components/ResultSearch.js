import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './ReslutSearch.css'
import doctorImage1 from '../assets/1.jpg';
import doctorImage2 from '../assets/2.jpg';
import { FaStar } from 'react-icons/fa';

const ResultSearch = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const conditionQuery = query.get('condition') || '';
  const cityQuery = query.get('city') || '';

  const [providers, setProviders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const allProviders = [
    {
      id: 1,
      name: 'Dr. Raj Kumar',
      specialty: 'Dentist',
      experience: '15 years of Experience',
      qualifications: 'MBBS, Dental',
      city: 'Gandhipuram',
      consultationFee: '₹ 299/-',
      imageUrl: doctorImage1,
      rating: 4.6,
      reviews: 414,
    },
    {
      id: 2,
      name: 'Dr. Arun Kumar',
      specialty: 'Dentist',
      experience: '8 years of Experience',
      qualifications: 'MBBS, Dental - General Medicine',
      city: 'Gandhipuram',
      consultationFee: '₹ 499/-',
      imageUrl: doctorImage2,
      rating: 4.5,
      reviews: 189,
    },
  ];

  useEffect(() => {
    const filteredProviders = allProviders.filter(provider =>
      (provider.specialty.toLowerCase().includes(conditionQuery.toLowerCase()) || !conditionQuery) &&
      (provider.city.toLowerCase().includes(cityQuery.toLowerCase()) || !cityQuery) &&
      (provider.name.toLowerCase().includes(searchTerm.toLowerCase()) || !searchTerm)
    );
    setProviders(filteredProviders);
  }, [conditionQuery, cityQuery, searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
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
              <img src={provider.imageUrl} alt={provider.name} className="provider207-image" />
              <Link to={`/provider/${provider.id}`} className="view1-profile">View Profile</Link>
              <div className="provider207-info">
                <h2>{provider.name}</h2>
                <p className="experience">{provider.experience}</p>
                <p className="qualifications">{provider.qualifications}</p>
                <p className="city">{provider.city}</p>
                <hr className="separator" />
                <div className="rating">
                  <FaStar className="star-icon" /> {provider.rating} • {provider.reviews} Patient Stories
                </div>
              </div>
              <div className="consultation-fee">
                <div className="consultation-fee-container">
                  <span className="fee-label">Consultation Fee:</span>
                  <span className="amount">{provider.consultationFee}</span>
                </div>
                <button className="consult-now">Consult Now</button>
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
