import React, { useState, useRef } from 'react';
import './AddDoctor.css';
import axios from 'axios';
import AvatarEditor from 'react-avatar-editor';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const AddDoctor = () => {
  const [doctorName, setDoctorName] = useState('');
  const [education, setEducation] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [experience, setExperience] = useState('');
  const [hospitalAddress, setHospitalAddress] = useState('');
  const [image, setImage] = useState(null);
  const [adjustedBlob, setAdjustedBlob] = useState(null); // For storing the adjusted image blob
  const editorRef = useRef(null);
  const fileInputRef = useRef(null); // Reference for the file input field
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
    setIsModalOpen(true);
  };

  const handleConfirmImage = () => {
    if (editorRef.current) {
      editorRef.current.getImage().toBlob((blob) => {
        setAdjustedBlob(blob); // Store the adjusted image blob
        setIsModalOpen(false);
      });
    } else {
      setMessage('Error processing image. Please try again.');
      setIsModalOpen(false);
    }
  };

  const handleAddDoctor = async () => {
    if (!adjustedBlob) {
      setMessage('Please adjust the image and confirm before submitting.');
      return;
    }

    const formData = new FormData();
    formData.append('doc_name', doctorName);
    formData.append('doc_edu', education);
    formData.append('doc_spec', specialization);
    formData.append('doc_exp', experience);
    formData.append('hospital', hospitalAddress);
    formData.append('img', adjustedBlob);

    try {
      console.log('Sending data to backend:', formData);
      const response = await axios.post('http://localhost:8080/admin/addDoc', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('New Doctor Added:', response.data);
      setMessage('Doctor added successfully!');
      // Clear form fields
      setDoctorName('');
      setEducation('');
      setSpecialization('');
      setExperience('');
      setHospitalAddress('');
      setImage(null);
      setAdjustedBlob(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = ''; // Reset file input field
      }
    } catch (error) {
      console.error('Error adding doctor:', error);
      setMessage('Error adding doctor. Please try again.');
    }
  };

  return (
    <div className="add-doctor-container">
      <h2>Add Doctor Details</h2>
      {message && <p>{message}</p>}
      <form>
        <div className="form-group">
          <label>Doctor Name:</label>
          <input
            type="text"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
            placeholder="Enter doctor's name"
          />
        </div>

        <div className="form-group">
          <label>Doctor Education:</label>
          <input
            type="text"
            value={education}
            onChange={(e) => setEducation(e.target.value)}
            placeholder="Enter doctor's education"
          />
        </div>

        <div className="form-group">
          <label>Doctor Specialization:</label>
          <input
            type="text"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            placeholder="Enter doctor's specialization"
          />
        </div>

        <div className="form-group">
          <label>Doctor Experience (Years):</label>
          <input
            type="number"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            placeholder="Enter years of experience"
          />
        </div><br/>

        <div className="form-group">
          <label>Hospital Address:</label>
          <input
            type="text"
            value={hospitalAddress}
            onChange={(e) => setHospitalAddress(e.target.value)}
            placeholder="Enter hospital address"
          />
        </div>

        <div className="form-group">
          <label>Doctor Image:</label>
          <input
            type="file"
            onChange={handleImageChange}
            ref={fileInputRef} // Attach ref to the file input
          />
        </div>
        <button type="button" onClick={handleAddDoctor}>Add Doctor</button>
      </form>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Adjust Image"
        className="Modal"
        overlayClassName="Overlay"
      >
        <h2>Adjust Image</h2>
        {image && (
          <AvatarEditor
            ref={editorRef}
            image={image}
            width={250}
            height={250}
            border={50}
            borderRadius={125}
            color={[255, 255, 255, 0.6]} // RGBA
            scale={1.2}
            rotate={0}
          />
        )}
        <button onClick={handleConfirmImage}>Confirm</button>
      </Modal>
    </div>
  );
};

export default AddDoctor;
