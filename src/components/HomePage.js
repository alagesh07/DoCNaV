import React from 'react';
import Navbar from './Navbar';
import SearchBanner from './SearchBanner';
import Footer from './Footer';
import Content from './Content';

const HomePage = ({ onBrowseClick, onLoginClick }) => {
  return (
    <>
      <Navbar onBrowseClick={onBrowseClick} onLoginClick={onLoginClick} />
      <SearchBanner />
      <Content/>
      <Footer/>
    </>
  );
};

export default HomePage;
