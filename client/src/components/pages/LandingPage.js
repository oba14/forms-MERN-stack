import React from 'react';
import { NavLink } from 'react-router-dom';
import './Landing.css';

const LandingPage = () => {
  return (
    <div className="Landing">
      <h1 className="Landing-item">WELCOME </h1>
      <h3 className="Landing-item">Upload and Retrieve forms data from mongodb using MERN stack</h3>
      <button className='btn'> <NavLink to= '/shortForm'>Submit Form</NavLink></button>
      <button className='btn'><NavLink to= '/trackcomplaint'>Edit Form</NavLink> </button>
    </div>
  );
};
export default LandingPage;