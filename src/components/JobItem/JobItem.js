import React, { useState } from 'react';
import './JobItem.css';

function JobItem({ application, deleteApplication, updateApplicationStatus }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newStatus, setNewStatus] = useState(application.applicationStatus);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    updateApplicationStatus(application, newStatus);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setNewStatus(application.applicationStatus);
    setIsEditing(false);
  };

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
      <p>Status: {isEditing ? (
        <select
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
        >
          <option value="Applied">Applied</option>
          <option value="Interviewing">Interviewing</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
      ) : (
        application.applicationStatus
      )}</p>
      {isEditing ? (
        <>
          <button className="save-button" onClick={handleSaveClick}>Save</button>
          <button className="cancel-button" onClick={handleCancelClick}>Cancel</button>
        </>
      ) : (
        <button className="edit-button" onClick={handleEditClick}>Edit</button>
      )}
      <button className="delete-button" onClick={deleteApplication}>Delete</button>
    </div>
  );
}

export default JobItem;