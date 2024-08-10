import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './EditDoctor.css';
import defaultDoctorImage from '../assets/1.jpg';
import EditPopup from './EditPopup';

const EditDoctor = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const conditionQuery = query.get('condition') || '';
  const cityQuery = query.get('city') || '';

  const [providersEdit, setProvidersEdit] = useState([]);
  const [searchTermEdit, setSearchTermEdit] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [dataChanged, setDataChanged] = useState(false); // State to trigger re-fetch

  const fetchDoctors = async () => {
    try {
      const response = await fetch('http://localhost:8080/admin/getDoc');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setProvidersEdit(data);
    } catch (error) {
      console.error('Error fetching doctor data:', error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, [dataChanged]); // Re-fetch data when dataChanged state is true

  useEffect(() => {
    const filteredProvidersEdit = providersEdit.filter(provider =>
      (provider.doc_spec.toLowerCase().includes(conditionQuery.toLowerCase()) || !conditionQuery) &&
      (provider.hospital.toLowerCase().includes(cityQuery.toLowerCase()) || !cityQuery) &&
      (provider.doc_name.toLowerCase().includes(searchTermEdit.toLowerCase()) || !searchTermEdit)
    );
    setProvidersEdit(filteredProvidersEdit);
  }, [conditionQuery, cityQuery, searchTermEdit]);

  const handleSearchChangeEdit = (event) => {
    setSearchTermEdit(event.target.value);
  };

  const handleEditClick = (doctor) => {
    setSelectedDoctor(doctor);
    setShowEditPopup(true);
  };

  const handleClosePopup = () => {
    setShowEditPopup(false);
    setSelectedDoctor(null);
  };

  const handleSave = (updatedDoctor) => {
    // Handle save logic, e.g., send updatedDoctor to backend
    console.log('Updated doctor:', updatedDoctor);
    handleClosePopup();

    // Trigger re-fetch of data
    setDataChanged(prev => !prev);
  };

  return (
    <div className="search-results-edit">
      <div className="header-edit">
        <h1>Find a Doctor</h1>
        <div className="search-bar-edit">
          <input
            type="text"
            placeholder="Search by doctor"
            value={searchTermEdit}
            onChange={handleSearchChangeEdit}
          />
          <button onClick={() => setSearchTermEdit(searchTermEdit)}>Search</button>
        </div>
      </div>

      <div className="results-edit">
        {providersEdit.length > 0 ? (
          providersEdit.map((provider) => (
            <div className="provider-edit" key={provider.id}>
              <img src={provider.img ? `data:image/jpeg;base64,${provider.img}` : defaultDoctorImage} alt={provider.doc_name} className="provider-image-edit" />
              <div className="provider-info-edit">
                <h2>{provider.doc_name}</h2>
                <div className="edit-button-container">
                  <button className="edit-button-edit" onClick={() => handleEditClick(provider)}>Edit</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No providers found.</p>
        )}
      </div>

      {showEditPopup && selectedDoctor && (
        <EditPopup doctor={selectedDoctor} onClose={handleClosePopup} onSave={handleSave} />
      )}
    </div>
  );
};

export default EditDoctor;
