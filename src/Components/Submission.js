import React, { useState } from 'react';
import axios from 'axios';

const Submission = () => {
    const username = sessionStorage.getItem('username');
    const UID = sessionStorage.getItem('UID');

    const handleSubmit = async (e, day) => {
        e.preventDefault();

        const formData = {
            username,
            UID,
            day: parseInt(day.match(/\d+/)[0], 10), // Convert 'Day 1' to 1
        };

        try {
            // Send data to backend
            await axios.post('https://boot-camp-server-r1kd.vercel.app/upload-assessment', formData);

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
