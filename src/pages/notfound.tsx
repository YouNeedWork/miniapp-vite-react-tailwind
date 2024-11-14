import React from 'react';

export default function NotFound() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-gray-800">404</h1>
        <p className="mb-8 text-xl text-gray-600">Page Not Found</p>
        <a 
          href="/"
          className="px-6 py-3 text-white bg-blue-500 rounded-lg transition-colors hover:bg-blue-600"

          onClick={()=>{
          }}
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
}
