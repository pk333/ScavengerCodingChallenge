import React, { useState } from 'react';

const FileUploadTest: React.FC = () => {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFileName(e.target.files[0].name);
      alert(`Selected file: ${e.target.files[0].name}`);
    }
  };

  return (
    <div>
      <h2>Select a CSV File</h2>
      <input type="file" onChange={handleFileChange} accept=".csv" />
      {fileName && <p>Selected File: {fileName}</p>}
    </div>
  );
};

export default FileUploadTest;
