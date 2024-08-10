import React, { useState, useEffect, useRef } from 'react';
import './EditPopup.css';
import defaultDoctorImage from '../assets/1.jpg';
import AvatarEditor from 'react-avatar-editor';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const EditPopup = ({ doctor, onClose, onSave }) => {
  const [updatedDoctor, setUpdatedDoctor] = useState({ ...doctor });
  const [imgFile, setImgFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [adjustedBlob, setAdjustedBlob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const editorRef = useRef(null);

  useEffect(() => {
    if (updatedDoctor.img) {
      setImagePreview(`data:image/jpeg;base64,${updatedDoctor.img}`);
    } else {
      setImagePreview(defaultDoctorImage);
    }
  }, [updatedDoctor.img]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedDoctor(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImgFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setIsModalOpen(true);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleConfirmImage = () => {
    if (editorRef.current) {
      editorRef.current.getImage().toBlob((blob) => {
        setAdjustedBlob(blob);
        setIsModalOpen(false);
      });
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      Object.keys(updatedDoctor).forEach(key => {
        formData.append(key, updatedDoctor[key]);
      });
      if (adjustedBlob) {
        formData.append('img', adjustedBlob);
      } else if (imgFile) {
        formData.append('img', imgFile);
      }
      const response = await fetch(`http://localhost:8080/admin/updateDoc/${doctor.id}`, {
        method: 'PUT',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to save changes');
      }
      const updatedData = await response.json();
      onSave(updatedData);
      onClose();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="close-button" onClick={onClose}>x</div>
        <div className="popup-container">
          <div className="popup-doctor-details">
            <img
              src={imagePreview}
              alt={updatedDoctor.doc_name}
              className="popup-doctor-image"
            />
            <h2>{updatedDoctor.doc_name}</h2>
            <p>Education: {updatedDoctor.doc_edu}</p>
            <p>Specialization: {updatedDoctor.doc_spec}</p>
            <p>Experience: {updatedDoctor.doc_exp}</p>
            <p>Hospital: {updatedDoctor.hospital}</p>
          </div>
          <div className="popup-edit-form">
            <h2>Edit Doctor Details</h2>
            <div className="form-group">
              <label>Doctor Name:</label>
              <input
                type="text"
                name="doc_name"
                value={updatedDoctor.doc_name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Education:</label>
              <input
                type="text"
                name="doc_edu"
                value={updatedDoctor.doc_edu}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Specialization:</label>
              <input
                type="text"
                name="doc_spec"
                value={updatedDoctor.doc_spec}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Experience:</label>
              <input
                type="text"
                name="doc_exp"
                value={updatedDoctor.doc_exp}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Hospital Address:</label>
              <input
                type="text"
                name="hospital"
                value={updatedDoctor.hospital}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Profile Image:</label>
              <input
                type="file"
                onChange={handleImageChange}
              />
            </div>
            <button className="save-button" onClick={handleSave}>Save</button>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Adjust Image"
        className="Modal"
        overlayClassName="Overlay"
      >
        <h2>Adjust Image</h2>
        {imagePreview && (
          <AvatarEditor
            ref={editorRef}
            image={imagePreview}
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

export default EditPopup;
