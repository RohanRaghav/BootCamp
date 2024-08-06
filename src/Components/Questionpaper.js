import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const QuestionPaper = () => {
    const [questions, setQuestions] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [username, setUsername] = useState('');
    const [UID, setUID] = useState('');
    const [course, setCourse] = useState('');
    const [ Department, setDepartment] = useState('');
    const [ Year, setYear] = useState('');
    const [answers, setAnswers] = useState([]);
    const [startTime, setStartTime] = useState(new Date());
    const [showFeedback, setShowFeedback] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [rating, setRating] = useState(0);
    const [submittedInfo, setSubmittedInfo] = useState(false);
    const questionsPerPage = 1;
    const navigate = useNavigate();
    const handleFeedbackSubmition = () => {
        navigate('/Thanks');
    };
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get('https://BootCamp.vercel.app/api/questions');
                setQuestions(response.data);
                setAnswers(response.data.map(() => ''));
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };

        fetchQuestions();
    }, []);

    useEffect(() => {
        setStartTime(new Date());
    }, [currentPage]);

    const handleNext = () => {
        if ((currentPage + 1) * questionsPerPage < questions.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleAnswerChange = (e) => {
        const updatedAnswers = [...answers];
        updatedAnswers[currentPage] = e.target.value;
        setAnswers(updatedAnswers);
    };

    const handleSubmit = async () => {
        const endTime = new Date();
        const timeTaken = (endTime - startTime) / 1000;
        const allAnswers = answers.map((answer, index) => ({
            questionTitle: questions[index].title,
            answer,
            timeTaken,
        }));

        const data = { username, UID, course, Department, Year, answers: allAnswers };

        console.log('Submitting data:', JSON.stringify(data, null, 2)); // Log the data being sent

        try {
            await axios.post('http://localhost:3001/submit-test', data);
                setShowFeedback(true);

        } catch (error) {
            console.error('Error submitting test:', error);
        }
    };

    const handleFeedbackSubmit = async () => {
        try {
            await axios.post('http://localhost:3001/submit-feedback', { username, UID, course, feedback, rating, Department, Year });
            setShowFeedback(false);
            setFeedback('');
            setRating(0);
            handleFeedbackSubmition();
        } catch (error) {
            console.error('Error submitting feedback:', error);
        }
    };

    const handleInfoSubmit = (e) => {
        e.preventDefault();
        setSubmittedInfo(true);
    };

    const startIndex = currentPage * questionsPerPage;
    const currentQuestion = questions[startIndex];

    return (
        <div className="questionpaper">
            {!showFeedback ? (
                <div>
                    {!submittedInfo ? (
                        <div className='formhandle'>
                            <form onSubmit={handleInfoSubmit}>
                                <label className='info'>
                                    Username:
                                    <input
                                        type="text"
                                        placeholder='Name'
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className='input'
                                        required
                                    />
                                </label>
                                <br />
                                <label className='info'>
                                    UID:
                                    <input
                                        type="text"
                                        placeholder='UID'
                                        className='input'
                                        value={UID}
                                        onChange={(e) => setUID(e.target.value)}
                                        required
                                    />
                                </label>
                                <br />
                                <label className='info'>
                                    Course:
                                    <select value={course} className='input' onChange={(e) => setCourse(e.target.value)} required>
                                        <option value="">Select your course</option>
                                        <option value="course1">Course 1</option>
                                        <option value="course2">Course 2</option>
                                        <option value="course3">Course 3</option>
                                        {/* Add more options as needed */}
                                    </select>
                                </label>
                                <br />
                                <label className='info'>
                                    Department:
                                    <select value={Department} className='input' onChange={(e) => setDepartment(e.target.value)} required>
                                        <option value="">Select your Department</option>
                                        <option value="course1">Course 1</option>
                                        <option value="course2">Course 2</option>
                                        <option value="course3">Course 3</option>
                                        {/* Add more options as needed */}
                                    </select>
                                </label>
                                <br />
                                <label className='info'>
                                    Year:
                                    <select value={Year} className='input' onChange={(e) => setYear(e.target.value)} required>
                                        <option value="">Select your Year</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>
                                </label>
                                <br />
                                <div style={{alignItems:'center'}}>
                                    <button type="submit" className='infobtn'>Submit</button>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div>
                            {currentQuestion ? (
                                <div className='questionbox'>
                                    <h2 className='questionTitle'>{currentQuestion.title}</h2>
                                    <p className='question'>{currentQuestion.description}</p>
                                    <textarea
                                        value={answers[currentPage]}
                                        onChange={handleAnswerChange}
                                        placeholder="Write your answer here..."
                                        rows="4"
                                        cols="50"
                                        className='texts'
                                    />
                                    <div className="button-container">
                                        <div className='PositioningPrevious'>
                                            <button className="button-3d" onClick={handlePrevious} disabled={currentPage === 0}>
                                                <div className="button-top">
                                                    <span className="material-icons">❮</span>
                                                </div>
                                                <div className="button-bottom"></div>
                                                <div className="button-base"></div>
                                            </button>
                                        </div>
                                        {currentPage < questions.length - 1 ? (
                                            <div className='PositioningNext'>
                                                <button className="button-3d" onClick={handleNext}>
                                                    <div className="button-top">
                                                        <span className="material-icons">❯</span>
                                                    </div>
                                                    <div className="button-bottom"></div>
                                                    <div className="button-base"></div>
                                                </button>
                                            </div>
                                        ) : (
                                            <div className='PositioningNext'>
                                                <button className="button-3d" onClick={handleSubmit}>
                                                    <div className="button-top">
                                                        <span className="material-icons">❯</span>
                                                    </div>
                                                    <div className="button-bottom"></div>
                                                    <div className="button-base"></div>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <p>Loading questions...</p>
                            )}
                        </div>
                    )}
                </div>
            ) : (
                <div className='feedback'>
                    <h2>Feedback</h2>
                    <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="Write your feedback here..."
                        style={{color:'black'}}
                        rows="4"
                        cols="50"
                    />
                    <br />
                    <div className="rating">
                        {[5, 4, 3, 2, 1].map((star) => (
                            <React.Fragment key={star}>
                                <input
                                    value={star}
                                    name="rating"
                                    id={`star${star}`}
                                    type="radio"
                                    checked={rating === star}
                                    onChange={() => setRating(star)}
                                />
                                <label htmlFor={`star${star}`}></label>
                            </React.Fragment>
                        ))}
                    </div>
                    <br />
                    <button onClick={handleFeedbackSubmit} className='feedbackbutton'>Submit Feedback</button>
                </div>
            )}
        </div>
    );
};

export default QuestionPaper;
