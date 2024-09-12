import React, { useState } from 'react';
import axios from 'axios';

const FileUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [cleanedData, setCleanedData] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return alert('Please select a file first.');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5001/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setCleanedData(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const downloadFile = () => {
    if (!cleanedData) return;
    const element = document.createElement('a');
    const fileBlob = new Blob([cleanedData], { type: 'text/csv' });
    element.href = URL.createObjectURL(fileBlob);
    element.download = 'cleaned_file.csv';
    document.body.appendChild(element); 
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleUpload}>Remove Missing Values</button>
      {cleanedData && <button onClick={downloadFile}>Download Cleaned CSV</button>}
    </div>
  );
};

export default FileUploader;
