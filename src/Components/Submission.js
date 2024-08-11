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
        return;
    }

    const fileName = file.name; // Extract the file name

    try {
        // Send file name to backend
        await axios.post('https://boot-camp-server-r1kd.vercel.app/save-filename', {
            fileName,
            day,
            username,
            UID,
        });

        // Redirect to Google Drive after successful submission
        const driveLink = `https://drive.google.com/drive/folders/1I0ccrAIlhMQlb3JFqfREM0SF3offvSrS?usp=sharing`;
        window.open(driveLink, '_blank');

    } catch (error) {
        console.error('Error submitting assessment:', error.response ? error.response.data : error.message);
    }
};

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
                        <form onSubmit={(e) => handleSubmit(e, day)} encType='multipart/form-data'>
                            <label>
                                Upload your assessment:
                                <input 
                                    type="file" 
                                    accept=".pdf,.doc,.docx" 
                                    onChange={(e) => handleFileChange(e, day)} 
                                />
                            </label>
                            <button type="submit" className="submit-btn">Submit & Open Drive</button>
                        </form>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Submission;
