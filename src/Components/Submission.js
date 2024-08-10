import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext';

const Submission = () => {
    console.log(sessionStorage.getItem('username'));
    console.log(sessionStorage.getItem('UID'));
    const [selectedFiles, setSelectedFiles] = useState({});
    const { user } = useContext(UserContext);
    const handleFileChange = (e, day) => {
        const files = e.target.files;
        setSelectedFiles(prevState => ({ ...prevState, [day]: files[0] }));
    };

    const handleSubmit = async (e, day) => {
        e.preventDefault();
        const file = selectedFiles[day];

        if (!file) {
            console.error('No file selected for upload');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('day', parseInt(day.match(/\d+/)[0], 10)); // Convert 'Day 1' to 1

        // Include actual user data here or handle it differently
        formData.append('username', 'user.username');
        formData.append('UID', 'user.UID');

        try {
            const response = await axios.post('https://boot-camp-server-r1kd.vercel.app/upload-assessment', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Assessment submitted successfully:', response.data);
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
                        <form onSubmit={(e) => handleSubmit(e, day)} encType='multipart/form-data'>
                            <label>
                                Upload your assessment:
                                <input 
                                    type="file" 
                                    accept=".pdf,.doc,.docx" 
                                    onChange={(e) => handleFileChange(e, day)} 
                                />
                            </label>
                            <button type="submit" className="submit-btn">Submit</button>
                        </form>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Submission;
