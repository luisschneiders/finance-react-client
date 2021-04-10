import { useEffect, useState } from 'react';

export const useWindowSize = () => {


  const [windowSize, setWindowSize] = useState([window.innerHeight, window.innerWidth]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize([window.innerHeight, window.innerWidth]);
    };
    window.addEventListener('resize', handleResize);
    // Clean up!
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowSize;
}
