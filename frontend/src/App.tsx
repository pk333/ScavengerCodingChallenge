import React from 'react';
import './App.css';
import FileUploader from './components/FileUploader';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Coding Challenge Scavenger</h1>
      <FileUploader />
    </div>
  );
};

export default App;
