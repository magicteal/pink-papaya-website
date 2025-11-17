import React from 'react';
import '../styles/Loader.css';

const Loader = () => {
  return (
    <div className="ripple-loader-container">
      <div className="ripple-loader">
        <div className="ripple ripple-1"></div>
        <div className="ripple ripple-2"></div>
        <div className="ripple ripple-3"></div>
      </div>
    </div>
  );
};

export default Loader;
