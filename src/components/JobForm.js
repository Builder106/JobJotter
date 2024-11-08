import React, { useState } from 'react';

function JobForm({ addApplication }) {
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [applicationDate, setApplicationDate] = useState('');
  const [applicationStatus, setApplicationStatus] = useState('Applied');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newApplication = { jobTitle, companyName, applicationDate, applicationStatus };
    console.log('Submitting new application:', newApplication); // Debugging line
    addApplication(newApplication);
    setJobTitle('');
    setCompanyName('');
    setApplicationDate('');
    setApplicationStatus('Applied');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={jobTitle}
        onChange={(e) => setJobTitle(e.target.value)}
        placeholder="Job Title"
        required
      />
      <input
        type="text"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        placeholder="Company Name"
        required
      />
      <input
        type="date"
        value={applicationDate}
        onChange={(e) => setApplicationDate(e.target.value)}
        required
      />
      <select
        value={applicationStatus}
        onChange={(e) => setApplicationStatus(e.target.value)}
      >
        <option value="Applied">Applied</option>
        <option value="Interviewing">Interviewing</option>
        <option value="Offer">Offer</option>
        <option value="Rejected">Rejected</option>
      </select>
      <button type="submit">Add Application</button>
    </form>
  );
}

export default JobForm;