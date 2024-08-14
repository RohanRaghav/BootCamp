import React, { useState } from 'react';
import axios from 'axios';

const Submission = () => {
    const [selectedFiles, setSelectedFiles] = useState({});
    const username = sessionStorage.getItem('username');
    const UID = sessionStorage.getItem('UID');

    const handleFileChange = (e, day) => {
        const files = e.target.files;
        setSelectedFiles(prevState => ({ ...prevState, [day]: files[0] }));
    };

    const handleSubmit = async (e, day) => {
        e.preventDefault();
        const file = selectedFiles[day];

        if (!file) {
            console.error('No file selected for upload');
            alert('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('day', parseInt(day.match(/\d+/)[0], 10)); // Convert 'Day 1' to 1
        formData.append('username', username);
        formData.append('UID', UID);
        formData.append('file', file); // Append the file to the form data

        try {
            // Send data to backend
            const response = await axios.post('https://boot-camp-server-chi.vercel.app/upload-assessment', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('File uploaded successfully:', response.data);
            alert('File uploaded successfully!');
            // Optionally clear the file selection after successful upload
            setSelectedFiles(prevState => ({ ...prevState, [day]: null }));

        } catch (error) {
            console.error('Error submitting assessment:', error.response ? error.response.data : error.message);
            alert('Error submitting assessment. Please try again.');
        }
    };

    return (
        <div className="submission-container">
            <h2>Assessment Submissions</h2>
            <div className="submission-slots">
                {['Day 1', 'Day 2', 'Day 3'].map((day, index) => (
                    <div key={index} className="submission-slot">
                        <h3>{day} Assessments</h3>
                        <form onSubmit={(e) => handleSubmit(e, day)} encType='multipart/form-data'>
                            <label>
                                Upload your assessment:
                                <input 
                                    type="file" 
                                    accept=".pdf,.doc,.docx" 
                                    onChange={(e) => handleFileChange(e, day)} 
                                />
                            </label>
                            <button type="submit" className="submit-btn">Submit Assessment</button>
                        </form>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Submission;
