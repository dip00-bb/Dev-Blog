// ErrorMessage.jsx
import React from 'react';

function ServerError({ message = "Something went wrong. Please try again later." }) {
  return (
    <div className="error-message">
      <h2>Error</h2>
      <p>{message}</p>
    </div>
  );
}

export default ServerError;