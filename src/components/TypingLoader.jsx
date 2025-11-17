'use client';

import React, { useState, useEffect } from 'react';
import '../styles/typingLoader.css';

const TypingLoader = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Duration of typing animation (calculated based on text length and speed)
    const typingDuration = 2000; // 2 seconds for "Pink Papaya"
    
    // Mark typing as complete
    const typingTimer = setTimeout(() => {
      setIsTypingComplete(true);
    }, typingDuration);

    // Start fade-out after hold time
    const fadeOutTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, typingDuration + 600); // 600ms hold after typing

    // Hide loader and show content
    const hideTimer = setTimeout(() => {
      setIsLoading(false);
      setShowContent(true);
    }, typingDuration + 600 + 800); // 800ms fade-out duration

    return () => {
      clearTimeout(typingTimer);
      clearTimeout(fadeOutTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <>
      {isLoading && (
        <div className={`typing-loader-container ${isFadingOut ? 'fade-out' : ''}`}>
          <div className="typing-loader">
            <h1 className="typing-text">
              <span className="text-content">Pink Papaya</span>
              <span className={`cursor ${isTypingComplete ? 'cursor-hidden' : ''}`}>|</span>
            </h1>
          </div>
        </div>
      )}
      
      <div className={`main-content ${showContent ? 'fade-in' : 'hidden'}`}>
        {children}
      </div>
    </>
  );
};

export default TypingLoader;
