import React from 'react';
import JobItem from './JobItem';

function JobList({ applications, deleteApplication, updateApplicationStatus }) {
  return (
    <section>
      {applications.length > 0 ? (
        applications.map((application, index) => (
          <JobItem
            key={index}
            application={application}
            deleteApplication={() => deleteApplication(index)}
            updateApplicationStatus={updateApplicationStatus}
          />
        ))
      ) : (
        <p style={{ color: '#0056b3' }}>No applications yet. Add a job application above!</p>
      )}
    </section>
  );
}

export default JobList;