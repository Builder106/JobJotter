import React from 'react';
import './JobItem.css';

function JobItem({ application, deleteApplication }) {
  return (
    <div className="job-item">

      {application.companyLogo && (
          <img
            src={application.companyLogo}
            alt={application.companyName}
            style={{ width: 100, height: 100, marginBottom: 10 }}
          />
        )}
      <h3>
        {application.jobTitle} at {application.companyName}
      </h3>
      <p>Date Applied: {application.applicationDate}</p>
      <p>Status: {application.applicationStatus}</p>
      <button onClick={deleteApplication}>Delete</button>
    </div>
  );
}

export default JobItem;