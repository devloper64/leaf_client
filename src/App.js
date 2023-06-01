import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!file) {
      alert('Please select an image file.');
      return;
    }

    const formData = new FormData();
    formData.append('img', file);

    axios
        .post('http://localhost:5000/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          setPrediction(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
  };

  return (
      <div className="container">
        <h1>Leaf Disease Classification</h1>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-3">
            <label htmlFor="img" className="form-label">
              Select an image:
            </label>
            <input
                type="file"
                className="form-control"
                id="img"
                accept="image/*"
                onChange={handleFileChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        {prediction && (
            <div className="mt-4">
              <h2>Prediction:</h2>
              <p>Label Name: {prediction['Label Name']}</p>
              <p>Accuracy: {prediction['Accuracy']}</p>
              {prediction['Graph'] && (
                  <img src={prediction['Graph']} alt="Prediction Graph" className="img-fluid" />
              )}
            </div>
        )}
      </div>
  );
}

export default App;
