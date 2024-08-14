import React, { useState } from 'react';

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

        const reader = new FileReader();
        reader.onload = async function () {
            const fileBase64 = reader.result.split(',')[1];
            try {
                const response = await fetch('https://boot-camp-server-chi.vercel.app/upload-assessment', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: username,
                        UID: UID,
                        day: parseInt(day.match(/\d+/)[0], 10),
                        file: `data:${file.type};base64,${fileBase64}`
                    })
                });

                if (response.ok) {
                    const data = await response.text(); 
                    console.log('File uploaded successfully:', data);
                    alert('File uploaded successfully!');
                    setSelectedFiles(prevState => ({ ...prevState, [day]: null }));
                } else {
                    const text = await response.text();
                    console.error('Error submitting assessment:', text);
                    alert(`Error submitting assessment: ${text}`);
                }
            } catch (error) {
                console.error('Error submitting assessment:', error.message);
                alert('Error submitting assessment. Please try again.');
            }
        };

        reader.readAsDataURL(file);
    };

    return (
        <div className="submission-container">
            <h2>Assessment Submissions</h2>
            <div className="submission-slots">
                {['Day 1', 'Day 2', 'Day 3'].map((day, index) => (
                    <div key={index} className="submission-slot">
                        <h3>{day} Assessments</h3>
                        <form onSubmit={(e) => handleSubmit(e, day)}>
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
