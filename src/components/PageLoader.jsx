'use client';

import { useEffect, useState } from 'react';
import RippleLoader from './RippleLoader';
import '../styles/pageLoader.css';

export default function PageLoader({ children }) {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade out after 1600ms
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 1600);

    // Remove loader completely after fade out completes
    const removeTimer = setTimeout(() => {
      setLoading(false);
    }, 1800);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (loading) {
    return (
      <div className={`page-loader ${fadeOut ? 'fade-out' : ''}`}>
        <RippleLoader />
      </div>
    );
  }

  return <div className="page-content fade-in">{children}</div>;
}
