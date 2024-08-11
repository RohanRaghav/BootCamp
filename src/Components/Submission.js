import React, { useState } from 'react';
import axios from 'axios';

const Submission = () => {

    const handleSubmit = async (e, day) => {
        e.preventDefault();

        try {
            // Redirect to Google Drive after successful submission
            const driveLink = `https://drive.google.com/drive/folders/1I0ccrAIlhMQlb3JFqfREM0SF3offvSrS?usp=sharing`;
            window.open(driveLink, '_blank');

        } catch (error) {
            console.error('Error submitting assessment:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="submission-container">
            <h2>Assessment Submissions</h2>
            <div className="submission-slots">
                {['Day 1', 'Day 2', 'Day 3'].map((day, index) => (
                    <div key={index} className="submission-slot">
                        <h3>{day} Assessments</h3>
                        <form onSubmit={(e) => handleSubmit(e, day)}>
                            <button type="submit" className="submit-btn">Submit & Open Drive</button>
                        </form>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Submission;
