// src/components/JobItem.js
import React from 'react';

function JobItem({ application, deleteApplication }) {
    return (
        <div className="application">
            <h3>{application.jobTitle} at {application.companyName}</h3>
            <p>Date Applied: {application.applicationDate}</p>
            <p>Status: {application.applicationStatus}</p>
            <button onClick={deleteApplication}>Delete</button>
        </div>
    );
}

export default JobItem;