import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import JobForm from './components/JobForm/JobForm';
import JobList from './components/JobList/JobList';
import Footer from './components/Footer/Footer';
import Modal from './components/Modal/Modal';
import './App.css';

function App() {
  const [applications, setApplications] = useState(() => {
    const storedApplications = localStorage.getItem('applications');
    return storedApplications ? JSON.parse(storedApplications) : [];
  });

  const [jobSearchQuery, setJobSearchQuery] = useState('');
  const [companySearchQuery, setCompanySearchQuery] = useState('');
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [modals, setModals] = useState([]);

  useEffect(() => {
    localStorage.setItem('applications', JSON.stringify(applications));
  }, [applications]);

  const addApplication = (application) => {
    setApplications([...applications, application]);
    addModal('Application Added');
  };

  const deleteApplication = (index) => {
    setApplications(applications.filter((_, i) => i !== index));
    addModal('Application Deleted');
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

  const addModal = (message) => {
    setModals((prevModals) => [
      ...prevModals,
      { id: Date.now(), message }
    ]);
  };

  const removeModal = (id) => {
    setModals((prevModals) => prevModals.filter(modal => modal.id !== id));
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
      {modals.map((modal, index) => (
        <Modal
          key={modal.id}
          show={true}
          onClose={() => removeModal(modal.id)}
          duration={5000}
          position={index}
        >
          <h4>{modal.message}</h4>
        </Modal>
      ))}
    </div>
  );
}

export default App;