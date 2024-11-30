import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './JobForm.css';
import { Autocomplete } from '../../Autocomplete/Autocomplete';
import '../../Autocomplete/style.css';

function JobForm({ addApplication }) {
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyLogo, setCompanyLogo] = useState('');
  const [applicationDate, setApplicationDate] = useState('');
  const [applicationStatus, setApplicationStatus] = useState('Applied');

  const handleAutocompleteSubmit = ({ value, query }) => {
    if (query) {
      setCompanyName(query.name);
      setCompanyLogo(query.icon);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newApplication = {
      jobTitle,
      companyName,
      companyLogo,
      applicationDate,
      applicationStatus,
    };
    addApplication(newApplication);
    setJobTitle('');
    setCompanyName('');
    setCompanyLogo('');
    setApplicationDate('');
    setApplicationStatus('Applied');
  };

  return (
    <form className="job-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={jobTitle}
        onChange={(e) => setJobTitle(e.target.value)}
        placeholder="Job Title"
        required
      />
      <Autocomplete
        onSubmit={handleAutocompleteSubmit}
        placeholder="Company Name"
        className="job-form-input"
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

JobForm.propTypes = {
  addApplication: PropTypes.func.isRequired,
};

export default JobForm;