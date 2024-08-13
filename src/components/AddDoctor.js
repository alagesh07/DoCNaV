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
  const [hospitalArea, setHospitalArea] = useState('');
  const [fee, setHospitalFee] = useState('');
  const [languages, setLanguages] = useState('');
  const [clinicAddress, setClinicAddress] = useState('');
  const [aboutDoctor, setAboutDoctor] = useState('');
  const [college1, setCollege1] = useState('');
  const [college2, setCollege2] = useState('');
  const [education1, setEducation1] = useState('');
  const [education2, setEducation2] = useState('');
  const [specs, setSpecs] = useState('');
  const [condition, setCondition] = useState(''); // Added condition state
  const [image, setImage] = useState(null);
  const [adjustedBlob, setAdjustedBlob] = useState(null); 
  const editorRef = useRef(null);
  const fileInputRef = useRef(null); 
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
    setIsModalOpen(true);
  };

  const handleConfirmImage = () => {
    if (editorRef.current) {
      editorRef.current.getImage().toBlob((blob) => {
        setAdjustedBlob(blob); 
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
    formData.append('fee', fee);
    formData.append('area', hospitalArea);
    formData.append('languages', languages);
    formData.append('clinic_add', clinicAddress);
    formData.append('abt_doctor', aboutDoctor);
    formData.append('clg1', college1);
    formData.append('clg2', college2);
    formData.append('edu1', education1);
    formData.append('edu2', education2);
    formData.append('specs', specs);
    formData.append('docCon', condition); // Added condition to formData
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
      setHospitalFee('');
      setHospitalArea('');
      setLanguages('');
      setClinicAddress('');
      setAboutDoctor('');
      setCollege1('');
      setCollege2('');
      setEducation1('');
      setEducation2('');
      setSpecs('');
      setCondition(''); // Reset condition field
      setImage(null);
      setAdjustedBlob(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = ''; 
      }
    } catch (error) {
      console.error('Error adding doctor:', error);
      setMessage('Error adding doctor. Please try again.');
    }
  };

  return (
    <div className="add-doctor-container11">
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
          <label>Doctor Education:</label>
          <input
            type="text"
            value={education}
            onChange={(e) => setEducation(e.target.value)}
            placeholder="Enter doctor's education"
          />
          <label>Doctor Specialization:</label>
          <input
            type="text"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            placeholder="Enter doctor's specialization"
          />
          <label>Doctor Experience (Years):</label>
          <input
            type="number"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            placeholder="Enter years of experience"
          />
          <label>Hospital Name:</label>
          <input
            type="text"
            value={hospitalAddress}
            onChange={(e) => setHospitalAddress(e.target.value)}
            placeholder="Enter hospital address"
          />
          <label>Hospital Area:</label>
          <input
            type="text"
            value={hospitalArea}
            onChange={(e) => setHospitalArea(e.target.value)}
            placeholder="Enter hospital area"
          />
          <label>Consulting Fee:</label>
          <input
            type="text"
            value={fee}
            onChange={(e) => setHospitalFee(e.target.value)}
            placeholder="Enter consulting fee"
          />
          <label>Languages Spoken:</label>
          <input
            type="text"
            value={languages}
            onChange={(e) => setLanguages(e.target.value)}
            placeholder="Enter languages spoken"
          />
          <label>Clinic Address:</label>
          <textarea
            type="text"
            value={clinicAddress}
            onChange={(e) => setClinicAddress(e.target.value)}
            placeholder="Enter clinic address"
            className='resizable2-textarea'
          />
          <label>About Doctor:</label>
          <textarea
            type="text"
            value={aboutDoctor}
            onChange={(e) => setAboutDoctor(e.target.value)}
            placeholder="Enter information about the doctor"
            className="resizable2-textarea"
          />
          <label>College 1:</label>
          <input
            type="text"
            value={college1}
            onChange={(e) => setCollege1(e.target.value)}
            placeholder="Enter first college attended"
          />
          <label>College 2:</label>
          <input
            type="text"
            value={college2}
            onChange={(e) => setCollege2(e.target.value)}
            placeholder="Enter second college attended"
          />
          <label>Education 1:</label>
          <input
            type="text"
            value={education1}
            onChange={(e) => setEducation1(e.target.value)}
            placeholder="Enter first education detail"
          />
          <label>Education 2:</label>
          <input
            type="text"
            value={education2}
            onChange={(e) => setEducation2(e.target.value)}
            placeholder="Enter second education detail"
          />
          <label>Specifications:</label>
          <input
            type="text"
            value={specs}
            onChange={(e) => setSpecs(e.target.value)}
            placeholder="Enter specifications"
          />
          <label>Condition:</label> {/* Added condition input */}
          <input
            type="text"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            placeholder="Enter condition"
          />
          <label>Doctor Image:</label>
          <input
            type="file"
            onChange={handleImageChange}
            ref={fileInputRef} 
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
            color={[255, 255, 255, 0.6]} 
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
