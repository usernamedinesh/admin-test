import React from 'react';
import './style.css'

function LoadingSpinner() {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"><span class="loader"></span> </div>
    </div>
  );
}

export default LoadingSpinner;
