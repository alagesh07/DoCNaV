import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ResultSearch from './ResultSearch';


const Main = ({ onBrowseClick, onLoginClick }) => {
  return (
    <>
      <Navbar onBrowseClick={onBrowseClick} onLoginClick={onLoginClick} />
      <ResultSearch/>
      <Footer/>
    </>
  );
};

export default Main;
