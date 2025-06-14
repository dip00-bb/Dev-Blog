// ErrorMessage.jsx
import React from 'react';

function ServerError({ message = "Something went wrong. Please try again later." }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] bg-red-100 text-red-800 p-6 rounded-2xl shadow-md border border-red-300">
      <h2 className="text-2xl font-semibold mb-2">⚠️ Error</h2>
      <p className="text-center text-base">{message}</p>
    </div>
  );
}

export default ServerError;
