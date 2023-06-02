import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('img', selectedFile);

        try {
            setLoading(true);
            const response = await axios.post('http://localhost:5000/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setResult(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h1 className="title">Leaf Disease Classification</h1>
            <form className="upload-form" onSubmit={handleSubmit}>
                <label htmlFor="file-input" className="file-label">
                    Choose an image:
                    <input id="file-input" type="file" onChange={handleFileChange} />
                </label>
                <button type="submit" className="submit-btn" disabled={!selectedFile || loading}>
                    {loading ? 'Uploading...' : 'Upload'}
                </button>
            </form>
            {selectedFile && (
                <div className="uploaded-image">
                    <h2>Uploaded Image:</h2>
                    <img src={URL.createObjectURL(selectedFile)} alt="Uploaded" />
                </div>
            )}
            {result && (
                <div className="result">
                    <h2>Result:</h2>
                    <p>Label Name: {result['Label Name']}</p>
                    <p>Accuracy: {result['Accuracy']}</p>
                    {result['Graph'] && (
                        <img src={`data:image/png;base64,${result['Graph']}`} alt="Graph" />
                    )}
                    <h2 className="symptoms-label">Symptoms:</h2>
                    <p>{result['Symptoms']}</p>
                    <h2 className="treatment-label">Treatment:</h2>
                    <p>{result['Treatment']}</p>
                </div>
            )}
        </div>
    );
};

export default App;
