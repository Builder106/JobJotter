// src/components/JobList.js
import React from 'react';
import JobItem from './JobItem';

function JobList({ applications, deleteApplication }) {
    return (
        <section>
            {applications.length > 0 ? (
                applications.map((application, index) => (
                    <JobItem key={index} application={application} deleteApplication={() => deleteApplication(index)} />
                ))
            ) : (
                <p>No applications yet. Add a job application above!</p>
            )}
        </section>
    );
}

export default JobList;