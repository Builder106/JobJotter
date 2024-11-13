import React, { useState, useEffect } from 'react';
import JobForm from './components/JobForm';
import JobList from './components/JobList';
import './App.css';

function App() {
  const [applications, setApplications] = useState(() => {
    const storedApplications = localStorage.getItem('applications');
    console.log('Initial stored applications:', storedApplications); // Debugging line
    return storedApplications ? JSON.parse(storedApplications) : [];
  });

  // Save data to local storage whenever applications state changes
  useEffect(() => {
    console.log('Saving applications to local storage:', applications); // Debugging line
    localStorage.setItem('applications', JSON.stringify(applications));
  }, [applications]);

  const addApplication = (application) => {
    const updatedApplications = [...applications, application];
    console.log('Adding application:', application); // Debugging line
    console.log('Updated applications:', updatedApplications); // Debugging line
    setApplications(updatedApplications);
  };

  const deleteApplication = (index) => {
    const newApplications = applications.filter((_, i) => i !== index);
    console.log('Deleting application at index:', index); // Debugging line
    console.log('New applications:', newApplications); // Debugging line
    setApplications(newApplications);
  };

  return (
    <div className="App">
      <header className="App-header">
      <h1>JobJotter</h1>
      </header>
      <JobForm addApplication={addApplication} />
      <JobList applications={applications} deleteApplication={deleteApplication} />
    </div>
  );
}

export default App;