import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import JobForm from './components/JobForm';
import JobList from './components/JobList';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [applications, setApplications] = useState(() => {
    const storedApplications = localStorage.getItem('applications');
    return storedApplications ? JSON.parse(storedApplications) : [];
  });

  const [jobSearchQuery, setJobSearchQuery] = useState('');
  const [companySearchQuery, setCompanySearchQuery] = useState('');
  const [searchTriggered, setSearchTriggered] = useState(false);

  useEffect(() => {
    localStorage.setItem('applications', JSON.stringify(applications));
  }, [applications]);

  const addApplication = (application) => {
    setApplications([...applications, application]);
  };

  const deleteApplication = (index) => {
    setApplications(applications.filter((_, i) => i !== index));
  };

  const updateApplicationStatus = (application, newStatus) => {
    setApplications(applications.map(app => 
      app === application ? { ...app, applicationStatus: newStatus } : app
    ));
  };

  const handleJobSearch = (e) => {
    setJobSearchQuery(e.target.value);
  };

  const handleCompanySearch = (e) => {
    setCompanySearchQuery(e.target.value);
  };

  const handleSearchClick = () => {
    setSearchTriggered(true);
  };

  const filteredApplications = applications.filter(application =>
    application.jobTitle.toLowerCase().includes(jobSearchQuery.toLowerCase()) &&
    application.companyName.toLowerCase().includes(companySearchQuery.toLowerCase())
  );

  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <h1>Welcome to JobJotter</h1>
        <h5>Track all your applications in one place</h5>
         <input
            type="text"
            className="search-input"
            placeholder="Search by job title"
            value={jobSearchQuery}
            onChange={handleJobSearch}
         />
         <input
            type="text"
            className="search-input"
            placeholder="Search by company name"
            value={companySearchQuery}
            onChange={handleCompanySearch}
         />
         <button
            className="job-form-input search-button"
            onClick={handleSearchClick}
         >
            Search Applications
         </button>
      </header>
      <div className="App-content">
        <JobForm addApplication={addApplication} />
        <JobList
          applications={searchTriggered ? filteredApplications : applications}
          deleteApplication={deleteApplication}
          updateApplicationStatus={updateApplicationStatus}
        />
      </div>
      <Footer />
    </div>
  );
}

export default App;